import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpenText,
  CheckCheck,
  ClipboardList,
  FileSearch,
  GraduationCap,
  LockKeyhole,
  Search,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const features = [
  {
    icon: ClipboardList,
    title: 'Easy Submission',
    description: 'Submit your grievance in just a few guided steps.'
  },
  {
    icon: FileSearch,
    title: 'Track Status',
    description: 'Follow progress updates from submission to resolution.'
  },
  {
    icon: CheckCheck,
    title: 'Fair Resolution',
    description: 'Cases are routed to the right authority for review.'
  },
  {
    icon: LockKeyhole,
    title: 'Confidential and Secure',
    description: 'Your complaint data stays protected and access-controlled.'
  }
];

const knowledgeTopics = [
  'How to submit a grievance',
  'Academic complaint handling',
  'Hostel and facilities escalation',
  'Expected review timelines'
];

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [reference, setReference] = useState('');
  const [trackingMessage, setTrackingMessage] = useState('');

  const handleTrack = (event) => {
    event.preventDefault();
    if (!reference.trim()) {
      setTrackingMessage('Enter a grievance reference number to continue.');
      return;
    }

    setTrackingMessage('Tracking is available after login. Use the dashboard to view grievance progress.');
  };

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-shell home-nav">
          <Link className="brand-link" to="/">
            <span className="brand-badge">
              <ShieldCheck size={18} />
            </span>
            <span>Student Grievance</span>
          </Link>

          <nav className="home-menu">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#grievances">Grievances</a>
            <a href="#knowledge">Knowledge Base</a>
            <a href="#contact">Contact</a>
          </nav>

          <button
            className="nav-login"
            type="button"
            onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}
          >
            {isAuthenticated ? 'Dashboard' : 'Login'}
          </button>
        </div>
      </header>

      <section className="hero-band" id="home">
        <div className="home-shell hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker">Transparent grievance resolution for students</p>
            <h1>Your Voice. Our Responsibility.</h1>
            <p className="hero-text">
              A streamlined platform for raising, tracking, and resolving academic, facility, and
              administrative grievances across campus.
            </p>
            <div className="hero-actions">
              <button className="primary-cta" type="button" onClick={() => navigate('/register')}>
                Raise a Grievance
                <ArrowRight size={17} />
              </button>
              <a className="secondary-cta" href="#track">
                Track Grievance
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-glow" />
            <div className="hero-card hero-card-main">
              <div className="hero-card-header">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-shield">
                <ShieldCheck size={52} />
              </div>
              <div className="hero-lines">
                <div />
                <div />
                <div />
              </div>
            </div>
            <div className="hero-card hero-card-side">
              <GraduationCap size={24} />
              <span>Student Support</span>
            </div>
          </div>
        </div>
      </section>

      <section className="feature-band" id="about">
        <div className="home-shell feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article className="feature-tile" key={feature.title}>
                <div className="feature-icon">
                  <Icon size={20} />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="content-band" id="grievances">
        <div className="home-shell two-column-band">
          <div className="content-copy">
            <p className="section-tag">Grievance workflow</p>
            <h2>Submit and resolve issues through a guided process.</h2>
            <p>
              Students can file grievances with clear categories, track updates, and maintain a
              record of every complaint from one dashboard.
            </p>
            <ul className="process-list">
              <li>Provide grievance details and category</li>
              <li>Review the complaint and submit securely</li>
              <li>Track review progress and final resolution</li>
            </ul>
          </div>

          <div className="process-panel">
            <div className="process-step active">
              <span>1</span>
              <div>
                <strong>Grievance Details</strong>
                <small>Provide issue information</small>
              </div>
            </div>
            <div className="process-step">
              <span>2</span>
              <div>
                <strong>Category</strong>
                <small>Select the relevant complaint area</small>
              </div>
            </div>
            <div className="process-step">
              <span>3</span>
              <div>
                <strong>Description</strong>
                <small>Explain the concern clearly</small>
              </div>
            </div>
            <div className="process-step">
              <span>4</span>
              <div>
                <strong>Review and Submit</strong>
                <small>Verify and send to the authority</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-band alt-band" id="track">
        <div className="home-shell track-band">
          <div className="track-copy">
            <p className="section-tag">Track grievance</p>
            <h2>Check the current status of your submitted complaint.</h2>
            <p>Use your grievance reference number to continue the follow-up process.</p>
          </div>

          <form className="track-form" onSubmit={handleTrack}>
            <label htmlFor="reference">Reference Number</label>
            <div className="track-input-row">
              <input
                id="reference"
                value={reference}
                onChange={(event) => setReference(event.target.value)}
                placeholder="Enter your reference number (e.g. GRV202400123)"
              />
              <button type="submit">
                <Search size={16} />
                Track Status
              </button>
            </div>
            {trackingMessage && <p className="track-note">{trackingMessage}</p>}
          </form>
        </div>
      </section>

      <section className="content-band" id="knowledge">
        <div className="home-shell knowledge-band">
          <div className="knowledge-head">
            <div>
              <p className="section-tag">Knowledge base</p>
              <h2>Helpful information before you submit.</h2>
            </div>
            <div className="knowledge-search">
              <Search size={16} />
              <input placeholder="Search topics, procedures, guidelines..." />
            </div>
          </div>

          <div className="knowledge-grid">
            {knowledgeTopics.map((topic) => (
              <article className="knowledge-card" key={topic}>
                <BookOpenText size={20} />
                <h3>{topic}</h3>
                <p>Read the process, required details, and expected review timeline.</p>
                <a href="#contact">Read More</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band contact-band" id="contact">
        <div className="home-shell contact-panel">
          <div>
            <p className="section-tag">Need help?</p>
            <h2>Reach the grievance support desk for assistance.</h2>
            <p>
              For urgent campus issues or guidance on filing a complaint, sign in and submit a
              grievance through the portal.
            </p>
          </div>

          <div className="contact-actions">
            <button className="primary-cta" type="button" onClick={() => navigate('/register')}>
              Get Started
              <ArrowRight size={17} />
            </button>
            <button className="secondary-cta button-like" type="button" onClick={() => navigate('/login')}>
              Open Portal
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
