import './App.css'
import RecipeList from './components/RecipeList'
import AddRecipeForm from './components/AddRecipeForm'

function App() {
  return (
    <div className="app">
      <header>
        <h1>Recipe Sharing App</h1>
        <p>Share and discover amazing recipes!</p>
      </header>
      
      <main style={{ display: 'flex', gap: '40px', padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ flex: '1' }}>
          <AddRecipeForm />
        </div>
        
        <div style={{ flex: '2' }}>
          <RecipeList />
        </div>
      </main>
    </div>
  )
}

export default App
