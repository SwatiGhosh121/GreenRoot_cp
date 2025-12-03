import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { MapPin, Ruler, Thermometer, CloudRain, Droplets } from 'lucide-react';

const FarmDetails = () => {
    const { id } = useParams();
    const [farm, setFarm] = useState(null);
    const [soilData, setSoilData] = useState([]);
    const [newSoil, setNewSoil] = useState({ ph: '', temperature: '', rainfall: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFarmDetails = async () => {
            try {
                const farmRes = await api.get(`/farms/${id}`);
                setFarm(farmRes.data);
                const soilRes = await api.get(`/soil/farm/${id}`);
                setSoilData(soilRes.data);
            } catch (err) {
                console.error('Error fetching details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmDetails();
    }, [id]);

    const handleAddSoil = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/soil', {
                farm_id: id,
                ph: parseFloat(newSoil.ph),
                temperature: parseFloat(newSoil.temperature),
                rainfall: parseFloat(newSoil.rainfall),
            });
            setSoilData([...soilData, res.data]);
            setNewSoil({ ph: '', temperature: '', rainfall: '' });
        } catch (err) {
            console.error('Error adding soil data:', err);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!farm) return <div className="p-10 text-center">Farm not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-primary">
                <h1 className="text-3xl font-bold mb-2">{farm.farm_name}</h1>
                <div className="flex space-x-6 text-gray-600">
                    <div className="flex items-center">
                        <MapPin size={18} className="mr-2" />
                        <span>{farm.location}</span>
                    </div>
                    <div className="flex items-center">
                        <Ruler size={18} className="mr-2" />
                        <span>{farm.size_acres} acres</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Soil History */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-dark">Soil History</h2>
                    <div className="space-y-4">
                        {soilData.length === 0 ? (
                            <p className="text-gray-500">No soil data recorded yet.</p>
                        ) : (
                            soilData.map((data) => (
                                <div key={data.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                    <div className="grid grid-cols-3 gap-4 text-center">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">pH Level</p>
                                            <p className="font-semibold text-blue-600">{data.ph}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Temp</p>
                                            <p className="font-semibold text-red-600">{data.temperature}°C</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">Rainfall</p>
                                            <p className="font-semibold text-gray-600">{data.rainfall}mm</p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2 text-right">
                                        {new Date(data.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Add New Soil Data */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-dark">Add Soil Data</h2>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleAddSoil}>
                            <div className="mb-4">
                                <label className="flex items-center text-gray-700 mb-2">
                                    <Droplets size={18} className="mr-2 text-blue-500" />
                                    pH Level
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                    value={newSoil.ph}
                                    onChange={(e) => setNewSoil({ ...newSoil, ph: e.target.value })}
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
                                    className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                    value={newSoil.temperature}
                                    onChange={(e) => setNewSoil({ ...newSoil, temperature: e.target.value })}
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
                                    className="w-full p-2 border rounded focus:outline-none focus:border-primary"
                                    value={newSoil.rainfall}
                                    onChange={(e) => setNewSoil({ ...newSoil, rainfall: e.target.value })}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white p-2 rounded hover:bg-green-700 transition"
                            >
                                Record Data
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FarmDetails;
