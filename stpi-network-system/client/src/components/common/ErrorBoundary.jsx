import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center p-8 rounded-2xl border border-rose-500/20 bg-rose-500/5 text-center">
          <div className="rounded-full bg-rose-500/20 p-3 mb-4">
            <AlertCircle className="h-6 w-6 text-rose-500" />
          </div>
          <h3 className="text-lg font-semibold text-white">Something went wrong</h3>
          <p className="mt-2 text-sm text-slate-400 max-w-xs mx-auto">
            The {this.props.name || 'component'} failed to load. This might be due to a visualization error.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
