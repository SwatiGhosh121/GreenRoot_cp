const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('./../utils/prisma.js');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({ data: { name, email, password: hashedPassword } });

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const user = await User.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.id;

        // Update user
        const updatedUser = await User.update({
            where: { id: userId },
            data: { name, email }
        });

        return res.json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const userId = req.user.id;

        // Delete user
        await User.delete({
            where: { id: userId }
        });

        res.json({ message: "Account deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
