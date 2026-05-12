import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';
import AttendancePage from './pages/AttendancePage';
import PayrollPage from './pages/PayrollPage';
import PayslipPage from './pages/PayslipPage';
// import CalendarPage from './pages/CalendarPage';
import ReportsPage from './pages/ReportsPage';
import LoginPage from './pages/Login';
// import CompliancePage from './pages/CompliancePage';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />  
        <Route path="/attendance" element={<AttendancePage />} />  
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/payslips" element={<PayslipPage />} />
        {/* <Route path="/calendar" element={<CalendarPage />} /> */}
        <Route path="/reports" element={<ReportsPage />} />
        {/* <Route path='/compliance' element={<CompliancePage />} /> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
