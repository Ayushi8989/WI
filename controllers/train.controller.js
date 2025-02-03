import pool from '../db.js';

const getTrainAvailability = async (req, res) => {
    const { source, destination } = req.body;

    console.log(source, destination);

    if (!source || !destination) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const result = await pool.query(
        "SELECT * FROM trains WHERE source = $1 AND destination = $2", [source, destination]
    );

    res.json({ trains: result.rows });
}

const getSeatAvailability = async (req, res) => {
    const { trainId } = req.body;
    const userId = req.user.userId;

    if (!trainId) {
        return res.status(400).json({ error: "trainId is required" });
    }

    const client = await pool.connect();
    try {
        await client.query("BEGIN");  

        const totalSeatsResult = await client.query(
            "SELECT total_seats FROM trains WHERE id = $1 FOR UPDATE",
            [trainId]
        );

        if (totalSeatsResult.rows.length === 0) {
            throw new Error("Train not found");
        }

        const availableSeats = totalSeatsResult.rows[0].total_seats;
        if (availableSeats <= 0) {
            throw new Error("No seats available");
        }

        // Assign the last available seat number
        const seatNumber = availableSeats;
        await client.query(
            "INSERT INTO bookings (user_id, train_id, seat_number) VALUES ($1, $2, $3)",
            [userId, trainId, seatNumber]
        );

        await client.query(
            "UPDATE trains SET total_seats = total_seats - 1 WHERE id = $1",
            [trainId]
        );

        await client.query("COMMIT"); 
        res.json({ message: "Seat booked successfully", seatNumber });
    } catch (error) {
        await client.query("ROLLBACK");
        console.error("Booking Error:", error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release(); 
    }
};

export { getTrainAvailability, getSeatAvailability }
