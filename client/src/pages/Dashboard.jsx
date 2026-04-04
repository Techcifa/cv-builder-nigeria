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
          <h1 className="dashboard-title">Your Career Portfolio</h1>
          <p className="muted mt-8">
            Access, deploy, and continuously refine your high-performance application assets.
          </p>
        </div>
        <button type="button" className="btn" onClick={onBack}>
          Deploy New Application
        </button>
      </header>

      {loading ? (
        <div className="loader card card-panel panel">
          <div className="spinner" />
          <p>Loading your saved results...</p>
        </div>
      ) : cvs.length === 0 ? (
        <div className="card card-panel panel panel-pad">
          <h3>Your portfolio is empty</h3>
          <p className="muted mt-8 mb-16">
            Initiate your first generation to establish your baseline career assets.
          </p>
          <button type="button" className="btn btn-primary" onClick={onBack}>
            Deploy New Application
          </button>
        </div>
      ) : (
        <div className="dashboard-grid">
          {cvs.map((cv) => (
            <button
              key={cv.id}
              type="button"
              className="card dashboard-card"
              onClick={() => onViewCV(cv.data)}
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
              <h3>Pre-Calibrated Application Suite</h3>
              <p className="muted">CV, diagnostics, upskilling roadmap, cover letter, and LinkedIn profile copy.</p>
              <strong className="accent-text">Open Suite</strong>
            </button>
          ))}
        </div>
      )}
    </section>
  );
};

export default Dashboard;
