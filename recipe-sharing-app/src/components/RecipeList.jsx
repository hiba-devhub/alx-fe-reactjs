import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecipeList = () => {
  const { 
    recipes, 
    filteredRecipes, 
    searchTerm, 
    initializeFilters, 
    addFavorite, 
    removeFavorite, 
    isFavorite 
  } = useRecipeStore()
  
  // Initialize filtered recipes when component mounts
  useEffect(() => {
    initializeFilters()
  }, [initializeFilters])
  
  // Determine which recipes to display
  const recipesToDisplay = searchTerm === '' ? recipes : filteredRecipes
  const isSearching = searchTerm !== ''
  
  const handleToggleFavorite = (e, recipeId) => {
    e.preventDefault() // Prevent navigation when clicking heart
    e.stopPropagation()
    
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }
  
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2>Recipe List</h2>
        {isSearching && (
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            Found {recipesToDisplay.length} recipe(s) matching "{searchTerm}"
          </div>
        )}
      </div>
      
      {recipesToDisplay.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6c757d' }}>
          {isSearching ? (
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>🔍 No recipes found</p>
              <p>No recipes match your search term "{searchTerm}"</p>
              <p style={{ fontSize: '14px' }}>Try searching with different keywords or check your spelling.</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '18px', marginBottom: '10px' }}>📝 No recipes yet</p>
              <p>Add your first recipe to get started!</p>
            </div>
          )}
        </div>
      ) : (
        <div>
          {recipesToDisplay.map(recipe => (
            <div key={recipe.id} style={{ 
              border: '1px solid #ccc', 
              margin: '10px 0', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: '1' }}>
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
                  <p style={{ color: '#666', marginBottom: '15px', lineHeight: '1.5' }}>
                    {recipe.description}
                  </p>
                  
                  {/* Additional Recipe Information */}
                  <div style={{ marginBottom: '15px' }}>
                    {recipe.ingredients && recipe.ingredients.length > 0 && (
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#333', fontSize: '14px' }}>Ingredients: </strong>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          {recipe.ingredients.join(', ')}
                        </span>
                      </div>
                    )}
                    
                    {recipe.cookingTime && (
                      <div style={{ marginBottom: '8px' }}>
                        <strong style={{ color: '#333', fontSize: '14px' }}>Cooking Time: </strong>
                        <span style={{ color: '#666', fontSize: '14px' }}>
                          {recipe.cookingTime} minutes
                        </span>
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link 
                      to={`/recipe/${recipe.id}`}
                      style={{ 
                        display: 'inline-block',
                        padding: '8px 16px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '4px',
                        fontSize: '14px',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      View Details →
                    </Link>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      Recipe ID: {recipe.id}
                    </div>
                  </div>
                </div>
                
                {/* Favorite toggle button */}
                <button
                  onClick={(e) => handleToggleFavorite(e, recipe.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '24px',
                    padding: '5px',
                    borderRadius: '4px',
                    marginLeft: '15px',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                  title={isFavorite(recipe.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(recipe.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isSearching && recipes.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          marginTop: '20px', 
          padding: '15px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#6c757d'
        }}>
          Total: {recipes.length} recipe(s) • Use the search bar above to find specific recipes
        </div>
      )}
    </div>
  )
}

export default RecipeList