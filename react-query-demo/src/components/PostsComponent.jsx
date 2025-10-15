import { useQuery } from '@tanstack/react-query';

// Function to fetch posts from the API
const fetchPosts = async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

function PostsComponent() {
  // Using useQuery hook to fetch data
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
    staleTime: 60000, // Data is considered fresh for 1 minute (60,000ms)
    cacheTime: 300000, // Cache data for 5 minutes (300,000ms)
  });

  // Handle loading state
  if (isLoading) {
    return <div style={styles.loading}>Loading posts...</div>;
  }

  // Handle error state
  if (isError) {
    return (
      <div style={styles.error}>
        <h2>Error fetching posts</h2>
        <p>{error.message}</p>
        <button onClick={() => refetch()} style={styles.button}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Posts from JSONPlaceholder API</h1>
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => refetch()} 
            style={styles.button}
            disabled={isFetching}
          >
            {isFetching ? 'Refetching...' : 'Refetch Posts'}
          </button>
          <span style={styles.status}>
            {isFetching ? '🔄 Fetching...' : '✅ Data Loaded'}
          </span>
        </div>
      </div>

      <div style={styles.info}>
        <p>
          <strong>Total Posts:</strong> {data?.length || 0}
        </p>
        <p style={styles.cacheInfo}>
          ℹ️ Data is cached for 5 minutes. Navigate away and come back to see 
          the cache in action!
        </p>
      </div>

      <div style={styles.postsGrid}>
        {data?.map((post) => (
          <div key={post.id} style={styles.postCard}>
            <div style={styles.postId}>#{post.id}</div>
            <h3 style={styles.postTitle}>{post.title}</h3>
            <p style={styles.postBody}>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Inline styles for the component
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginTop: '15px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  status: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#28a745',
  },
  info: {
    backgroundColor: '#f8f9fa',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  cacheInfo: {
    fontSize: '14px',
    color: '#6c757d',
    marginTop: '10px',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  postCard: {
    backgroundColor: '#ffffff',
    border: '1px solid #dee2e6',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  postId: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    display: 'inline-block',
    marginBottom: '10px',
  },
  postTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textTransform: 'capitalize',
    color: '#333',
  },
  postBody: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: '#666',
  },
  loading: {
    textAlign: 'center',
    fontSize: '24px',
    padding: '50px',
    color: '#007bff',
  },
  error: {
    textAlign: 'center',
    padding: '50px',
    color: '#dc3545',
  },
};

export default PostsComponent;
