import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const usersApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection(usersApiUrl)
      .then((items) => {
        if (isMounted) {
          setUsers(items);
          setError('');
        }
      })
      .catch((requestError) => {
        if (isMounted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="data-view">
      <div className="section-heading">
        <p className="eyebrow">Profiles</p>
        <h1>Users</h1>
      </div>
      {isLoading && <p className="text-muted">Loading users...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row g-3">
        {users.map((user) => (
          <div className="col-md-6 col-xl-4" key={user._id || user.id}>
            <article className="data-card h-100">
              <h2>{user.displayName || user.username}</h2>
              <p>{user.email}</p>
              <span className="metric">Team {user.teamId}</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Users;