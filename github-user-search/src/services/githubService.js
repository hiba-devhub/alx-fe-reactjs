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
    let queryParts = [];
    
    // Build the search query parts
    if (searchParams.username && searchParams.username.trim()) {
      queryParts.push(`${searchParams.username.trim()} in:login`);
    }
    
    if (searchParams.location && searchParams.location.trim()) {
      queryParts.push(`location:${searchParams.location.trim()}`);
    }
    
    if (searchParams.minRepos && searchParams.minRepos.toString().trim()) {
      queryParts.push(`repos:>=${searchParams.minRepos}`);
    }
    
    // Join query parts or use just the username if no other criteria
    let query = queryParts.join(' ');
    
    // If no specific criteria but we have a username, just search by username
    if (!query && searchParams.username && searchParams.username.trim()) {
      query = searchParams.username.trim();
    }
    
    // Ensure we have a query
    if (!query.trim()) {
      throw new Error('No search criteria provided');
    }
    
    console.log('Search query:', query); // Debug log
    
    const searchUrl = 'https://api.github.com/search/users';
    const response = await axios.get(searchUrl, {
      params: {
        q: query,
        page: page,
        per_page: perPage
      }
    });
    
    console.log('Search response:', response.data); // Debug log
    
    return response.data;
  } catch (error) {
    console.error('Search error:', error); // Debug log
    throw error;
  }
};