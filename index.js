import dotenv from 'dotenv';
import express from 'express';

import userRoutes from './routes/user.route.js';
import trainRoutes from './routes/train.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.use('/users', userRoutes);
app.use('/trains', trainRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
