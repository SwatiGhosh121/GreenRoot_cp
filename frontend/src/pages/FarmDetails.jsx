import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { MapPin, Ruler, Thermometer, CloudRain, Droplets } from "lucide-react";

const FarmDetails = () => {
    const { id } = useParams();
    const [farm, setFarm] = useState(null);
    const [soilData, setSoilData] = useState([]);
    const [newSoil, setNewSoil] = useState({ ph: "", temperature: "", rainfall: "" });
    const [loading, setLoading] = useState(true);

    // NEW STATES FOR SEARCH/FILTER/SORT/PAGINATION
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("createdAt-desc");
    const [filterPH, setFilterPH] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);

    useEffect(() => {
        const fetchFarmDetails = async () => {
            try {
                const farmRes = await api.get(`/farms/${id}`);
                setFarm(farmRes.data);

                const soilRes = await api.get(`/soil/farm/${id}`);
                setSoilData(soilRes.data);
            } catch (err) {
                console.error("Error fetching details:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchFarmDetails();
    }, [id]);

    const handleAddSoil = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/soil", {
                farm_id: id,
                ph: parseFloat(newSoil.ph),
                temperature: parseFloat(newSoil.temperature),
                rainfall: parseFloat(newSoil.rainfall),
            });

            setSoilData([...soilData, res.data]);
            setNewSoil({ ph: "", temperature: "", rainfall: "" });
        } catch (err) {
            console.error("Error adding soil data:", err);
        }
    };

    // -------------------------------
    //  FILTER + SEARCH + SORT + PAGINATION
    // -------------------------------

    const processedSoilData = soilData
        // 🔍 SEARCH
        .filter((item) => {
            if (!search) return true;
            return (
                item.ph.toString().includes(search) ||
                item.temperature.toString().includes(search) ||
                item.rainfall.toString().includes(search)
            );
        })

        // 🔎 FILTER (PH)
        .filter((item) => {
            if (!filterPH) return true;
            return item.ph >= parseFloat(filterPH);
        })

        // ↕️ SORTING
        .sort((a, b) => {
            switch (sortBy) {
                case "ph-asc":
                    return a.ph - b.ph;
                case "ph-desc":
                    return b.ph - a.ph;
                case "temp-asc":
                    return a.temperature - b.temperature;
                case "temp-desc":
                    return b.temperature - a.temperature;
                case "rain-asc":
                    return a.rainfall - b.rainfall;
                case "rain-desc":
                    return b.rainfall - a.rainfall;
                case "createdAt-asc":
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

    // 📄 PAGINATION
    const totalPages = Math.ceil(processedSoilData.length / pageSize);
    const paginatedSoil = processedSoilData.slice((page - 1) * pageSize, page * pageSize);

    if (loading) return <div className="p-10 text-center">Loading...</div>;
    if (!farm) return <div className="p-10 text-center">Farm not found</div>;

    return (
        <div className="container mx-auto px-4 py-8">

            {/* Farm Header */}
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

                {/* SOIL HISTORY SECTION */}
                <div>
                    <h2 className="text-2xl font-bold mb-4 text-dark">Soil History</h2>

                    {/* SEARCH + FILTER + SORT UI */}
                    <div className="flex flex-wrap gap-3 mb-5">

                        <input
                            type="text"
                            placeholder="Search (pH/temp/rain)"
                            className="p-2 border rounded"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <input
                            type="number"
                            step="0.1"
                            placeholder="Min pH"
                            className="p-2 border rounded"
                            value={filterPH}
                            onChange={(e) => setFilterPH(e.target.value)}
                        />

                        <select
                            className="p-2 border rounded"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="createdAt-asc">Oldest First</option>

                            <option value="ph-asc">pH: Low → High</option>
                            <option value="ph-desc">pH: High → Low</option>

                            <option value="temp-asc">Temp: Low → High</option>
                            <option value="temp-desc">Temp: High → Low</option>

                            <option value="rain-asc">Rainfall: Low → High</option>
                            <option value="rain-desc">Rainfall: High → Low</option>
                        </select>
                    </div>

                    {/* DATA LIST */}
                    <div className="space-y-4">
                        {paginatedSoil.length === 0 ? (
                            <p className="text-gray-500">No matching soil records.</p>
                        ) : (
                            paginatedSoil.map((data) => (
                                <div key={data.id} className="bg-white p-4 rounded-lg shadow-sm border">
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

                    {/* PAGINATION */}
                    <div className="flex justify-center mt-5 gap-3">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(page - 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <span className="px-3 py-1">
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage(page + 1)}
                            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* ADD SOIL FORM */}
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
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
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
                                    className="w-full p-2 border rounded"
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
