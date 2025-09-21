import { create } from 'zustand'

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [], // Array of recipe IDs that user has favorited
  recommendations: [], // Array of recommended recipes
  
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
    const updatedFavorites = state.favorites.filter(id => id !== recipeId)
    return {
      recipes: updatedRecipes,
      favorites: updatedFavorites,
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
  })),
  
  // Favorites management
  addFavorite: (recipeId) => set((state) => {
    if (!state.favorites.includes(recipeId)) {
      const updatedFavorites = [...state.favorites, recipeId]
      return { 
        favorites: updatedFavorites,
        // Auto-generate recommendations when favorites change
        recommendations: generateRecommendations(state.recipes, updatedFavorites)
      }
    }
    return state
  }),
  
  removeFavorite: (recipeId) => set((state) => {
    const updatedFavorites = state.favorites.filter(id => id !== recipeId)
    return {
      favorites: updatedFavorites,
      // Auto-generate recommendations when favorites change
      recommendations: generateRecommendations(state.recipes, updatedFavorites)
    }
  }),
  
  // Generate personalized recommendations
  generateRecommendations: () => set((state) => ({
    recommendations: generateRecommendations(state.recipes, state.favorites)
  })),
  
  // Check if a recipe is favorited
  isFavorite: (recipeId) => {
    const state = get()
    return state.favorites.includes(recipeId)
  },
  
  // Toggle favorite status
  toggleFavorite: (recipeId) => {
    const state = get()
    if (state.favorites.includes(recipeId)) {
      state.removeFavorite(recipeId)
    } else {
      state.addFavorite(recipeId)
    }
  }
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

// Smart recommendation algorithm based on user favorites
const generateRecommendations = (recipes, favorites) => {
  if (favorites.length === 0) {
    // If no favorites, recommend random popular recipes
    return recipes
      .filter(recipe => Math.random() > 0.7)
      .slice(0, 3)
  }
  
  const favoriteRecipes = recipes.filter(recipe => favorites.includes(recipe.id))
  const nonFavoriteRecipes = recipes.filter(recipe => !favorites.includes(recipe.id))
  
  if (favoriteRecipes.length === 0) return []
  
  // Analyze favorite recipes to find common patterns
  const favoriteIngredients = []
  const favoriteCookingTimes = []
  
  favoriteRecipes.forEach(recipe => {
    if (recipe.ingredients) {
      favoriteIngredients.push(...recipe.ingredients)
    }
    if (recipe.cookingTime) {
      favoriteCookingTimes.push(recipe.cookingTime)
    }
  })
  
  // Calculate average cooking time preference
  const avgCookingTime = favoriteCookingTimes.length > 0 
    ? favoriteCookingTimes.reduce((sum, time) => sum + time, 0) / favoriteCookingTimes.length
    : null
  
  // Score non-favorite recipes based on similarity to favorites
  const scoredRecipes = nonFavoriteRecipes.map(recipe => {
    let score = 0
    
    // Score based on common ingredients
    if (recipe.ingredients && favoriteIngredients.length > 0) {
      const commonIngredients = recipe.ingredients.filter(ingredient =>
        favoriteIngredients.some(favIng => 
          favIng.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(favIng.toLowerCase())
        )
      )
      score += commonIngredients.length * 2
    }
    
    // Score based on similar cooking time
    if (recipe.cookingTime && avgCookingTime) {
      const timeDifference = Math.abs(recipe.cookingTime - avgCookingTime)
      if (timeDifference <= 15) score += 3 // Within 15 minutes
      else if (timeDifference <= 30) score += 1 // Within 30 minutes
    }
    
    // Add some randomness to keep recommendations fresh
    score += Math.random() * 0.5
    
    return { ...recipe, score }
  })
  
  // Return top 5 recommendations sorted by score
  return scoredRecipes
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ score, ...recipe }) => recipe) // Remove score from final result
}

export default useRecipeStore