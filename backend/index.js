const express = require('express');
const cors = require('cors');
const pool = require('./db');


const app = express();



//for cors and middlewears
app.use(cors);
app.use(express.json());


// ROUTES 

//create a todo

app.post('/todos', async(req,res)=>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo_list (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//get all todo

app.get('/todos', async(req,res)=>{
    try {
        const allTodos = await pool.query("SELECT * FROM todo_list");
        res.json(allTodos.rows);
    } catch (error) {
        console.error(error.message);
    }
})

//get a todo

app.get('/todos/:id', async(req,res)=>{
    try {
        const {todoID} = req.params;
        const todo = await pool.query("SELECT * FROM todo_list WHERE t_id = $1",
            [todoID]
        );
    } catch (error) {
        console.error(error.message);
    }
})

//update a todo

app.put('/todos/:id', async(req,res)=>{
    try {
        const {todoID} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo_list SET description = $1 WHERE t_id = $2", 
            [description, todoID]
        );

        res.json("todo was updated")


    } catch (error) {
        console.error(error.message);
    }
})


//delete a todo

app.delete('/todos/:id', async(req,res)=>{
    try {
        const {todoID} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo_list WHERE t_id = $1", 
            [todoID]
        );

        
        res.json("todo was deleted");
    } catch (error) {
        console.error(error.message);
    }
})







app.listen(5000, ()=>{
    console.log('server is running on 5000');
})