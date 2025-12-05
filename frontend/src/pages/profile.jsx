import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || ""
    });

    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            setUpdateLoading(true);
            const res = await api.put("/auth/update", formData);

            // update local storage
            localStorage.setItem("user", JSON.stringify(res.data.user));

            alert("Profile updated successfully!");
            setEditing(false);
            window.location.reload(); // refresh UI with updated info
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update profile.");
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your account? This cannot be undone!")) {
            return;
        }

        try {
            setLoading(true);
            await api.delete('/auth/delete');
            logout();
            navigate('/signup');
        } catch (error) {
            console.error('Delete account error:', error);
            alert("Failed to delete account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h1 className="text-2xl font-bold mb-4 text-primary">Your Profile</h1>

            {!editing ? (
                <>
                    {/* View Mode */}
                    <div className="space-y-4 text-gray-700">
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Joined:</strong> {new Date(user?.createdAt).toDateString()}</p>
                    </div>

                    <button
                        onClick={() => setEditing(true)}
                        className="mt-6 w-full bg-primary text-white py-2 rounded hover:bg-green-700 transition"
                    >
                        Edit Profile
                    </button>

                    {/* Delete Button */}
                    <button
                        onClick={handleDelete}
                        disabled={loading}
                        className="mt-3 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                    >
                        {loading ? "Deleting..." : "Delete Account"}
                    </button>
                </>
            ) : (
                <>
                    {/* Edit Mode */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                className="w-full p-2 border rounded mt-1"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleUpdate}
                        disabled={updateLoading}
                        className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {updateLoading ? "Updating..." : "Save Changes"}
                    </button>

                    <button
                        onClick={() => setEditing(false)}
                        className="mt-3 w-full bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
                    >
                        Cancel
                    </button>
                </>
            )}
        </div>
    );
};

export default Profile;
