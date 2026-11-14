export function assetUrl(assetPath, basePath = import.meta.env?.BASE_URL ?? '/') {
  const base = basePath.endsWith('/') ? basePath : basePath + '/';
  return base + assetPath.replace(/^\/+/, '');
}
