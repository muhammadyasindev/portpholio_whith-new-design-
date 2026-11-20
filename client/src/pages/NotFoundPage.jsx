import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-6 text-center text-primary">
      <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
        Error 404
      </span>
      <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-primary mb-4 font-mono">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-bold mb-3">
        Page Not Located
      </h2>
      <p className="text-sm text-secondary max-w-md mb-8">
        The requested digital resource does not exist or may have been relocated.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-darkBrown text-warmBeige text-xs font-semibold tracking-wide transition-all shadow-sm"
      >
        <Home className="w-4 h-4" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
};

export default NotFoundPage;
