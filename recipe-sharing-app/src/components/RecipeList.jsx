import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes)

  return (
    <div>
      <h2>Recipe List</h2>
      {recipes.length === 0 ? (
        <p>No recipes yet. Add your first recipe!</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '15px', borderRadius: '5px' }}>
            <h3 style={{ marginBottom: '10px' }}>
              <Link 
                to={`/recipe/${recipe.id}`}
                style={{ 
                  color: '#007bff', 
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
                onMouseOut={(e) => e.target.style.textDecoration = 'none'}
              >
                {recipe.title}
              </Link>
            </h3>
            <p style={{ color: '#666', marginBottom: '10px' }}>{recipe.description}</p>
            <Link 
              to={`/recipe/${recipe.id}`}
              style={{ 
                display: 'inline-block',
                padding: '5px 10px',
                backgroundColor: '#007bff',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '3px',
                fontSize: '12px'
              }}
            >
              View Details
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default RecipeList