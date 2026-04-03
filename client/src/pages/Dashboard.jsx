import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Dashboard = ({ user, onViewCV, onBack }) => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('cv_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setCvs(data || []);
      } catch (error) {
        console.error('Error fetching CVs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, [user]);

  return (
    <section className="dashboard-layout">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Saved Career Packages</h1>
          <p className="muted mt-8">
            Reopen previous generations and continue refining before you apply.
          </p>
        </div>
        <button type="button" className="btn" onClick={onBack}>
          Create New Package
        </button>
      </header>

      {loading ? (
        <div className="loader panel">
          <div className="spinner" />
          <p>Loading your saved results...</p>
        </div>
      ) : cvs.length === 0 ? (
        <div className="panel panel-pad">
          <h3>No generated packages yet</h3>
          <p className="muted mt-8 mb-16">
            Generate your first CV package to start building your application library.
          </p>
          <button type="button" className="btn btn-primary" onClick={onBack}>
            Start First Generation
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {cvs.map((cv) => (
            <article
              key={cv.id}
              className="dashboard-card"
              role="button"
              tabIndex={0}
              onClick={() => onViewCV(cv.data)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') onViewCV(cv.data);
              }}
            >
              <div className="row-between">
                <span className="flow-chip">{cv.data?.industry || 'General'}</span>
                <span className="muted text-xs">
                  {new Date(cv.created_at).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <h3>Full Career Package</h3>
              <p className="muted">CV rewrite, gap analysis, certifications, cover letter, and LinkedIn text.</p>
              <strong className="accent-text">Open package</strong>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
