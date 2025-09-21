import { Link, useLocation } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const Navigation = () => {
  const location = useLocation()
  const { favorites, recommendations } = useRecipeStore()
  
  const isActive = (path) => location.pathname === path
  
  const navLinkStyle = (path, bgColor, hoverColor) => ({
    textDecoration: 'none',
    padding: '8px 16px',
    borderRadius: '20px',
    backgroundColor: isActive(path) ? hoverColor : bgColor,
    color: path === '/recommendations' ? '#333' : 'white',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  })

  return (
    <nav style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
      <Link 
        to="/" 
        style={navLinkStyle('/', '#007bff', '#0056b3')}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = isActive('/') ? '#0056b3' : '#007bff'}
      >
        🏠 Home
      </Link>
      
      <Link 
        to="/favorites" 
        style={navLinkStyle('/favorites', '#dc3545', '#c82333')}
        onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
        onMouseOut={(e) => e.target.style.backgroundColor = isActive('/favorites') ? '#c82333' : '#dc3545'}
      >
        ❤️ Favorites
        {favorites.length > 0 && (
          <span style={{
            backgroundColor: 'white',
            color: '#dc3545',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginLeft: '4px'
          }}>
            {favorites.length}
          </span>
        )}
      </Link>
      
      <Link 
        to="/recommendations" 
        style={navLinkStyle('/recommendations', '#ffc107', '#e0a800')}
        onMouseOver={(e) => e.target.style.backgroundColor = '#e0a800'}
        onMouseOut={(e) => e.target.style.backgroundColor = isActive('/recommendations') ? '#e0a800' : '#ffc107'}
      >
        🌟 Recommendations
        {recommendations.length > 0 && (
          <span style={{
            backgroundColor: '#333',
            color: '#ffc107',
            borderRadius: '10px',
            padding: '2px 6px',
            fontSize: '12px',
            fontWeight: 'bold',
            marginLeft: '4px'
          }}>
            {recommendations.length}
          </span>
        )}
      </Link>
    </nav>
  )
}

export default Navigation