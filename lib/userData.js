import { getToken } from './authenticate';

// Function to make authenticated request to API endpoint
async function makeAuthenticatedRequest(url, method) {
  const token = getToken();
  const requestOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`
    }
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      return await response.json();
    } else {
      return [];
    }
  } catch (error) {
    console.error('Request failed:', error);
    return [];
  }
}

// Function to add item to favourites
export async function addToFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await makeAuthenticatedRequest(url, 'PUT');
}

// Function to remove item from favourites
export async function removeFromFavourites(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
  return await makeAuthenticatedRequest(url, 'DELETE');
}

// Function to get favourites
export async function getFavourites() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
  return await makeAuthenticatedRequest(url, 'GET');
}

// Function to add item to history
export async function addToHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return await makeAuthenticatedRequest(url, 'PUT');
}

// Function to remove item from history
export async function removeFromHistory(id) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
  return await makeAuthenticatedRequest(url, 'DELETE');
}

// Function to get history
export async function getHistory() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/history`;
  return await makeAuthenticatedRequest(url, 'GET');
}