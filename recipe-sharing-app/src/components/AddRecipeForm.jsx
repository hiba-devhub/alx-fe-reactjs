import { useState } from 'react'
import useRecipeStore from './recipeStore'

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [cookingTime, setCookingTime] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (title.trim() && description.trim()) {
      const ingredientsArray = ingredients.trim() 
        ? ingredients.split(',').map(ing => ing.trim()).filter(ing => ing.length > 0)
        : []
      
      addRecipe({ 
        id: Date.now(), 
        title: title.trim(), 
        description: description.trim(),
        ingredients: ingredientsArray,
        cookingTime: cookingTime.trim() ? parseInt(cookingTime) : null
      })
      setTitle('')
      setDescription('')
      setIngredients('')
      setCookingTime('')
    }
  }

  return (
    <div>
      <h2>Add New Recipe</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '400px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Recipe Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title"
            required
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe"
            required
            rows={4}
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Ingredients
          </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Enter ingredients separated by commas (e.g., flour, eggs, milk)"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <small style={{ color: '#6c757d', fontSize: '12px' }}>
            Separate multiple ingredients with commas
          </small>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            placeholder="Enter cooking time in minutes"
            min="1"
            style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <button 
          type="submit"
          style={{ 
            padding: '12px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Add Recipe
        </button>
      </form>
    </div>
  )
}

export default AddRecipeForm