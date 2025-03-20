export async function getCookie() {
  const res = await fetch("/api/auth");
  const data = await res.json();
  return data?.token || "";
}