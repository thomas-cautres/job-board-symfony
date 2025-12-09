import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from "./pages/DashboardPage.tsx";
import JobsPage from "./pages/JobsPage.tsx";
import ApplicationsPage from "./pages/ApplicationsPage.tsx";
import JobCreatePage from "./pages/JobCreatePage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import LogoutPage from './pages/LogoutPage.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/create" element={<JobCreatePage />} />
          <Route path="/applications" element={<ApplicationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
