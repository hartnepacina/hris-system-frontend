import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';

// Personal Records
import EmployeeList from './pages/personal-records/EmployeeList';
import EmployeeProfile from './pages/personal-records/EmployeeProfile';

// Attendance
import AttendanceTable from './pages/attendance/AttendanceTable';

// Leave Management
import LeaveManagement from './pages/leave/LeaveManagement';

// Payroll
import Payroll from './pages/payroll/Payroll';

// Government Compliance
import GovernmentCompliance from './pages/compliance/GovernmentCompliance';

// Employee Self-Service
import EmployeeSelfService from './pages/self-service/EmployeeSelfService';

// Asset Management
import AssetManagement from './pages/assets/AssetManagement';

// Clearance
import ClearanceList from './pages/clearance/ClearanceList';
import ClearanceForm from './pages/clearance/ClearanceForm';

// Regional Offices
import RegionLayout from './pages/regions/RegionLayout';

// HRIS System
import HRISSystem from './pages/HRISSystem';

// Admin Settings
import AdminSettings from './pages/admin/AdminSettings';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />

          {/* Personal Records */}
          <Route path="personal-records" element={<EmployeeList />} />
          <Route path="employee/:id" element={<EmployeeProfile />} />

          {/* Attendance */}
          <Route path="attendance" element={<AttendanceTable />} />

          {/* Leave Management */}
          <Route path="leave" element={<LeaveManagement />} />

          {/* Payroll */}
          <Route path="payroll" element={<Payroll />} />

          {/* Government Compliance */}
          <Route path="compliance" element={<GovernmentCompliance />} />

          {/* Employee Self-Service */}
          <Route path="self-service" element={<EmployeeSelfService />} />

          {/* Asset Management */}
          <Route path="assets" element={<AssetManagement />} />

          {/* Clearance */}
          <Route path="clearance" element={<ClearanceList />} />
          <Route path="clearance/:id" element={<ClearanceForm />} />

          {/* Regional Offices */}
          <Route path="regions" element={<RegionLayout />} />

          {/* HRIS System Overview */}
          <Route path="hris" element={<HRISSystem />} />

          {/* Admin Settings */}
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
