# React Query Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📖 React Query Core Concepts

### 1. QueryClient Setup
```javascript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
```

### 2. useQuery Hook
```javascript
const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
  queryKey: ['posts'],          // Unique key for this query
  queryFn: fetchPosts,           // Function that returns a promise
  staleTime: 60000,              // Time before data is considered stale (1 min)
  cacheTime: 300000,             // Time data stays in cache (5 min)
});
```

---

## 🔑 Key Configuration Options

### staleTime
- **Default**: 0
- **Purpose**: Time (in ms) before data is considered stale
- **Example**: `staleTime: 60000` (1 minute)
- **Effect**: React Query won't refetch until data is stale

### cacheTime
- **Default**: 5 minutes (300000ms)
- **Purpose**: Time (in ms) before unused data is garbage collected
- **Example**: `cacheTime: 300000` (5 minutes)
- **Effect**: Data stays in memory for this duration after last use

### refetchOnWindowFocus
- **Default**: true
- **Purpose**: Refetch query when window regains focus
- **Example**: `refetchOnWindowFocus: false`
- **Effect**: Prevents automatic refetching on tab switch

### retry
- **Default**: 3
- **Purpose**: Number of times to retry failed requests
- **Example**: `retry: 1`
- **Effect**: Reduces wait time for failed requests

---

## 📊 Query States

| State | Description | Use Case |
|-------|-------------|----------|
| `isLoading` | Initial fetch in progress | Show loading spinner |
| `isFetching` | Any fetch in progress (including background) | Show subtle indicator |
| `isError` | Query encountered an error | Display error message |
| `isSuccess` | Query completed successfully | Render data |
| `data` | The actual data from the query | Display content |
| `error` | Error object if query failed | Show error details |

---

## 🎯 Common Patterns

### Basic Query
```javascript
const { data, isLoading, error } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
});
```

### Query with Loading State
```javascript
if (isLoading) return <div>Loading...</div>;
if (isError) return <div>Error: {error.message}</div>;
return <div>{data.map(item => <div key={item.id}>{item.title}</div>)}</div>;
```

### Manual Refetch
```javascript
const { refetch } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

<button onClick={() => refetch()}>Refresh</button>
```

### Query with Options
```javascript
const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: fetchPosts,
  staleTime: 5 * 60 * 1000,        // 5 minutes
  cacheTime: 10 * 60 * 1000,       // 10 minutes
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  retry: 2,
});
```

---

## 🛠️ DevTools Commands

### Open/Close DevTools
- Click the floating icon in the bottom corner
- Or press the configured keyboard shortcut

### DevTools Features
- View all active queries
- Inspect query cache
- See query states (fresh, fetching, stale)
- Manually trigger refetch
- View query timings
- Inspect query data

---

## 📱 API Endpoint Used

```
Base URL: https://jsonplaceholder.typicode.com
Endpoint: /posts
Method: GET
Response: Array of 100 post objects
```

### Sample Post Object:
```json
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident",
  "body": "quia et suscipit..."
}
```

---

## 🎨 Project Structure

```
src/
├── components/
│   └── PostsComponent.jsx    # Main component with useQuery
├── App.jsx                    # QueryClientProvider setup
├── App.css                    # Application styles
├── main.jsx                   # React entry point
└── index.css                  # Global styles
```

---

## 💡 Best Practices

### 1. Use Descriptive Query Keys
```javascript
// ✅ Good
queryKey: ['posts']
queryKey: ['posts', 'list']
queryKey: ['post', postId]

// ❌ Bad
queryKey: ['data']
queryKey: ['api']
```

### 2. Handle Loading and Error States
```javascript
if (isLoading) return <Loading />;
if (isError) return <Error message={error.message} />;
return <Content data={data} />;
```

### 3. Configure Appropriate Cache Times
```javascript
// For frequently changing data
staleTime: 0,
cacheTime: 60000, // 1 minute

// For rarely changing data
staleTime: 300000, // 5 minutes
cacheTime: 3600000, // 1 hour
```

### 4. Use DevTools in Development
```javascript
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

<ReactQueryDevtools initialIsOpen={false} />
```

---

## 🐛 Troubleshooting

### Query Not Fetching
- Check network connection
- Verify API endpoint is correct
- Check queryFn returns a promise
- Ensure QueryClientProvider wraps your app

### Data Not Caching
- Verify cacheTime is set
- Check query keys are consistent
- Ensure QueryClient is properly configured

### Stale Data Showing
- Increase staleTime value
- Use refetch() to manually update
- Check refetchOnWindowFocus setting

### Too Many API Calls
- Increase staleTime
- Set refetchOnWindowFocus to false
- Check for unnecessary component re-renders

---

## 📚 Useful Links

- **TanStack Query Docs**: https://tanstack.com/query/latest
- **JSONPlaceholder API**: https://jsonplaceholder.typicode.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

## 🎯 Key Takeaways

1. **React Query simplifies data fetching** - No need to manage loading/error states manually
2. **Automatic caching** - Reduces API calls and improves performance
3. **Background updates** - Keeps data fresh without user interaction
4. **DevTools** - Powerful debugging and inspection capabilities
5. **Query keys** - Enable powerful caching and invalidation strategies

---

## ⚡ Performance Tips

1. **Set appropriate staleTime** - Reduce unnecessary refetches
2. **Use cacheTime wisely** - Balance memory usage and data freshness
3. **Disable refetchOnWindowFocus** - For stable data that doesn't change often
4. **Use query keys effectively** - Enable granular cache management
5. **Implement pagination** - For large datasets (use useInfiniteQuery)

---

**Happy Coding! 🚀**
