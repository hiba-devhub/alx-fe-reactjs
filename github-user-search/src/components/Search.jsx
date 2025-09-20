import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

function Search() {
  const [username, setUsername] = useState('');
  const [userdata, setUserdata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(false);
    setUserdata(null);

    try {
      const userData = await fetchUserData(username);
      setUserdata(userData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={username}
          onChange={handleInputChange}
          placeholder="Enter GitHub username"
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            fontSize: '16px',
            width: '300px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      
      {error && <p>Looks like we cant find the user</p>}
      
      {userdata && (
        <div style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#f9f9f9'
        }}>
          <img
            src={userdata.avatar_url}
            alt={`${userdata.login}'s avatar`}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginBottom: '10px'
            }}
          />
          <h2>{userdata.name || userdata.login}</h2>
          <p><strong>Username:</strong> {userdata.login}</p>
          <p><strong>Public Repos:</strong> {userdata.public_repos}</p>
          <p><strong>Followers:</strong> {userdata.followers}</p>
          <p><strong>Following:</strong> {userdata.following}</p>
          <a
            href={userdata.html_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            View GitHub Profile
          </a>
        </div>
      )}
    </div>
  );
}

export default Search;