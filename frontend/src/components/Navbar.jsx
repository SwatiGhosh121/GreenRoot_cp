import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Sprout, LogOut, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-primary text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
                    <Sprout size={24} />
                    <span>GreenRoot</span>
                </Link>

                <div className="flex items-center space-x-6">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="hover:text-secondary transition">Dashboard</Link>
                            <Link to="/recommend" className="hover:text-secondary transition">Get Recommendation</Link>
                            <div className="flex items-center space-x-4 ml-4">
                                <Link to="/dashboard" className="flex items-center space-x-1 hover:text-secondary transition" title="Go to Dashboard">
                                    <User size={18} />
                                    <span>{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded transition"
                                >
                                    <LogOut size={16} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-secondary transition">Login</Link>
                            <Link to="/signup" className="bg-white text-primary px-4 py-2 rounded hover:bg-gray-100 transition">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
