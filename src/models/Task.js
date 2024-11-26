const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, required: true},
    status: { type: String, enum: ['pendiente', 'en-progreso', 'completado'], default: 'pendiente' },
}, { timestamps: true}); // Indica la fecha y hora que se ingresa la tarea

module.exports = mongoose.model('Task', taskSchema);