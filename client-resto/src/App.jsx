import './index.css'
import { Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import AuthProvider from './hooks/useAuth';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './pages/Dashboard';
import GoogleCallback from './components/GoogleCallback';

function App() {

  return (
    <div className='app'>
      <AuthProvider>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path="/auth/google" element={<GoogleCallback />}></Route>
          <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
      </AuthProvider>
    </div>

  );
}

export default App;
