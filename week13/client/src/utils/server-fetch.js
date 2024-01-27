import { environment } from '../environments/environment';

export function serverFetch(path, config) {
  path = path.startsWith('/') ? path : `/${path}`;
  return fetch(`${environment.serverURL}${path}`, {
    method: "post",
    ...config,
    headers: { "content-type": "application/json", ...(config?.headers || {}) },
    body: config?.body ? JSON.stringify(config.body) : undefined
  })
    .then((res) => res.json()
      .then(data => res.ok ? ({ ok: true, data }) : ({ ok: false, data }))
    ).catch(err => {
      console.error(err);
      return { ok: false, data: { error: new Error('Network error') } };
    });
}