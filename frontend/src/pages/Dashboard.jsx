import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { Plus, MapPin, Ruler } from 'lucide-react';

const Dashboard = () => {
    const [farms, setFarms] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const res = await api.get('/farms');
                setFarms(res.data);
            } catch (err) {
                console.error('Error fetching farms:', err);
            }
        };
        fetchFarms();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-dark">My Farms</h1>
                <Link
                    to="/add-farm"
                    className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded hover:bg-green-700 transition shadow-md"
                >
                    <Plus size={20} />
                    <span>Add New Farm</span>
                </Link>
            </div>

            {farms.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <p className="text-gray-500 text-lg mb-4">You haven't added any farms yet.</p>
                    <Link to="/add-farm" className="text-primary hover:underline">Get started by adding a farm</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {farms.map((farm) => (
                        <div key={farm.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition border-l-4 border-primary">
                            <h3 className="text-xl font-semibold mb-2">{farm.farm_name}</h3>
                            <div className="flex items-center text-gray-600 mb-2">
                                <MapPin size={16} className="mr-2" />
                                <span>{farm.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600 mb-4">
                                <Ruler size={16} className="mr-2" />
                                <span>{farm.size_acres} acres</span>
                            </div>
                            <Link
                                to={`/farm/${farm.id}`}
                                className="block text-center w-full border border-primary text-primary py-2 rounded hover:bg-primary hover:text-white transition"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
