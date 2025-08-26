import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const form = await req.formData();
  const secret = form.get('secret');
  if (secret && secret === process.env.ADMIN_SECRET) {
    // Set cookie for 1 hour
    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': `admin_secret=${secret}; Path=/; HttpOnly; Max-Age=3600; SameSite=Strict`,
        Location: '/admin',
      },
    });
  }
  return new Response(null, { status: 302, headers: { Location: '/admin' } });
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = cookieStore.get('admin_secret')?.value;
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return (
      <form method="POST" style={{margin:'2rem auto',maxWidth:320,padding:24,borderRadius:12,background:'#222',color:'#fff',fontFamily:'monospace'}}>
        <h2>Admin Login</h2>
        <input name="secret" type="password" placeholder="Admin Secret" style={{width:'100%',margin:'12px 0',padding:8,borderRadius:6}} />
        <button type="submit" style={{width:'100%',padding:8,borderRadius:6,background:'#444',color:'#fff'}}>Login</button>
      </form>
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ORIGIN || ''}/api/hit`, {
    headers: { Authorization: `Bearer ${process.env.ADMIN_SECRET}` },
    cache: 'no-store',
  });
  const data = await res.json();
  return (
    <div style={{margin:'2rem auto',maxWidth:320,padding:24,borderRadius:12,background:'#222',color:'#fff',fontFamily:'monospace'}}>
      <h2>Video Play Count</h2>
      <div style={{fontSize:32,margin:'16px 0'}}>{data.count}</div>
    </div>
  );
}
