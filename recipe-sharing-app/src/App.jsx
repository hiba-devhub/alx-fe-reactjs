import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'

function App() {
  return (
    <Router>
      <div className="app">
        <header style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #e9ecef' }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>Recipe Sharing App</h1>
          <p style={{ margin: '0', color: '#666' }}>Share and discover amazing recipes!</p>
        </header>
        
        <Routes>
          <Route path="/" element={
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
              {/* Search Bar - Full Width */}
              <div style={{ marginBottom: '30px' }}>
                <SearchBar />
              </div>
              
              {/* Main Content Layout */}
              <div style={{ display: 'flex', gap: '40px' }}>
                <div style={{ flex: '1', minWidth: '300px' }}>
                  <AddRecipeForm />
                </div>
                
                <div style={{ flex: '2', minWidth: '400px' }}>
                  <RecipeList />
                </div>
              </div>
            </main>
          } />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
