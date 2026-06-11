import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const teamsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection(teamsApiUrl)
      .then((items) => {
        if (isMounted) {
          setTeams(items);
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
        <p className="eyebrow">Groups</p>
        <h1>Teams</h1>
      </div>
      {isLoading && <p className="text-muted">Loading teams...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row g-3">
        {teams.map((team) => (
          <div className="col-md-6" key={team._id || team.id}>
            <article className="data-card h-100">
              <h2>{team.name}</h2>
              <p>{team.mascot}</p>
              <span className="metric">{team.memberCount} members</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Teams;