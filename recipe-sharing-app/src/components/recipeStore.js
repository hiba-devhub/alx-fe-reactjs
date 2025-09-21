import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe]
    return { 
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe => filterRecipe(recipe, state.searchTerm))
    }
  }),
  
  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe => filterRecipe(recipe, state.searchTerm))
    }
  }),
  
  deleteRecipe: (recipeId) => set((state) => {
    const updatedRecipes = state.recipes.filter(recipe => recipe.id !== recipeId)
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter(recipe => filterRecipe(recipe, state.searchTerm))
    }
  }),
  
  setRecipes: (recipes) => set((state) => ({
    recipes,
    filteredRecipes: recipes.filter(recipe => filterRecipe(recipe, state.searchTerm))
  })),
  
  setSearchTerm: (term) => set((state) => {
    const filteredRecipes = state.recipes.filter(recipe => filterRecipe(recipe, term))
    return {
      searchTerm: term,
      filteredRecipes
    }
  }),
  
  filterRecipes: () => set((state) => ({
    filteredRecipes: state.recipes.filter(recipe => filterRecipe(recipe, state.searchTerm))
  })),
  
  // Initialize filteredRecipes to show all recipes when no search term
  initializeFilters: () => set((state) => ({
    filteredRecipes: state.searchTerm === '' ? state.recipes : state.filteredRecipes
  }))
}))

// Enhanced filtering function that searches across multiple fields
const filterRecipe = (recipe, searchTerm) => {
  if (!searchTerm) return true
  
  const term = searchTerm.toLowerCase()
  
  // Search in title and description
  const titleMatch = recipe.title.toLowerCase().includes(term)
  const descriptionMatch = recipe.description.toLowerCase().includes(term)
  
  // Search in ingredients if they exist
  let ingredientsMatch = false
  if (recipe.ingredients && Array.isArray(recipe.ingredients)) {
    ingredientsMatch = recipe.ingredients.some(ingredient => 
      ingredient.toLowerCase().includes(term)
    )
  }
  
  // Search in cooking time if it exists
  let cookingTimeMatch = false
  if (recipe.cookingTime) {
    cookingTimeMatch = recipe.cookingTime.toString().includes(term)
  }
  
  return titleMatch || descriptionMatch || ingredientsMatch || cookingTimeMatch
}

export default useRecipeStore