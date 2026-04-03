import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const Dashboard = ({ user, onViewCV, onBack }) => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCVs();
  }, [user]);

  const fetchCVs = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('cv_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCvs(data || []);
    } catch (err) {
      console.error('Error fetching CVs:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'white', letterSpacing: '-1px' }}>My Career Assets</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginTop: '8px' }}>View and manage your previously generated CVs and cover letters.</p>
        </div>
        <button 
          onClick={onBack}
          style={{ padding: '12px 24px', borderRadius: '30px', border: '1px solid var(--border)', color: 'var(--text)', fontWeight: '600', backgroundColor: 'var(--surface)' }}
        >
          Create New +
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>Loading...</div>
      ) : cvs.length === 0 ? (
        <div style={{ backgroundColor: 'var(--surface)', border: '1px dashed var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
          <h3 style={{ fontSize: '1.4rem', color: 'white', fontWeight: '800', marginBottom: '8px' }}>No CVs generated yet</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Once you generate a CV, it will be automatically saved here.</p>
          <button 
            onClick={onBack}
            style={{ background: 'var(--accent)', color: 'white', padding: '12px 28px', borderRadius: '12px', fontWeight: '700' }}
          >
            Create Your First CV
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {cvs.map(cv => (
            <div key={cv.id} style={{
              backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius)',
              padding: '24px', transition: 'all 0.3s ease', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: '16px'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={() => onViewCV(cv.data)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ backgroundColor: 'var(--accent-alpha)', color: 'var(--accent-light)', border: '1px solid var(--accent-glow)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>
                  {cv.data?.industry || 'Unknown Role'}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {new Date(cv.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'white', fontWeight: '800', marginBottom: '6px' }}>GT Career Suite</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Includes CV, Cover Letter, Gap Analysis, Certifications, and LinkedIn Bio.
                </p>
              </div>
              <div style={{ color: 'var(--accent-light)', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                View Full Package <span style={{ fontSize: '1rem' }}>→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
