import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useRecipeStore from './recipeStore'

const EditRecipeForm = ({ recipe }) => {
  const navigate = useNavigate()
  const updateRecipe = useRecipeStore(state => state.updateRecipe)
  
  const [title, setTitle] = useState(recipe?.title || '')
  const [description, setDescription] = useState(recipe?.description || '')
  const [ingredients, setIngredients] = useState(
    recipe?.ingredients ? recipe.ingredients.join(', ') : ''
  )
  const [cookingTime, setCookingTime] = useState(
    recipe?.cookingTime ? recipe.cookingTime.toString() : ''
  )
  const [isEditing, setIsEditing] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title.trim() && description.trim()) {
      const ingredientsArray = ingredients.trim() 
        ? ingredients.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0)
        : []
      
      updateRecipe({
        ...recipe,
        title: title.trim(),
        description: description.trim(),
        ingredients: ingredientsArray,
        cookingTime: cookingTime.trim() ? parseInt(cookingTime) : null
      })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTitle(recipe?.title || '')
    setDescription(recipe?.description || '')
    setIngredients(recipe?.ingredients ? recipe.ingredients.join(', ') : '')
    setCookingTime(recipe?.cookingTime ? recipe.cookingTime.toString() : '')
    setIsEditing(false)
  }

  if (!isEditing) {
    return (
      <button
        onClick={() => setIsEditing(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Edit Recipe
      </button>
    )
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
      <h4 style={{ marginBottom: '15px' }}>Edit Recipe</h4>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Ingredients:
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
          <small style={{ color: '#6c757d', fontSize: '12px' }}>
            Separate multiple ingredients with commas
          </small>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Cooking Time (minutes):
          </label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Enter cooking time in minutes"
            min="1"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditRecipeForm