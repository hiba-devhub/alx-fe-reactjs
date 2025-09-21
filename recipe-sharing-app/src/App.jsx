import './App.css'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'
import SearchBar from './components/SearchBar'
import FavoritesList from './components/FavoritesList'
import RecommendationsList from './components/RecommendationsList'
import Navigation from './components/Navigation'
import useRecipeStore from './components/recipeStore'
import { initializeSampleData } from './components/sampleData'

function App() {
  const { recipes, setRecipes } = useRecipeStore()
  
  // Initialize with sample data if no recipes exist
  useEffect(() => {
    if (recipes.length === 0) {
      initializeSampleData(setRecipes)
    }
  }, [recipes.length, setRecipes])
  
  return (
    <Router>
      <div className="app">
        <header style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid #e9ecef' }}>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>Recipe Sharing App</h1>
          <p style={{ margin: '0 0 15px 0', color: '#666' }}>Share and discover amazing recipes!</p>
          
          {/* Navigation Menu with Dynamic Counters */}
          <Navigation />
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
          <Route path="/favorites" element={<FavoritesList />} />
          <Route path="/recommendations" element={<RecommendationsList />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
