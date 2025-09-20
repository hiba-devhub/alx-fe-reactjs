import './UserCard.css';

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} className="user-avatar" />
      <div className="user-info">
        <h2 className="user-name">{user.name || user.login}</h2>
        <p className="user-username">@{user.login}</p>
        {user.bio && <p className="user-bio">{user.bio}</p>}
        <div className="user-stats">
          <span className="stat">
            <strong>{user.public_repos}</strong> repos
          </span>
          <span className="stat">
            <strong>{user.followers}</strong> followers
          </span>
          <span className="stat">
            <strong>{user.following}</strong> following
          </span>
        </div>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="profile-link"
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
