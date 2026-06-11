import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const workoutsApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection(workoutsApiUrl)
      .then((items) => {
        if (isMounted) {
          setWorkouts(items);
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
        <p className="eyebrow">Suggestions</p>
        <h1>Workouts</h1>
      </div>
      {isLoading && <p className="text-muted">Loading workouts...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row g-3">
        {workouts.map((workout) => (
          <div className="col-md-6 col-xl-4" key={workout._id || workout.id}>
            <article className="data-card h-100">
              <h2>{workout.title}</h2>
              <p>{workout.activityType}</p>
              <span className="metric">{workout.durationMinutes} min · {workout.difficulty}</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workouts;