import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const secret = form.get('secret');
  if (secret && secret === process.env.ADMIN_SECRET) {
    return new NextResponse(null, {
      status: 302,
      headers: {
        'Set-Cookie': `admin_secret=${secret}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`,
        Location: '/admin',
      },
    });
  }
  return new NextResponse(null, { status: 302, headers: { Location: '/admin' } });
}
