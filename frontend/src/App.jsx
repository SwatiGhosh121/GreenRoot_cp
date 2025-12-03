import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddFarm from './pages/AddFarm';
import FarmDetails from './pages/FarmDetails';
import CropRecommendation from './pages/CropRecommendation';

const PrivateRoute = ({ children }) => {
    const { user, loading } = React.useContext(AuthContext);

    if (loading) return <div className="p-10 text-center">Loading...</div>;

    return user ? children : <Navigate to="/login" />;
};

const App = () => {
    return (
        <AuthProvider>
            <div className="min-h-screen bg-light">
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/add-farm"
                        element={
                            <PrivateRoute>
                                <AddFarm />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/farm/:id"
                        element={
                            <PrivateRoute>
                                <FarmDetails />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/recommend"
                        element={
                            <PrivateRoute>
                                <CropRecommendation />
                            </PrivateRoute>
                        }
                    />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </div>
        </AuthProvider>
    );
};

export default App;
