import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const AddFarm = () => {
    const [formData, setFormData] = useState({
        farm_name: '',
        location: '',
        size_acres: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/farms', formData);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error adding farm:', err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">Add New Farm</h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Farm Name</label>
                        <input
                            type="text"
                            name="farm_name"
                            className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                            value={formData.farm_name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">Size (Acres)</label>
                        <input
                            type="number"
                            name="size_acres"
                            className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                            value={formData.size_acres}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-white p-2 rounded hover:bg-green-700 transition"
                    >
                        Add Farm
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFarm;
