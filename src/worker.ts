export interface Env {
  ASSETS: { fetch: typeof fetch };
  REBUILD_SECRET: string;
  GITHUB_DISPATCH_TOKEN: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/rebuild' && request.method === 'POST') {
      if (url.searchParams.get('secret') !== env.REBUILD_SECRET) {
        return new Response('Forbidden', { status: 403 });
      }

      const dispatchResponse = await fetch(
        'https://api.github.com/repos/zzpoopercatpants/colleenmccann-net/dispatches',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
            Accept: 'application/vnd.github+json',
            'User-Agent': 'colleenmccann-net-rebuild-hook',
          },
          body: JSON.stringify({ event_type: 'sanity-publish' }),
        }
      );

      if (!dispatchResponse.ok) {
        return new Response(`Dispatch failed: ${dispatchResponse.status}`, { status: 502 });
      }

      return new Response('Rebuild triggered', { status: 202 });
    }

    return env.ASSETS.fetch(request);
  },
};
