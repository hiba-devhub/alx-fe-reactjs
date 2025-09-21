import { useParams, Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'
import EditRecipeForm from './EditRecipeForm'
import DeleteRecipeButton from './DeleteRecipeButton'

const RecipeDetails = () => {
  const { id } = useParams()
  const recipeId = parseInt(id)
  
  const recipe = useRecipeStore(state =>
    state.recipes.find(recipe => recipe.id === recipeId)
  )

  if (!recipe) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Recipe not found</h2>
        <p>The recipe you're looking for doesn't exist.</p>
        <Link to="/" style={{ color: '#007bff', textDecoration: 'none' }}>
          ← Back to Recipe List
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ color: '#007bff', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Recipe List
      </Link>
      
      <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
        <h1 style={{ color: '#333', marginBottom: '15px' }}>{recipe.title}</h1>
        <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
          {recipe.description}
        </p>
        
        {/* Additional Recipe Details */}
        <div style={{ marginBottom: '20px' }}>
          {recipe.ingredients && recipe.ingredients.length > 0 && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '8px' }}>Ingredients:</h3>
              <ul style={{ color: '#666', fontSize: '14px', lineHeight: '1.5', paddingLeft: '20px' }}>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} style={{ marginBottom: '4px' }}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          
          {recipe.cookingTime && (
            <div style={{ marginBottom: '15px' }}>
              <h3 style={{ color: '#333', fontSize: '18px', marginBottom: '8px' }}>Cooking Time:</h3>
              <p style={{ color: '#666', fontSize: '16px', margin: '0' }}>
                🕒 {recipe.cookingTime} minutes
              </p>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <DeleteRecipeButton recipeId={recipe.id} />
        </div>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ marginBottom: '15px' }}>Edit Recipe</h3>
        <EditRecipeForm recipe={recipe} />
      </div>
    </div>
  )
}

export default RecipeDetails