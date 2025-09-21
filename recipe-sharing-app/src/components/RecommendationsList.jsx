import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const RecommendationsList = () => {
  const { 
    recommendations, 
    favorites, 
    generateRecommendations, 
    addFavorite, 
    removeFavorite, 
    isFavorite 
  } = useRecipeStore()
  
  // Generate recommendations when component mounts or favorites change
  useEffect(() => {
    generateRecommendations()
  }, [generateRecommendations, favorites.length])
  
  const handleToggleFavorite = (recipeId) => {
    if (isFavorite(recipeId)) {
      removeFavorite(recipeId)
    } else {
      addFavorite(recipeId)
    }
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', margin: '0' }}>🌟 Recommended for You</h2>
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
      
      {recommendations.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🤔</div>
          <h3 style={{ color: '#6c757d', marginBottom: '10px' }}>No Recommendations Yet</h3>
          <p style={{ color: '#999', marginBottom: '20px' }}>
            Add some recipes to your favorites to get personalized recommendations!
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
            <Link 
              to="/favorites" 
              style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#28a745',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            >
              View Favorites
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ 
            fontSize: '14px', 
            color: '#6c757d', 
            marginBottom: '20px',
            padding: '10px',
            backgroundColor: '#fff3cd',
            borderRadius: '4px',
            border: '1px solid #ffeaa7'
          }}>
            ✨ Based on your {favorites.length} favorite recipe{favorites.length !== 1 ? 's' : ''}, 
            we found {recommendations.length} recommendation{recommendations.length !== 1 ? 's' : ''} for you!
          </div>
          
          <div style={{ display: 'grid', gap: '15px' }}>
            {recommendations.map(recipe => (
              <div 
                key={recipe.id} 
                style={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  padding: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.3s ease',
                  borderLeft: '4px solid #ffc107' // Yellow accent for recommendations
                }}
                onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
                onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: '1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ 
                        backgroundColor: '#ffc107', 
                        color: 'white', 
                        padding: '2px 8px', 
                        borderRadius: '12px', 
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginRight: '10px'
                      }}>
                        RECOMMENDED
                      </span>
                      <h3 style={{ margin: '0' }}>
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
                    </div>
                    
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
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
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
                      
                      <button
                        onClick={() => handleToggleFavorite(recipe.id)}
                        style={{
                          background: 'none',
                          border: '1px solid #ddd',
                          cursor: 'pointer',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = '#f8f9fa'
                          e.target.style.borderColor = '#007bff'
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = 'transparent'
                          e.target.style.borderColor = '#ddd'
                        }}
                      >
                        {isFavorite(recipe.id) ? '❤️' : '🤍'} 
                        {isFavorite(recipe.id) ? 'Favorited' : 'Add to Favorites'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '20px', 
            textAlign: 'center',
            padding: '15px',
            backgroundColor: '#e8f4fd',
            borderRadius: '8px',
            border: '1px solid #bee5eb'
          }}>
            <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
              💡 The more recipes you favorite, the better our recommendations become!
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default RecommendationsList