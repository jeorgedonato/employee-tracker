-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS tracker_db;
-- Create a database called programming_db --
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE departments(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(60),
  PRIMARY KEY (id)
);

CREATE TABLE roles(
	id INTEGER AUTO_INCREMENT NOT NULL,
    department_id INTEGER,
    title VARCHAR(60),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);

CREATE TABLE employees(
	  id INTEGER AUTO_INCREMENT NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id),
    PRIMARY KEY (id)
);

