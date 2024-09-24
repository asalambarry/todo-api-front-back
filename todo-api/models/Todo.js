const mongoose = require('mongoose');

// Définition du schéma Todo
const TodoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au modèle 'User'
    required: true // Indique que le champ 'user' est requis
  },
  title: {
    type: String,
    required: true // Le titre de la tâche est requis
  },
  completed: {
    type: Boolean,
    default: false // Par défaut, la tâche n'est pas complétée
  },
  createdAt: {
    type: Date,
    default: Date.now // Date de création par défaut
  }
});

// Exportation du modèle 'Todo'
module.exports = mongoose.model('Todo', TodoSchema);
