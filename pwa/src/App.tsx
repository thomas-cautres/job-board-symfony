import { Routes, Route } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import DashboardPage from "./features/recruiter/pages/DashboardPage.tsx";
import MyJobsPage from "./features/recruiter/pages/MyJobsPage.tsx";
import ApplicationsPage from "./features/recruiter/pages/ApplicationsPage.tsx";
import JobCreatePage from "./features/recruiter/pages/JobCreatePage.tsx";
import RequireAuth from "./features/auth/components/RequireAuth.tsx";
import LogoutPage from './features/auth/pages/LogoutPage.tsx';
import DashboardLayout from './components/layout/DashboardLayout.tsx';

import HomePage from "./features/jobs/pages/HomePage.tsx";
import JobsPage from "./features/jobs/pages/JobsPage.tsx";
import JobDetailsPage from "./features/jobs/pages/JobDetailsPage.tsx";
import CandidateLayout from "./components/layout/CandidateLayout.tsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<CandidateLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:page" element={<JobsPage />} />
        <Route path="/job/:id" element={<JobDetailsPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Recruiter Routes */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/recruiter/dashboard" element={<DashboardPage />} />
          <Route path="/recruiter/jobs" element={<MyJobsPage />} />
          <Route path="/recruiter/jobs/create" element={<JobCreatePage />} />
          <Route path="/recruiter/applications" element={<ApplicationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
