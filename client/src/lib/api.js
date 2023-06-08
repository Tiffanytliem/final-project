export default async function fetchCatalog() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error(`fetchError ${res.status}`);
  return await res.json();
}
