import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';
import AttendancePage from './pages/AttendancePage';
import PayrollPage from './pages/PayrollPage';
import PayslipPage from './pages/PayslipPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />  
        <Route path="/attendance" element={<AttendancePage />} />  
        <Route path="/payroll" element={<PayrollPage />} />
        <Route path="/payslips" element={<PayslipPage />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
