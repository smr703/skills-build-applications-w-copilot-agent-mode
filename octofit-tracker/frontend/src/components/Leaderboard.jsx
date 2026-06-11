import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const leaderboardApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection(leaderboardApiUrl)
      .then((items) => {
        if (isMounted) {
          setEntries(items);
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
        <p className="eyebrow">Competitive standings</p>
        <h1>Leaderboard</h1>
      </div>
      {isLoading && <p className="text-muted">Loading leaderboard...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="list-group shadow-sm">
        {entries.map((entry, index) => (
          <div className="list-group-item leaderboard-row" key={entry._id || entry.userId}>
            <span className="rank">#{entry.rank || index + 1}</span>
            <span>{entry.displayName || entry.username}</span>
            <strong>{entry.points} pts</strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Leaderboard;