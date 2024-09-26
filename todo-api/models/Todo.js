const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'], // Les priorités acceptées
        default: 'Medium' // Priorité par défaut
    },
    dueDate: { type: Date }, // Date d'échéance
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todo', TodoSchema);
