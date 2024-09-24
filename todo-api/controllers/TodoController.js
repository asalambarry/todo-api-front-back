const express = require('express')
const Todo = require('../models/Todo')

// Ajout d'une tache
const addTache = async (req, res) => {
    try {
        const newTodo = new Todo({
            title: req.body.title,
            user: req.user.id
        })
        const todo = await newTodo.save()
        res.json(todo)
    } catch (err) {
        console.error('Server error:', err.message)
        res.status(500).send('Server error')
    }
}
// Afficher toutes les taches
const getTaches = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(todos);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
}
// Afficher une tache selon Id
const getTacheById = async()=>{
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
// Modifier une tache
const editTache = async (req, res) => {
    try {
        let todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ msg: 'Todo not found' });
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }
        todo = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(todo);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

// Supprimer une tache
const deleteTache = async (req, res) => {
    try {
        // Chercher la tâche par ID
        let todo = await Todo.findById(req.params.id);

        // Vérifier si la tâche existe
        if (!todo) {
            return res.status(404).json({ msg: 'Todo not found' });
        }

        // Vérifier si l'utilisateur est autorisé à supprimer cette tâche
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        // Supprimer la tâche
        await Todo.findByIdAndDelete(req.params.id);

        // Répondre avec un message de confirmation
        res.json({ msg: 'Todo removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {addTache, getTaches,getTacheById, editTache, deleteTache};