import React, { useState } from 'react';
import api from '../utils/api';
import { CloudRain, Thermometer, Droplets, ArrowRight } from 'lucide-react';

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        ph: '',
        temperature: '',
        rainfall: '',
    });
    const [recommendation, setRecommendation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setRecommendation(null);
        try {
            const res = await api.post('/recommend', {
                ph: parseFloat(formData.ph),
                temperature: parseFloat(formData.temperature),
                rainfall: parseFloat(formData.rainfall),
            });
            setRecommendation(res.data.crop);
        } catch (err) {
            setError('Failed to get recommendation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-center text-dark">AI Crop Recommendation</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-primary">Enter Soil Details</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="flex items-center text-gray-700 mb-2">
                                <Droplets size={18} className="mr-2 text-blue-500" />
                                Soil pH (0-14)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="ph"
                                className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                value={formData.ph}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center text-gray-700 mb-2">
                                <Thermometer size={18} className="mr-2 text-red-500" />
                                Temperature (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                value={formData.temperature}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="flex items-center text-gray-700 mb-2">
                                <CloudRain size={18} className="mr-2 text-gray-500" />
                                Rainfall (mm)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="rainfall"
                                className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                value={formData.rainfall}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-white p-3 rounded hover:bg-green-700 transition flex justify-center items-center"
                        >
                            {loading ? 'Analyzing...' : (
                                <>
                                    Get Recommendation <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </button>
                    </form>
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                </div>

                <div className="flex flex-col justify-center items-center">
                    {recommendation ? (
                        <div className="bg-green-100 p-8 rounded-lg border-2 border-green-500 text-center w-full animate-fade-in">
                            <h3 className="text-lg text-green-800 mb-2">Recommended Crop</h3>
                            <p className="text-4xl font-bold text-green-900">{recommendation}</p>
                            <p className="mt-4 text-sm text-green-700">Based on your soil parameters, this crop is predicted to yield the best results.</p>
                        </div>
                    ) : (
                        <div className="bg-gray-50 p-8 rounded-lg border-2 border-dashed border-gray-300 text-center w-full h-full flex flex-col justify-center items-center text-gray-400">
                            <Sprout size={48} className="mb-4 opacity-50" />
                            <p>Enter data to see AI suggestion</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Helper component for icon
const Sprout = ({ size, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M7 20h10" />
        <path d="M10 20c5.5-2.5.8-6.4 3-10" />
        <path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.2.4-4.8-.4-3.4-1.6-4.2-6.5-4.3-6.5 5.1-1.4 6.8 3.2 6.8 3.2z" />
        <path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 2.1-1.6 2.5-5.4 2.6-5.4-4.6.4-5.8 2.8-5.8 2.8z" />
    </svg>
);

export default CropRecommendation;
