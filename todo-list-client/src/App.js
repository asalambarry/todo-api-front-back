import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthProvider, { AuthContext } from '../src/context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';

function App() {
  return (
    <Router> {/* Router doit entourer AuthProvider */}
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/todos" element={<PrivateRoute><TodoList /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> {/* Ajouter le ToastContainer ici */}
      </AuthProvider>
    </Router>
  );
}

const PrivateRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext); // Utilisation de AuthContext
  return user ? children : <Navigate to="/login" replace />;
};

export default App;
