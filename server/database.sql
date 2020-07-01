CREATE DATABASE pernappointment;

CREATE TABLE appointment(
    appointment_id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    date TEXT,
    time TEXT
);