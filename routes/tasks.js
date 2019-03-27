var express = require('express');
var router = express.Router();

// Контроллер
var task_controller = require('../controllers/taskController.js');

// get список задач
router.get('/', task_controller.task_list);

// get запрос на страницу с формой
router.get('/create', task_controller.task_create_get);

// post запрос на добавление данных c формы
router.post('/', task_controller.task_create_post);

// get запрос на страницу с формой редактирования статьи
router.get('/update/:id', task_controller.task_update_get);

// post запрос на обновление данных
router.post('/:id', task_controller.task_update_post);

// post request delete task
router.delete('/:id', task_controller.task_delete);

module.exports = router;