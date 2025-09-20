import axios from 'axios';

const GITHUB_API_BASE_URL = 'https://api.github.com';

// Create axios instance with base configuration
const githubApi = axios.create({
  baseURL: GITHUB_API_BASE_URL,
  timeout: 10000,
});

// Add request interceptor to include API key if available
githubApi.interceptors.request.use((config) => {
  const apiKey = import.meta.env.VITE_APP_GITHUB_API_KEY;
  if (apiKey) {
    config.headers.Authorization = `token ${apiKey}`;
  }
  return config;
});

/**
 * Search for a GitHub user by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub API
 */
export const searchUser = async (username) => {
  try {
    const response = await githubApi.get(`/users/${username}`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error searching for user:', error);
    
    if (error.response?.status === 404) {
      return {
        success: false,
        error: 'User not found',
      };
    }
    
    if (error.response?.status === 403) {
      return {
        success: false,
        error: 'API rate limit exceeded. Please try again later.',
      };
    }
    
    return {
      success: false,
      error: 'An error occurred while searching. Please try again.',
    };
  }
};

/**
 * Get user repositories
 * @param {string} username - GitHub username
 * @param {number} per_page - Number of repos per page (default: 10)
 * @returns {Promise<Object>} Repository data from GitHub API
 */
export const getUserRepos = async (username, per_page = 10) => {
  try {
    const response = await githubApi.get(`/users/${username}/repos`, {
      params: {
        sort: 'updated',
        per_page,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error('Error fetching user repositories:', error);
    return {
      success: false,
      error: 'Failed to fetch repositories',
    };
  }
};
