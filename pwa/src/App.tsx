import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from "./pages/recruiter/DashboardPage.tsx";
import JobsPage from "./pages/recruiter/JobsPage.tsx";
import ApplicationsPage from "./pages/recruiter/ApplicationsPage.tsx";
import JobCreatePage from "./pages/recruiter/JobCreatePage.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import LogoutPage from './pages/auth/LogoutPage.tsx';
import DashboardLayout from './layouts/DashboardLayout.tsx';

import HomePage from "./pages/candidate/HomePage.tsx";
import CandidateJobsPage from "./pages/candidate/CandidateJobsPage.tsx";
import JobDetailsPage from "./pages/candidate/JobDetailsPage.tsx";
import CandidateLayout from "./layouts/CandidateLayout.tsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<CandidateLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<CandidateJobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailsPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Recruiter Routes */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          <Route path="/recruiter/dashboard" element={<DashboardPage />} />
          <Route path="/recruiter/jobs" element={<JobsPage />} />
          <Route path="/recruiter/jobs/create" element={<JobCreatePage />} />
          <Route path="/recruiter/applications" element={<ApplicationsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
