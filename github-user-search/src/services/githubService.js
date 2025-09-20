import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchUsers = async (searchParams, page = 1, perPage = 30) => {
  try {
    let query = '';
    
    // Build the search query
    if (searchParams.username) {
      query += `${searchParams.username} in:login`;
    }
    
    if (searchParams.location) {
      query += ` location:${searchParams.location}`;
    }
    
    if (searchParams.minRepos) {
      query += ` repos:>=${searchParams.minRepos}`;
    }
    
    // If no specific criteria, search by username
    if (!query && searchParams.username) {
      query = searchParams.username;
    }
    
    const response = await axios.get(`${GITHUB_API_BASE_URL}/search/users`, {
      params: {
        q: query,
        page: page,
        per_page: perPage
      }
    });
    
    return response.data;
  } catch (error) {
    throw error;
  }
};