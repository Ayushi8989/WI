import dotenv from 'dotenv';
import express from 'express';

import userRoutes from './routes/user.route.js';
import trainRoutes from './routes/train.route.js';
import adminRoutes from './routes/admin.route.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.use('/user', userRoutes);
app.use('/train', trainRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

export default app;
