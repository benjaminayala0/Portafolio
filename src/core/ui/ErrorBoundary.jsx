import React from 'react';
import { Network } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error UI:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 text-center">
                    <div className="bg-surface-lighter p-8 rounded-2xl border border-text-secondary/20 shadow-2xl max-w-md w-full">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-red-500/10 rounded-full">
                                <Network size={40} className="text-red-400" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-text-primary mb-3 font-mono">System Exception</h1>
                        <p className="text-text-secondary text-sm mb-8 font-mono leading-relaxed">
                            A critical rendering error occurred in the component tree.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary hover:bg-primary-glow text-white font-medium transition-all"
                        >
                            Reload Application
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
