var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var Task = require('../models/task');

var app = express();

// Показать список задач
exports.task_list = function(req, res) {
	var db = new sqlite3.Database('./db/tasks.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});
	var sql = 'SELECT * FROM tasks';
	db.all(sql, function(err, rows) {
		res.render('tasks', {
			data: {
				title: 'Список задач',
				rows: rows
			}
		});
	});
	db.close();
};

// Показать форму создания задачи
exports.task_create_get = function(req, res) {
	res.render('create-form', {
		data: {
			url: '/tasks',
			title: 'Создание задачи',
			type: 'create',
			rows: ''
		}
	});
}

// Создать задачу по запросу POST
exports.task_create_post = function(req, res) {
	var task = (req.body.name) ? (req.body.name) : 'new task';
	var db = new sqlite3.Database('./db/tasks.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});
	var sql = 'INSERT INTO tasks (name, completed) VALUES (?, ?)';
	db.run(sql, [task, 'N'], function(err) {
		if (err) {
			return console.error(err.message);
		}
	});
	db.close();
	res.redirect('/tasks');
}

// Удалить задачу по запросу DELETE
exports.task_delete = function(req, res) {
	var id = req.params.id;
	var db = new sqlite3.Database('./db/tasks.db', (err) => {
	  if (err) {
	    console.error(err.message);
	  }
	});
	db.run(`DELETE FROM tasks WHERE id=?`, [id], function(err) {
	  if (err) {
	    return console.error(err.message);
	  }
	});
	db.close();
	res.end();
}

// Показать форму обновления задачи
exports.task_update_get = function(req, res) {
	var db = new sqlite3.Database('./db/tasks.db');
	var params = Number(req.params.id);
	var sql = 'SELECT * FROM tasks WHERE id = ?';
	 
	db.get(sql, [params], function(err, rows) {
		if (err) {
			return console.error(err.message);
		}
		res.render('create-form', {
			data: {
				url: '/tasks/'+req.params.id,
				title: 'Редактирование',
				type: 'update',
				rows: rows,
			}
		});
	});
	db.close();
}

// Обновить задачу по запросу POST
exports.task_update_post = function(req, res) {
	var id = req.body.id;
	var task = req.body.name;
	var completed = (req.body.completed === 'on') ? 'Y' : 'N';
	var db = new sqlite3.Database('./db/tasks.db', (err) => {
		if (err) {
			console.error(err.message);
		}
	});
	var sql = 'UPDATE tasks SET name=?, completed=? WHERE id=?';
	db.run(sql, [task, completed, id], function(err) {
		if (err) {
			return console.error(err.message);
		}
	});
	db.close();
	res.redirect('/tasks');
}