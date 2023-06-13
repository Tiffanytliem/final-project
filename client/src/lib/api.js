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
export async function signUpOrIn(action, firstName, lastName, emailAddress, password) {
  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ firstName, lastName, emailAddress, password }),
  };
  const res = await fetch(`/api/auth/${action}`, req);
  if (!res.ok) throw new Error(`fetch Error ${res.status}`);
  return await res.json();
}

export async function signUp(firstName, lastName, emailAddress, password) {
  return await signUpOrIn('sign-up', firstName, lastName, emailAddress, password);
}
