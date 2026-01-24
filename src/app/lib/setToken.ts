export function setToken(token: any) {
  const tokenStr = typeof token === 'string' ? token : JSON.stringify(token);
  localStorage.setItem('token', tokenStr);

  document.cookie = `token=${tokenStr}; path=/; max-age=86400; SameSite=Lax; Secure`;
}

export function setIspData(isp: any) {
  const ispStr = JSON.stringify(isp);
  // Usamos 'isp' para que coincida con lo que el SSR espera leer
  localStorage.setItem('isp', ispStr);

  document.cookie = `isp=${ispStr}; path=/; max-age=86400; SameSite=Lax; Secure`;
}
