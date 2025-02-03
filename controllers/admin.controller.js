import pool from '../db.js';

const addTrain = async (req, res) => {
    const { name, source, destination, total_seats } = req.body;
    
    try {
        const result = await pool.query(
            "INSERT INTO trains (name, source, destination, total_seats) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, source, destination, total_seats]
        );
        res.json({ message: "Train added", train: result.rows[0] });
    } catch (error) {
        res.status(500).json({ error: "Failed to add train" });
    }
}

export { addTrain };