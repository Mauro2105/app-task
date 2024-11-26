import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

function App(){
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setDescription] = useState('');
  const [newStatus, setNewStatus] = useState('pendiente');

  // Cargar tareas
  useEffect(() => {
    axios.get(API_URL)
     .then(response => setTasks(response.data))
     .catch(error => console.error(error));
  }, []);

  // Añadir tarea
  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert('El título de la tarea no puede estar vacío');
      return;
    }
    axios.post(API_URL, { title: newTask, description: newDescription, status: newStatus})
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error(error));
    setNewTask('');
    setDescription('');
    setNewStatus('pendiente');
  };

  // Actualizar tarea
  const handleUpdateTask = (id, updatedData) => {
    axios.put(`${API_URL}/${id}`, updatedData)
      .then(response => {
        const updatedTasks = tasks.map(task => task._id === id ? response.data : task);
        setTasks(updatedTasks);
      })
      .catch(error => console.error(error));
  };

  // Eliminar tarea
  const handleDeleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => setTasks(tasks.filter(task => task.id !== id)))
      .catch(error => console.error(error));
  };

  return(
    <div style={{padding: '20px'}}>
      <h1>Gestion de tareas</h1>
      <div>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Ingrese una tarea"
        />
        <input 
          type="text" 
          value={newDescription} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Ingrese la descripción de la tarea"
        />
        <button onClick={handleAddTask}>Agregar</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.title} - {task.description} - {task.status}
            <button onClick={() => {
              const updatedTitle = prompt('Ingrese el nuevo título', task.title);
              if (updatedTitle !== null) handleUpdateTask(task._id, {title: updatedTitle});
            }}>Actualizar</button>
            <div>
              <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="en-progreso">En progreso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;