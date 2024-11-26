const Task = require('../models/Task');

// Obtener todas las tareas
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Hubo un error en la petición'});
    }
};

// Crear una nueva tarea
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: 'El campo "title" y "description" son obligatorios' });
        }
        const task = new Task({title, description, status});
        await task.save();
        res.status(201).json({ message: 'Tarea creada', task})
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la tarea', error});
    }
};

// Actualizar una tarea
const updateTask = async (req, res) => {
    try{
        const { title, description, status} = req.body;
        const update = await Task.findByIdAndUpdate(
            req.params.id,
            {title, description, status},
            {new: true}
        );
        if (!update) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        };
        res.status(200).json({ message: 'Tarea actualizada', update})
    } catch(error){
        res.status(400).json({ message: 'Error al actualizar la tarea', error});
    }
};

// Eliminar una tarea
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada'})
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la tarea', error});
    }
};

module.exports = { getTasks,  createTask, updateTask, deleteTask}