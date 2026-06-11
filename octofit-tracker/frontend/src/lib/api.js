export function normalizeApiResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const collectionKeys = ['results', 'data', 'items', 'docs'];
  const collection = collectionKeys.map((key) => payload[key]).find(Array.isArray);

  return collection || [];
}

export async function fetchCollection(endpoint) {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return normalizeApiResponse(await response.json());
}