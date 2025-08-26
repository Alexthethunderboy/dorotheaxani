import { NextRequest, NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ADMIN_SECRET = process.env.ADMIN_SECRET;
const VIDEO_ID = 'anniv-2025';
const EVENT_KEYS = ['play', 'ended', 'progress'];

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { event, videoId } = data;
    if (!EVENT_KEYS.includes(event) || (videoId && typeof videoId !== 'string')) {
      return NextResponse.json({ ok: false, error: 'Invalid input' }, { status: 400 });
    }
    const key = `video:${videoId || VIDEO_ID}:${event}`;
    const count = await redis.incr(key);
    return NextResponse.json({ ok: true, count });
  } catch {
    return NextResponse.json({ ok: false, error: 'Bad request' }, { status: 400 });
  }
}

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (!auth || !ADMIN_SECRET || auth !== `Bearer ${ADMIN_SECRET}`) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }
  const key = `video:${VIDEO_ID}:play`;
  const count = await redis.get(key);
  return NextResponse.json({ ok: true, count: count || 0 });
}

// Optional: For IP dedupe, see X-Forwarded-For and add a short TTL per IP+event. See README for details.
