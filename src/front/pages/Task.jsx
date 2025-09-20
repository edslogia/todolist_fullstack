import React, { useState } from 'react';
import './task.css';

export const Task = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Ejemplo de tarea completada', completed: true },
        { id: 2, text: 'Ejemplo de tarea pendiente', completed: false },
        { id: 3, text: 'Otra tarea por hacer', completed: false }
    ]);
    const [newTask, setNewTask] = useState('');

    const addTask = (e) => {
        e.preventDefault();
        if (newTask.trim() !== '') {
            const task = {
                id: Date.now(),
                text: newTask.trim(),
                completed: false
            };
            setTasks([...tasks, task]);
            setNewTask('');
        }
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <div className="task-page">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-10">

                        {/* Header de la página */}
                        <div className="task-header text-center mb-5">
                            <h1 className="task-title">Mis Tareas</h1>
                            <p className="task-subtitle">Organiza tu día de manera eficiente</p>
                        </div>

                        {/* Formulario para agregar nuevas tareas */}
                        <div className="task-form-container">
                            <form onSubmit={addTask} className="task-form">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control task-input"
                                        placeholder="¿Qué necesitas hacer hoy?"
                                        value={newTask}
                                        onChange={(e) => setNewTask(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="btn task-add-btn"
                                        disabled={!newTask.trim()}
                                    >
                                        <i className="fas fa-plus me-2"></i>
                                        Agregar
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Estadísticas de tareas */}
                        <div className="task-stats">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <div className="stat-card">
                                        <div className="stat-number">{tasks.length}</div>
                                        <div className="stat-label">Total</div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="stat-card">
                                        <div className="stat-number">{tasks.filter(task => !task.completed).length}</div>
                                        <div className="stat-label">Pendientes</div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="stat-card">
                                        <div className="stat-number">{tasks.filter(task => task.completed).length}</div>
                                        <div className="stat-label">Completadas</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lista de tareas */}
                        <div className="task-list-container">
                            <h3 className="task-section-title">Todas las tareas</h3>

                            {tasks.length === 0 ? (
                                <div className="empty-state">
                                    <i className="fas fa-clipboard-list empty-icon"></i>
                                    <h4>No hay tareas</h4>
                                    <p>¡Agrega tu primera tarea para comenzar!</p>
                                </div>
                            ) : (
                                <div className="task-list">
                                    {tasks.map(task => (
                                        <div
                                            key={task.id}
                                            className={`task-item ${task.completed ? 'completed' : ''}`}
                                        >
                                            <div className="task-content">
                                                <button
                                                    className="task-checkbox"
                                                    onClick={() => toggleTask(task.id)}
                                                >
                                                    {task.completed && <i className="fas fa-check"></i>}
                                                </button>
                                                <span className="task-text">{task.text}</span>
                                            </div>
                                            <button
                                                className="task-delete"
                                                onClick={() => deleteTask(task.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;
