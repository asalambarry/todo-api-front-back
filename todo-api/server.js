require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const cors = require('cors'); // Importer cors
const connectDB = require('./config/db');

const app = express();

// Connecter la base de données
connectDB();

// Utiliser CORS avec les options par défaut
app.use(cors());

// Initialiser le middleware pour parsing JSON
app.use(express.json());

// Vérifier la présence de JWT_SECRET
if (!process.env.JWT_SECRET) {
  console.error('FATAL ERROR: JWT_SECRET is not defined.');
  process.exit(1); // Arrêter l'application si la clé n'est pas définie
}

// Test route pour vérifier le fonctionnement du serveur
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/auth', require('./routes/routesUser'));
app.use('/api/todos', require('./routes/routesTodo'));

// Démarrer le serveur
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
