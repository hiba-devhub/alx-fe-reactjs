# React Query Demo

A comprehensive demonstration of React Query (TanStack Query) for efficient data fetching, caching, and state management in React applications.

## 🎯 Project Overview

This project demonstrates advanced data fetching and management using React Query, showcasing:
- Efficient API interactions
- Automatic caching mechanisms
- Loading and error state management
- Data refetching capabilities
- DevTools integration for debugging

## 🚀 Features Implemented

### 1. **React Query Integration**
- Set up `QueryClient` and `QueryClientProvider`
- Configured default query options for optimal performance
- Integrated React Query DevTools for development

### 2. **PostsComponent**
- Fetches data from JSONPlaceholder API
- Displays 100 posts in a responsive grid layout
- Implements the `useQuery` hook with custom configuration

### 3. **Advanced Features**
- **Caching**: Data is cached for 5 minutes (300,000ms)
- **Stale Time**: Data considered fresh for 1 minute (60,000ms)
- **Refetch Button**: Manual data refetching on demand
- **Loading States**: Visual feedback during data fetching
- **Error Handling**: Graceful error display with retry option

### 4. **User Experience Enhancements**
- Beautiful gradient background
- Responsive card-based layout
- Real-time fetching status indicators
- Smooth animations and hover effects
- Information about cache behavior

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🛠️ Technology Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **TanStack Query (React Query)** - Data fetching and caching
- **JSONPlaceholder API** - Mock REST API for testing

## 📚 Key Concepts Demonstrated

### React Query Configuration
```javascript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### Using useQuery Hook
```javascript
const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 60000,
  cacheTime: 300000,
});
```

## 🧪 Testing the Application

### Test Caching Behavior:
1. Open the application and wait for posts to load
2. Navigate to another tab/page
3. Return to the application
4. Notice how data loads instantly from cache (check Network tab - no new request!)

### Test Refetching:
1. Click the "Refetch Posts" button
2. Observe the loading indicator
3. Check the Network tab to see the new API request
4. Notice how React Query updates the data seamlessly

### Using React Query DevTools:
1. Look for the floating React Query icon in the bottom corner
2. Click it to open the DevTools
3. Inspect the query cache
4. Watch query states change in real-time
5. Observe cache timing and query lifecycle

## 🔍 Monitoring Cache Behavior

### Browser DevTools - Network Tab:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Observe that:
   - Initial load makes 1 API request
   - Returning within cache time makes NO new request
   - Clicking refetch makes a new request
   - After cache expires (5 min), new request is made

### React Query DevTools:
- **Fresh**: Query data is considered fresh (within staleTime)
- **Fetching**: Currently fetching new data
- **Stale**: Data is stale but still in cache
- **Inactive**: Query has no active observers

## 📁 Project Structure

```
react-query-demo/
├── src/
│   ├── components/
│   │   └── PostsComponent.jsx    # Main component with data fetching
│   ├── App.jsx                    # QueryClient setup
│   ├── App.css                    # Styling
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── package.json
└── README.md
```

## 🎓 Learning Outcomes

After completing this project, you will understand:
- How React Query simplifies data fetching in React
- The benefits of automatic caching and background updates
- How to handle loading and error states efficiently
- The difference between `staleTime` and `cacheTime`
- How to use React Query DevTools for debugging
- Best practices for API integration in React applications

## 🔗 API Endpoint

- **Base URL**: `https://jsonplaceholder.typicode.com`
- **Posts Endpoint**: `/posts`
- **Response**: Array of 100 post objects

## 📊 Performance Benefits

React Query provides:
- **Reduced API Calls**: Caching prevents unnecessary network requests
- **Better UX**: Instant data display from cache
- **Automatic Background Updates**: Keeps data fresh without user intervention
- **Request Deduplication**: Multiple components can use the same query
- **Optimistic Updates**: Update UI before server responds

## 🎨 UI Features

- Gradient purple background
- Responsive grid layout (auto-adjusts to screen size)
- Post cards with hover effects
- Status indicators for fetching state
- Clear visual feedback for all operations

## 🚦 Next Steps

To extend this project, consider:
- Implementing infinite scrolling with `useInfiniteQuery`
- Adding mutations for POST/PUT/DELETE operations
- Creating a detail view for individual posts
- Implementing optimistic updates
- Adding pagination or filtering
- Integrating with a real backend API

## 📖 Resources

- [TanStack Query Docs](https://tanstack.com/query/latest)
- [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)
- [React Documentation](https://react.dev/)

---

**Author**: ALX Frontend Development Program  
**Date**: October 2025

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
