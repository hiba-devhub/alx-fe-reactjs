import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'
import RecipeDetails from './components/RecipeDetails'

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing App</h1>
          <p>Share and discover amazing recipes!</p>
        </header>
        
        <Routes>
          <Route path="/" element={
            <main style={{ display: 'flex', gap: '40px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
              <div style={{ flex: '1' }}>
                <AddRecipeForm />
              </div>
              
              <div style={{ flex: '2' }}>
                <RecipeList />
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
