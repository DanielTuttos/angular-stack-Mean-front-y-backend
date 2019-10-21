const express = require('express');

const employee = require('../controllers/employee.controller');

const router = express.Router();

router.get('/', employee.getEmployees);//get permite obtener datos

router.post('/', employee.createEmployee);//post nos permite guardar datos

router.get('/:id', employee.getEmployee);

router.put('/:id', employee.editEmployee); //put se usa para editar datos

router.delete('/:id', employee.deleteEmployee); // delete para eliminar datos


module.exports = router;