import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {    
    res.send("Welcome!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
