import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const DeleteRecipeButton = ({ recipeId }) => {
  const navigate = useNavigate()
  const deleteRecipe = useRecipeStore(state => state.deleteRecipe)

  const handleDelete = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this recipe? This action cannot be undone.'
    )
    
    if (confirmed) {
      deleteRecipe(recipeId)
      navigate('/') // Navigate back to recipe list after deletion
    }
  }

  return (
    <button
      onClick={handleDelete}
      style={{
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px'
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
      onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
    >
      Delete Recipe
    </button>
  )
}

export default DeleteRecipeButton