import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api.js';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const activitiesApiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchCollection(activitiesApiUrl)
      .then((items) => {
        if (isMounted) {
          setActivities(items);
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
        <p className="eyebrow">Activity log</p>
        <h1>Activities</h1>
      </div>
      {isLoading && <p className="text-muted">Loading activities...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row g-3">
        {activities.map((activity) => (
          <div className="col-md-6 col-xl-4" key={activity._id || activity.id}>
            <article className="data-card h-100">
              <h2>{activity.activityType}</h2>
              <p>{activity.durationMinutes} minutes</p>
              <span className="metric">{activity.points} pts</span>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Activities;