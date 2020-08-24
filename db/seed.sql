-- Drops the programming_db if it already exists --
DROP DATABASE IF EXISTS tracker_db;
-- Create a database called programming_db --
CREATE DATABASE tracker_db;

USE tracker_db;

CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    department_id INTEGER,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY (department_id) REFERENCES department(id),
    PRIMARY KEY (id)
);

CREATE TABLE employee(
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (role_id) REFERENCES role(id),
    PRIMARY KEY (id)
);

