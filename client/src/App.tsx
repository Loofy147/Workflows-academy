import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Public Pages
import LandingPage from "./pages/public/LandingPage";
import PricingPage from "./pages/public/PricingPage";
import DocsPage from "./pages/public/DocsPage";
import AboutPage from "./pages/public/AboutPage";

// Auth Pages
import SignUpPage from "./pages/auth/SignUpPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";

// Authenticated Pages
import Dashboard from "./pages/authenticated/Dashboard";
import WorkflowsList from "./pages/authenticated/WorkflowsList";
import WorkflowDetail from "./pages/authenticated/WorkflowDetail";
import WorkflowBuilder from "./pages/authenticated/WorkflowBuilder";
import WorkflowExecution from "./pages/authenticated/WorkflowExecution";
import WorkflowResults from "./pages/authenticated/WorkflowResults";
import Templates from "./pages/authenticated/Templates";
import ExecutionMonitor from "./pages/authenticated/ExecutionMonitor";
import CreatorPayouts from "./pages/authenticated/CreatorPayouts";
import PublishTemplate from "./pages/authenticated/PublishTemplate";
import WorkflowAnalytics from "./pages/authenticated/WorkflowAnalytics";
import TeamCollaboration from "./pages/authenticated/TeamCollaboration";
import TemplateDetail from "./pages/authenticated/TemplateDetail";
import MyTemplates from "./pages/authenticated/MyTemplates";
import Settings from "./pages/authenticated/Settings";
import Billing from "./pages/authenticated/Billing";
import ApiKeys from "./pages/authenticated/ApiKeys";
import UserProfile from "./pages/authenticated/UserProfile";
import Notifications from "./pages/authenticated/Notifications";
import AccountSettings from "./pages/authenticated/AccountSettings";
import HelpCenter from "./pages/authenticated/HelpCenter";
import Webhooks from "./pages/authenticated/Webhooks";
import ActivityTimeline from "./pages/authenticated/ActivityTimeline";
import IntegrationMarketplace from "./pages/authenticated/IntegrationMarketplace";
import SearchPage from "./pages/authenticated/Search";
import WorkflowVersions from "./pages/authenticated/WorkflowVersions";
import AIWorkflowBuilder from "./pages/authenticated/AIWorkflowBuilder";
import RealtimeExecutionMonitor from "./pages/authenticated/RealtimeExecutionMonitor";
import TemplateLibrary from "./pages/authenticated/TemplateLibrary";
import WorkflowScheduler from "./pages/authenticated/WorkflowScheduler";
import CostAnalytics from "./pages/authenticated/CostAnalytics";
import MarketplaceMonetization from "./pages/authenticated/MarketplaceMonetization";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUserManagement from "./pages/admin/AdminUserManagement";
import UserManagement from "./pages/admin/UserManagement";
import TemplateManagement from "./pages/admin/TemplateManagement";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// 404 Page
import NotFound from "./pages/NotFound";

// Protected Route Component
function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Component />;
}

// Admin Protected Route Component
function AdminRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-cyan-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return <NotFound />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={LandingPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/docs" component={DocsPage} />
      <Route path="/about" component={AboutPage} />

      {/* Auth Routes */}
      <Route path="/auth/signup" component={SignUpPage} />
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/auth/forgot-password" component={ForgotPasswordPage} />

      {/* Authenticated Routes */}
      <Route path="/dashboard" component={() => <ProtectedRoute component={Dashboard} />} />
      <Route path="/workflows" component={() => <ProtectedRoute component={WorkflowsList} />} />
      <Route path="/workflows/:id" component={() => <ProtectedRoute component={WorkflowDetail} />} />
      <Route path="/workflows/builder/new" component={() => <ProtectedRoute component={WorkflowBuilder} />} />
      <Route path="/workflows/:id/edit" component={() => <ProtectedRoute component={WorkflowBuilder} />} />
      <Route path="/workflows/:id/run" component={() => <ProtectedRoute component={WorkflowExecution} />} />
      <Route path="/workflows/:id/results/:executionId" component={() => <ProtectedRoute component={WorkflowResults} />} />
      <Route path="/templates" component={() => <ProtectedRoute component={Templates} />} />
      <Route path="/templates/:id" component={() => <ProtectedRoute component={TemplateDetail} />} />
      <Route path="/my-templates" component={() => <ProtectedRoute component={MyTemplates} />} />
      <Route path="/execution/:executionId" component={() => <ProtectedRoute component={ExecutionMonitor} />} />
      <Route path="/creator/payouts" component={() => <ProtectedRoute component={CreatorPayouts} />} />
      <Route path="/templates/publish" component={() => <ProtectedRoute component={PublishTemplate} />} />
      <Route path="/analytics" component={() => <ProtectedRoute component={WorkflowAnalytics} />} />
      <Route path="/team" component={() => <ProtectedRoute component={TeamCollaboration} />} />
      <Route path="/settings" component={() => <ProtectedRoute component={Settings} />} />
      <Route path="/billing" component={() => <ProtectedRoute component={Billing} />} />
      <Route path="/api-keys" component={() => <ProtectedRoute component={ApiKeys} />} />
      <Route path="/profile" component={() => <ProtectedRoute component={UserProfile} />} />
      <Route path="/notifications" component={() => <ProtectedRoute component={Notifications} />} />
      <Route path="/account-settings" component={() => <ProtectedRoute component={AccountSettings} />} />
      <Route path="/help" component={() => <ProtectedRoute component={HelpCenter} />} />
      <Route path="/webhooks" component={() => <ProtectedRoute component={Webhooks} />} />
      <Route path="/activity" component={() => <ProtectedRoute component={ActivityTimeline} />} />
      <Route path="/integrations" component={() => <ProtectedRoute component={IntegrationMarketplace} />} />
      <Route path="/search" component={() => <ProtectedRoute component={SearchPage} />} />
      <Route path="/workflows/:id/versions" component={() => <ProtectedRoute component={WorkflowVersions} />} />
      <Route path="/ai-builder" component={() => <ProtectedRoute component={AIWorkflowBuilder} />} />
      <Route path="/executions/:id/monitor" component={() => <ProtectedRoute component={RealtimeExecutionMonitor} />} />
      <Route path="/template-library" component={() => <ProtectedRoute component={TemplateLibrary} />} />
      <Route path="/scheduler" component={() => <ProtectedRoute component={WorkflowScheduler} />} />
      <Route path="/cost-analytics" component={() => <ProtectedRoute component={CostAnalytics} />} />
      <Route path="/monetization" component={() => <ProtectedRoute component={MarketplaceMonetization} />} />

      {/* Admin Routes */}
      <Route path="/admin" component={() => <AdminRoute component={AdminDashboard} />} />
      <Route path="/admin/users" component={() => <AdminRoute component={AdminUserManagement} />} />
      <Route path="/admin/templates" component={() => <AdminRoute component={TemplateManagement} />} />
      <Route path="/admin/analytics" component={() => <AdminRoute component={AdminAnalytics} />} />
      <Route path="/admin/settings" component={() => <AdminRoute component={AdminSettings} />} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Import useAuth hook
import { useAuth } from "./contexts/AuthContext";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
