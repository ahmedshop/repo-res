import './index.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';
import GoogleCallback from './components/GoogleCallback';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="app">
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/auth/google" element={<GoogleCallback />} />

          {/* Private routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
