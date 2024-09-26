import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { addTodo, deleteTodo, getTodos, updateTodo } from '../services/todoService';
import '../styles/TodoList.css'; // Fichier CSS pour le style

const TodoList = () => {
    const { user, logout } = useContext(AuthContext); // Ajout de la fonction logout
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [priority, setPriority] = useState('Medium'); // Pour la priorisation
    const [dueDate, setDueDate] = useState(''); // Pour la date d'échéance
    const [editingTodo, setEditingTodo] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingPriority, setEditingPriority] = useState('Medium');
    const [editingDueDate, setEditingDueDate] = useState('');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterDueDate, setFilterDueDate] = useState('');

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const res = await getTodos(user.token);
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
            return;
        }

        try {
            const res = await addTodo(newTodo, priority, dueDate, user.token);
            setTodos([res.data, ...todos]);
            setNewTodo('');
            setPriority('Medium');
            setDueDate('');
            toast.success('Todo added successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to add todo.');
        }
    };

    const handleDeleteTodo = async (id) => {
        try {
            await deleteTodo(id, user.token);
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
        setEditingPriority(todo.priority);
        setEditingDueDate(todo.dueDate ? new Date(todo.dueDate).toISOString().substr(0, 10) : ''); // Formatage de la date
    };

    const handleUpdateTodo = async () => {
        if (!editingTitle.trim()) {
            toast.warning('Updated title cannot be empty.');
            return;
        }

        try {
            const updatedData = {
                title: editingTitle,
                priority: editingPriority,
                dueDate: editingDueDate || null
            };
            const res = await updateTodo(editingTodo._id, updatedData, user.token);
            setTodos(todos.map((todo) => (todo._id === editingTodo._id ? res.data : todo)));
            setEditingTodo(null);
            setEditingTitle('');
            setEditingPriority('Medium');
            setEditingDueDate('');
            toast.success('Todo updated successfully!');
        } catch (err) {
            console.error(err);
            toast.error('Failed to update todo.');
        }
    };

    const handleCancelEdit = () => {
        setEditingTodo(null);
        setEditingTitle('');
        setEditingPriority('Medium');
        setEditingDueDate('');
    };

    const handleLogout = () => {
        logout(); // Appel de la fonction logout pour déconnecter l'utilisateur
        toast.info('Logged out successfully!');
    };

    const filteredTodos = todos.filter((todo) => {
        let matchesPriority = true;
        let matchesDueDate = true;

        if (filterPriority) {
            matchesPriority = todo.priority === filterPriority;
        }

        if (filterDueDate) {
            matchesDueDate = new Date(todo.dueDate).toISOString().substr(0, 10) === filterDueDate;
        }

        return matchesPriority && matchesDueDate;
    });

    return (
        <div className="todo-list-container">
            <header className="todo-header">
                <h1>Todo List</h1>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </header>
            <div className="todo-input-container">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="New todo"
                />
                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Due Date"
                />
                <button className="add-button" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div className="filters-container">
                <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
                    <option value="">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <input
                    type="date"
                    value={filterDueDate}
                    onChange={(e) => setFilterDueDate(e.target.value)}
                    placeholder="Filter by Due Date"
                />
            </div>
            <ul className="todo-list">
                {filteredTodos.map((todo) => (
                    <li key={todo._id} className={`todo-item ${todo.priority.toLowerCase()}`}>
                        {editingTodo && editingTodo._id === todo._id ? (
                            <>
                                <input
                                    type="text"
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                />
                                <select value={editingPriority} onChange={(e) => setEditingPriority(e.target.value)}>
                                    <option value="Low">Low</option>
                                    <option value="Medium">Medium</option>
                                    <option value="High">High</option>
                                </select>
                                <input
                                    type="date"
                                    value={editingDueDate}
                                    onChange={(e) => setEditingDueDate(e.target.value)}
                                />
                                <button className="update-button" onClick={handleUpdateTodo}>Update</button>
                                <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <span className="todo-title">{todo.title}</span>
                                <span className={`priority-badge ${todo.priority.toLowerCase()}`}>{todo.priority}</span>
                                <span className="due-date">{todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : 'No due date'}</span>
                                <div className="actions">
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
