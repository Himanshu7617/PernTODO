CREATE DATABASE todo_web;

CREATE TABLE todo_list(
    t_id SERIAL PRIMARY KEY, 
    description VARCHAR(255),
)