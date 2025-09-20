import { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import UserCard from './components/UserCard'
import { searchUser } from './services/githubApi'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (username) => {
    setLoading(true)
    setError('')
    setUser(null)

    const result = await searchUser(username)
    
    if (result.success) {
      setUser(result.data)
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>GitHub User Search</h1>
        <p>Search for GitHub users and view their profiles</p>
      </header>
      
      <main className="app-main">
        <SearchBar onSearch={handleSearch} />
        
        {loading && <div className="loading">Searching...</div>}
        
        {error && <div className="error">{error}</div>}
        
        {user && <UserCard user={user} />}
        
        {!user && !loading && !error && (
          <div className="placeholder">
            Enter a GitHub username to get started
          </div>
        )}
      </main>
    </div>
  )
}

export default App
