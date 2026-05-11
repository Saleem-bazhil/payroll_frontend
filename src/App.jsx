import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Dashboard from './pages/DashboardPage';
import EmployeePage from './pages/EmployeePage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<EmployeePage />} />  
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
