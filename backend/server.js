import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import apiRoutes from './routes/api.js';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api', apiRoutes);

// Połączenie z bazą danych i synchronizacja modeli
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
