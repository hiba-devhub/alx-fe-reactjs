// Sample data for testing favorites and recommendations functionality
export const sampleRecipes = [
  {
    id: 1,
    title: "Classic Chocolate Chip Cookies",
    description: "Delicious homemade chocolate chip cookies with a perfect chewy texture. Perfect for any occasion!",
    ingredients: ["flour", "butter", "sugar", "chocolate chips", "eggs", "vanilla"],
    cookingTime: 25
  },
  {
    id: 2,
    title: "Spaghetti Carbonara",
    description: "Authentic Italian pasta dish with creamy egg sauce, pancetta, and parmesan cheese.",
    ingredients: ["spaghetti", "eggs", "pancetta", "parmesan cheese", "black pepper"],
    cookingTime: 20
  },
  {
    id: 3,
    title: "Chicken Stir Fry",
    description: "Quick and healthy stir fry with fresh vegetables and tender chicken pieces.",
    ingredients: ["chicken breast", "broccoli", "bell peppers", "soy sauce", "garlic", "ginger"],
    cookingTime: 15
  },
  {
    id: 4,
    title: "Homemade Pizza",
    description: "Fresh pizza with homemade dough, tomato sauce, and your favorite toppings.",
    ingredients: ["flour", "tomato sauce", "mozzarella", "olive oil", "basil"],
    cookingTime: 45
  },
  {
    id: 5,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with creamy caesar dressing, croutons, and parmesan.",
    ingredients: ["romaine lettuce", "parmesan cheese", "croutons", "caesar dressing", "anchovies"],
    cookingTime: 10
  }
]

// Function to initialize sample data
export const initializeSampleData = (setRecipes) => {
  setRecipes(sampleRecipes)
}