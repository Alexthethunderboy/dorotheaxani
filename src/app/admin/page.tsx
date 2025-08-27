
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = cookieStore.get('admin_secret')?.value;
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return (
      <div className="wedding-card wedding-fadein" style={{marginTop:'4rem'}}>
        <h2 style={{textAlign:'center',fontSize:'2.1rem',marginBottom:'1.5rem',color:'var(--wedding-sage)'}}>Admin Login</h2>
        <form method="POST" action="/admin/login" style={{display:'flex',flexDirection:'column',gap:12}}>
          <input name="secret" type="password" placeholder="Admin Secret" className="wedding-input" autoFocus />
          <button type="submit" className="wedding-btn" style={{marginTop:8}}>Login</button>
        </form>
        <div style={{marginTop:'2.5rem',textAlign:'center',fontSize:'1.1rem',color:'var(--wedding-muted)'}}>
          <span role="img" aria-label="lock">🔒</span> Private admin access
        </div>
      </div>
    );
  }

  // Use absolute URL for fetch to avoid TypeError in server context
  const base = process.env.NEXT_PUBLIC_SITE_ORIGIN || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const res = await fetch(`${base}/api/hit`, {
    headers: { Authorization: `Bearer ${process.env.ADMIN_SECRET}` },
    cache: 'no-store',
  });
  const data = await res.json();
  return (
    <div className="wedding-card wedding-fadein" style={{marginTop:'4rem',textAlign:'center'}}>
      <h2 style={{fontSize:'2.1rem',marginBottom:'1.5rem',color:'var(--wedding-sage)'}}>Video Play Count</h2>
      <div style={{fontSize:48,margin:'24px 0',color:'var(--wedding-blue)',fontWeight:600,letterSpacing:2}}>
        {data.count}
      </div>
      <div style={{marginTop:'1.5rem',fontSize:'1.1rem',color:'var(--wedding-muted)'}}>
        <span role="img" aria-label="flower">💐</span> Thank you for celebrating with us!
      </div>
    </div>
  );
}
