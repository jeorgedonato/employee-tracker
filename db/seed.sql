-- Drops the tracker_db if it already exists --
DROP DATABASE IF EXISTS tracker_db;
-- Create a database called tracker_db --
CREATE DATABASE tracker_db;
USE tracker_db;
CREATE TABLE departments(
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(60) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE roles(
  id INTEGER AUTO_INCREMENT NOT NULL,
  department_id INTEGER NOT NULL,
  title VARCHAR(60) NOT NULL,
  salary DECIMAL NOT NULL,
  FOREIGN KEY (department_id) REFERENCES departments(id),
  PRIMARY KEY (id)
);
CREATE TABLE employees(
  id INTEGER AUTO_INCREMENT NOT NULL,
  role_id INTEGER NOT NULL,
  manager_id INTEGER NOT NULL DEFAULT 0,
  first_name VARCHAR(60) NOT NULL,
  last_name VARCHAR(60) NOT NULL,
  is_manager BOOLEAN DEFAULT FALSE NOT NULL,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  PRIMARY KEY (id)
);