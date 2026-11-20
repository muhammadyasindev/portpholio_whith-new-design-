import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '60px 20px', fontFamily: 'system-ui, sans-serif', textAlign: 'center', backgroundColor: '#FDFDFD', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#0A0909', color: '#CEB3A6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', margin: '0 auto 20px auto' }}>MY</div>
          <h2 style={{ color: '#0A0909', marginBottom: '8px' }}>Interface Rendering Notice</h2>
          <p style={{ color: '#707070', fontSize: '14px', maxWidth: '400px', margin: '0 auto 20px auto' }}>
            A client-side issue occurred while loading this view.
          </p>
          <pre style={{ color: '#9C6455', background: '#F5F3F1', padding: '15px 25px', borderRadius: '12px', maxWidth: '650px', fontSize: '12px', textAlign: 'left', overflowX: 'auto', border: '1px solid #EAE6E3' }}>
            {this.state.error?.stack || this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '12px 28px', borderRadius: '9999px', background: '#0A0909', color: '#CEB3A6', cursor: 'pointer', border: 'none', fontWeight: 'bold', fontSize: '13px' }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
);
