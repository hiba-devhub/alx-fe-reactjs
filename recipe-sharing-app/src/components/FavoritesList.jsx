import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const FavoritesList = () => {
  const { recipes, favorites, removeFavorite } = useRecipeStore()
  
  // Get favorite recipes by mapping favorite IDs to actual recipe objects
  const favoriteRecipes = favorites
    .map(id => recipes.find(recipe => recipe.id === id))
    .filter(recipe => recipe !== undefined) // Remove any undefined entries
  
  const handleRemoveFavorite = (recipeId) => {
    removeFavorite(recipeId)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0' }}>❤️ My Favorite Recipes</h2>
        <Link 
          to="/" 
          style={{ 
            color: '#007bff', 
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          ← Back to All Recipes
        </Link>
      </div>
      
      {favoriteRecipes.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>💔</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No Favorite Recipes Yet</h3>
          <p style={{ color: '#999', marginBottom: '20px' }}>
            Start exploring recipes and click the heart icon to add them to your favorites!
          </p>
          <Link 
            to="/" 
            style={{
              display: 'inline-block',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          >
            Browse Recipes
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#e8f4fd',
            borderRadius: '4px',
            border: '1px solid #bee5eb'
          }}>
            You have {favoriteRecipes.length} favorite recipe{favoriteRecipes.length !== 1 ? 's' : ''}
          </div>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {favoriteRecipes.map(recipe => (
              <div 
                key={recipe.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: '1' }}>
                    <h3 style={{ margin: '0 0 10px 0' }}>
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        style={{ 
                          color: '#007bff', 
                          textDecoration: 'none',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}
                      >
                        {recipe.title}
                      </Link>
                    </h3>
                    
                    <p style={{ 
                      color: '#666', 
                      margin: '0 0 15px 0', 
                      lineHeight: '1.5' 
                    }}>
                      {recipe.description}
                    </p>
                    
                    {/* Recipe metadata */}
                    <div style={{ marginBottom: '15px' }}>
                      {recipe.ingredients && recipe.ingredients.length > 0 && (
                        <div style={{ marginBottom: '8px' }}>
                          <strong style={{ color: '#333', fontSize: '14px' }}>Ingredients: </strong>
                          <span style={{ color: '#666', fontSize: '14px' }}>
                            {recipe.ingredients.slice(0, 3).join(', ')}
                            {recipe.ingredients.length > 3 && '...'}
                          </span>
                        </div>
                      )}
                      
                      {recipe.cookingTime && (
                        <div>
                          <strong style={{ color: '#333', fontSize: '14px' }}>Cooking Time: </strong>
                          <span style={{ color: '#666', fontSize: '14px' }}>
                            {recipe.cookingTime} minutes
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Link 
                        to={`/recipe/${recipe.id}`}
                        style={{ 
                          display: 'inline-block',
                          padding: '8px 16px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          textDecoration: 'none',
                          borderRadius: '4px',
                          fontSize: '14px'
                        }}
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  
                  {/* Remove from favorites button */}
                  <button
                    onClick={() => handleRemoveFavorite(recipe.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '24px',
                      color: '#dc3545',
                      padding: '5px',
                      borderRadius: '4px',
                      marginLeft: '15px',
                      transition: 'background-color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                    title="Remove from favorites"
                  >
                    💔
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FavoritesList