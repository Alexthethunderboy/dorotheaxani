import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const cookieStore = await cookies();
  const adminSecret = cookieStore.get('admin_secret')?.value;
  // Use server-side ADMIN_SECRET exclusively to prevent exposing to client
  const API_SECRET = process.env.ADMIN_SECRET;
  
  if (!adminSecret || adminSecret !== API_SECRET) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="wedding-fadein backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl max-w-md w-full text-center">
          <h2 className="text-3xl mb-6 text-wedding-sage tracking-wide">Admin Access</h2>
          <form method="POST" action="/admin/login" className="flex flex-col gap-4">
            <input 
              name="secret" 
              type="password" 
              placeholder="Enter Admin Secret" 
              className="w-full px-4 py-3 rounded-xl border border-white/20 bg-black/40 text-white placeholder-gray-400 focus:outline-none focus:border-wedding-sage transition-colors font-sans-ui" 
              autoFocus 
            />
            <button 
              type="submit" 
              className="mt-2 w-full bg-gradient-to-r from-wedding-sage to-wedding-gold text-black font-semibold py-3 rounded-xl shadow-[0_0_15px_rgba(183,203,181,0.2)] hover:shadow-[0_0_25px_rgba(183,203,181,0.4)] transition-all font-sans-ui cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
          <div className="mt-8 text-wedding-muted font-sans-ui text-sm flex items-center justify-center gap-2">
            <span role="img" aria-label="lock">🔒</span> Secured Area
          </div>
        </div>
      </div>
    );
  }

  // Use absolute URL for fetch to avoid TypeError in server context
  const base = process.env.NEXT_PUBLIC_SITE_ORIGIN || process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
  const res = await fetch(`${base}/api/hit`, {
    headers: { Authorization: `Bearer ${API_SECRET}` },
    cache: 'no-store',
  });
  
  if (!res.ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="wedding-fadein backdrop-blur-md bg-white/5 border border-red-500/20 rounded-3xl p-10 shadow-2xl text-center">
          <h2 className="text-red-400 text-2xl mb-2">Connection Error</h2>
          <div className="text-wedding-muted font-sans-ui">Admin API returned status: {res.status}</div>
        </div>
      </div>
    );
  }
  
  const data = await res.json();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="wedding-fadein backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 shadow-2xl max-w-lg w-full text-center">
        <h2 className="text-3xl mb-2 text-wedding-sage tracking-wider">Video Plays</h2>
        <div className="text-6xl my-8 text-wedding-gold font-bold tracking-widest drop-shadow-[0_0_15px_rgba(241,231,220,0.3)]">
          {data.count}
        </div>
        <div className="mt-6 text-wedding-muted text-lg flex items-center justify-center gap-2">
          <span role="img" aria-label="sparkles">✨</span> Thank you for celebrating!
        </div>
      </div>
    </div>
  );
}
