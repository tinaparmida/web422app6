// my-app/lib/authenticate.js

import { useRouter } from 'next/router';

// Function to authenticate user by making a POST request to login endpoint
export async function authenticateUser(user, password) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        return true; // Indicate successful authentication
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      throw new Error('Authentication failed');
    }
  }

// Function to set authentication token in localStorage
export function setToken(token) {
  localStorage.setItem('token', token);
}

// Function to get authentication token from localStorage
export function getToken() {
  return localStorage.getItem('token');
}

// Function to remove authentication token from localStorage
export function removeToken() {
  localStorage.removeItem('token');
}

// Function to read authentication token from localStorage
export function readToken() {
  return localStorage.getItem('token');
}

// Function to check if user is authenticated
export function isAuthenticated() {
  return !!getToken();
}

  export async function registerUser(user, password, password2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify({ userName: user, password: password, password2: password2 }),
      headers: {
        'content-type': 'application/json',
      },
    });
  
    const data = await res.json();
  
    if (res.status === 200) {
      return true;
    } else {
      throw new Error(data.message);
    }
  }
  