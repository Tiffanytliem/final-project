export default async function fetchCatalog() {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error(`fetchError ${res.status}`);
  return await res.json();
}
export async function fetchProduct(productId) {
  const res = await fetch(`/api/products/${productId}`);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}
