const JSDELIVR_FILES_BASE = 'https://cdn.jsdelivr.net/gh/ZZZ174066/ZZZ@main';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/files/')) {
      const encodedPath = '/' + url.pathname.split('/').filter(Boolean).map(encodeURIComponent).join('/');
      const upstream = JSDELIVR_FILES_BASE + encodedPath;
      const response = await fetch(upstream, {
        headers: {
          'User-Agent': request.headers.get('User-Agent') || 'ZZZ-Site-Proxy'
        },
        cf: { cacheEverything: true, cacheTtl: 31536000 }
      });

      if (response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        headers.set('Access-Control-Allow-Origin', '*');
        return new Response(response.body, {
          status: response.status,
          headers
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
