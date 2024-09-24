import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify'; // Importer toast
import 'react-toastify/dist/ReactToastify.css'; // Importer les styles CSS de react-toastify
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; // Importer useNavigate
import { addTodo, deleteTodo, getTodos, updateTodo } from '../services/todoService';
import '../styles/TodoList.css'; // Importer le fichier CSS

const TodoList = () => {
    const { user, logout } = useContext(AuthContext); // Assurez-vous que le token est présent dans le contexte utilisateur et ajouter logout
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [editingTodo, setEditingTodo] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const navigate = useNavigate(); // Initialiser useNavigate

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await getTodos(user.token); // Assurez-vous que le token est passé ici
                setTodos(res.data);
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch todos.');
            }
        };

        fetchTodos();
    }, [user.token]);

    const handleAddTodo = async () => {
        if (!newTodo.trim()) {
            toast.warning('Todo title cannot be empty.');
            return; // Vérifiez que le titre n'est pas vide
        }

        try {
            const res = await addTodo(newTodo, user.token); // Passez le token ici
            setTodos([res.data, ...todos]);
            setNewTodo('');
            toast.success('Todo added successfully!');
        } catch (err) {
            console.error(err); // Affichez l'erreur dans la console
            toast.error('Failed to add todo.');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id, user.token); // Passez le token ici
            setTodos(todos.filter((todo) => todo._id !== id));
            toast.success('Todo deleted successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete todo.');
        }
    };

    const handleEditTodo = (todo) => {
        setEditingTodo(todo);
        setEditingTitle(todo.title);
    };

    const handleUpdateTodo = async () => {
        if (!editingTitle.trim()) {
            toast.warning('Updated title cannot be empty.');
            return; // Vérifiez que le titre n'est pas vide
        }

        try {
            const res = await updateTodo(editingTodo._id, { title: editingTitle }, user.token);
            setTodos(todos.map((todo) => (todo._id === editingTodo._id ? res.data : todo)));
            setEditingTodo(null);
            setEditingTitle('');
            toast.success('Todo updated successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update todo.');
        }
    };

    const handleLogout = () => {
        logout(); // Appelle la fonction de déconnexion pour retirer l'utilisateur du contexte
        navigate('/login'); // Redirige vers la page de connexion
        toast.info('Logged out successfully.');
    };

    return (
        <div className="todo-list-container">
            <div className="header">
                <h1>Todo List</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button> {/* Bouton de déconnexion */}
            </div>
            <div className="todo-input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New todo"
                />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            <ul className="todo-list">
                {todos.map((todo) => (
                    <li key={todo._id}>
                        {editingTodo && editingTodo._id === todo._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                />
                                <button className="update-button" onClick={handleUpdateTodo}>Update</button>
                                <button className="cancel-button" onClick={() => setEditingTodo(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                {todo.title}
                                <div>
                                    <button className="edit-button" onClick={() => handleEditTodo(todo)}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
