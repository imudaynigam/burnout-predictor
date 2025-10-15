import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  
  // Redirect authenticated users to their appropriate dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 max-w-2xl mx-auto px-4">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Burnout Tracker
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered workplace wellness monitoring to help teams thrive
          </p>
        </div>
        
        <div className="space-y-4 text-left bg-card p-6 rounded-lg border">
          <h2 className="text-lg font-semibold">Key Features:</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Real-time burnout risk assessment using AI analysis</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Integration with Slack/Teams and productivity tools</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Manager dashboard for team oversight</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Employee wellness insights and recommendations</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-primary">•</span>
              <span>Privacy-first approach with anonymized data</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/auth" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Get Started
          </a>
          <a 
            href="/auth" 
            className="inline-flex items-center justify-center px-6 py-3 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md font-medium transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
