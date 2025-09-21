import { useEffect, useCallback } from 'react'
import useRecipeStore from './recipeStore'

const SearchBar = () => {
  const { searchTerm, setSearchTerm, filterRecipes } = useRecipeStore()

  // Debounced search function for better performance
  const handleSearchChange = useCallback((e) => {
    const term = e.target.value
    setSearchTerm(term)
  }, [setSearchTerm])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
  }, [setSearchTerm])

  return (
    <div style={{ 
      marginBottom: '20px', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '10px',
      padding: '15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <div style={{ position: 'relative', flex: '1' }}>
        <input
          type="text"
          placeholder="Search recipes by title, description, ingredients, or cooking time..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '12px 40px 12px 15px',
            border: '2px solid #ddd',
            borderRadius: '25px',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease',
            backgroundColor: 'white'
          }}
          onFocus={(e) => e.target.style.borderColor = '#007bff'}
          onBlur={(e) => e.target.style.borderColor = '#ddd'}
        />
        
        {/* Search Icon */}
        <div style={{
          position: 'absolute',
          right: '15px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#6c757d',
          pointerEvents: 'none'
        }}>
          🔍
        </div>
      </div>
      
      {searchTerm && (
        <button
          onClick={clearSearch}
          style={{
            padding: '8px 15px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
        >
          Clear
        </button>
      )}
      
      {searchTerm && (
        <div style={{
          fontSize: '14px',
          color: '#6c757d',
          whiteSpace: 'nowrap'
        }}>
          Searching for: "{searchTerm}"
        </div>
      )}
      
      {/* Search Tips */}
      <div style={{
        fontSize: '12px',
        color: '#999',
        fontStyle: 'italic',
        whiteSpace: 'nowrap'
      }}>
        💡 Try: "chicken", "30 minutes", or "flour"
      </div>
    </div>
  )
}

export default SearchBar