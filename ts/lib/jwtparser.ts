export function parseJWTToken(token: string) {
  const splited = token.split(".");
  const encoded = decodeURIComponent(atob(splited[1]));
  const payload = JSON.parse(encoded);
  return payload.uid;
}
