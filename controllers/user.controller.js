import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../db.js';

const userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (result.rowCount === 0) {
        return res.status(400).json({ error: "Invalid username" });
    }

    const user = result.rows[0];
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
        if (err || !isMatch) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "2h",
        });

        res.json({ message: "Login successful", token });
    });
};

const userRegister = async (req, res) => {
    const { username, password, role } = req.body;

    console.log(username, password, role);

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!['admin', 'user'].includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const result = await pool.query(
            "INSERT INTO users (username, password_hash, role) VALUES ($1, $2, $3) RETURNING *",
            [username, hashedPassword, role]
        );
        res.json({ message: "User registered successfully ", user: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "User registration failed" });
    }
};


export { userLogin, userRegister };