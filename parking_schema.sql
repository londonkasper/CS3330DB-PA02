CREATE DATABASE parking_db;
USE parking_db;
-- DROP DATABASE if exists parking_db;

CREATE TABLE stadium(
    address VARCHAR(200),
    stadium_name VARCHAR(200) PRIMARY KEY
);
CREATE TABLE lot(
    id INT NOT NULL AUTO_INCREMENT,
    stadium_id VARCHAR(200) REFERENCES stadium(stadium_name),
    PRIMARY KEY (id, stadium_id)
);

CREATE TABLE parking_spot(
    spot_number INTEGER,
    lot_id INT REFERENCES lot(id),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    is_handicap BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(spot_number, lot_id)
);

CREATE TABLE employee(
    ssn INTEGER PRIMARY KEY ,
    lot_assignment INT REFERENCES lot(id),
    first_name VARCHAR(200),
    last_name VARCHAR (200),
    username VARCHAR (255),
    password VARCHAR(255)
);

CREATE TABLE vehicle(
    license_plate VARCHAR(20) PRIMARY KEY,
    type VARCHAR(20),
    is_handicap BOOLEAN NOT NULL DEFAULT FALSE
);
SELECT * FROM vehicle;
SELECT * FROM allocation;
SELECT * FROM employee;
CREATE TABLE allocation(
    employee INTEGER REFERENCES employee(ssn),
    license_plate VARCHAR(20) REFERENCES vehicle(license_plate),
    spot_number INTEGER,
    lot_id INT NOT NULL,
    arrival_time TIME,
    departure_time TIME,
    FOREIGN KEY (spot_number, lot_id) REFERENCES parking_spot(spot_number, lot_id),
    allocation_num INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY (allocation_num)
);
SELECT * FROM parking_spot;
CREATE TABLE driver(
    driver_license INTEGER PRIMARY KEY,
    vehicle VARCHAR(20) REFERENCES vehicle(license_plate),
    first_name VARCHAR(200),
    last_name VARCHAR (200)
);

CREATE TABLE fan(
    ticket_num INTEGER PRIMARY KEY,
    first_name VARCHAR(200),
    last_name VARCHAR (200),
    driver INTEGER references driver(driver_license)
);

CREATE TABLE event(
    id INT NOT NULL AUTO_INCREMENT,
    date date,
    start_time time,
    end_time time,
    stadium VARCHAR(200) REFERENCES stadium(stadium_name),
    PRIMARY KEY (id)
);
CREATE TABLE spot_event_history(
    event INT REFERENCES event(id),
    spot_number INTEGER,
    lot_id INT,
    FOREIGN KEY (spot_number, lot_id) REFERENCES parking_spot(spot_number, lot_id),
    PRIMARY KEY (event, lot_id, spot_number)
);
--  You should have 2 stadiums: Cowpokes Stadium and the Rodeo.
INSERT INTO stadium (address, stadium_name) VALUES
('1234 Football Lane', 'Cowpokes Stadium'),
('5678 Football Dr', 'Rodeo');
SELECT * FROM stadium;
-- Each stadium should have at least 3 lots
INSERT INTO lot(stadium_id) VALUES
('Cowpokes Stadium'),
('Cowpokes Stadium'),
('Cowpokes Stadium'),
('Rodeo'),
('Rodeo'),
('Rodeo');
select * from lot;
-- each of which has at least 5 spots
INSERT INTO parking_spot(spot_number,lot_id, is_available, is_handicap) VALUES
(101,4,TRUE,FALSE),
(102,4,TRUE,FALSE),
(103,4,TRUE,FALSE),
(104,4,TRUE,FALSE),
(105,4,TRUE,FALSE),

(201,5,TRUE,FALSE),
(202,5,TRUE,FALSE),
(203,5,TRUE,FALSE),
(204,5,TRUE,FALSE),
(205,5,TRUE,FALSE),

(301,6,TRUE,FALSE),
(302,6,TRUE,FALSE),
(303,6,TRUE,FALSE),
(304,6,TRUE,FALSE),
(305,6,TRUE,FALSE),

(401,7,TRUE,FALSE),
(402,7,TRUE,FALSE),
(403,7,TRUE,FALSE),
(404,7,TRUE,FALSE),
(405,7,TRUE,FALSE),

(501,8,TRUE,FALSE),
(502,8,TRUE,FALSE),
(503,8,TRUE,FALSE),
(504,8,TRUE,FALSE),
(505,8,TRUE,FALSE),

(601,9,TRUE,FALSE),
(602,9,TRUE,FALSE),
(603,9,TRUE,FALSE),
(604,9,TRUE,FALSE),
(605,9,TRUE,FALSE);
select * from parking_spot;
-- Each stadium should have hosted at least 2 events
INSERT INTO event(date, start_time, end_time,stadium) VALUES
('2001-01-01', '11:50:00', '18:00:00','Cowpokes Stadium'),
('2021-05-03', '6:55:20', '11:00:00','Cowpokes Stadium'),
('2022-02-14', '12:00:00', '18:00:00','Rodeo'),
('2122-01-24', '01:00:00', '23:00:00','Rodeo');
select * from event;
--  each of which has some number of parking allocations
INSERT INTO spot_event_history(event,spot_number,lot_id) VALUES
(1,101,4),
(2,202,5),
(3,303,6),


(4,404,7);
select * from spot_event_history;

INSERT INTO vehicle(license_plate, type, is_handicap) VALUES
('V1', 'Coupe', FALSE),
('V2', 'Sedan', FALSE),
('V3', 'Minivan', FALSE),
('V4', 'Hatchback', FALSE),
('V5', 'Van', FALSE),
('V6', 'Truck', FALSE);
select * from vehicle;

INSERT INTO driver(driver_license, vehicle, first_name, last_name) VALUES
(1, 'V1', 'London', 'Kasper'),
(2, 'V2', 'Jeremy', 'Waibel'),
(3, 'V3', 'Hazel', 'Eroy'),
(4, 'V4', 'Mark', 'Fontenot'),
(5, 'V5', 'Ginger', 'Alford'),
(6, 'V6', 'Christian', 'Ayala');
select * from driver;

INSERT INTO fan(ticket_num, first_name, last_name, driver) VALUES
(1, 'Landry', 'Kasper', 1),
(2, 'Elizabeth', 'Waibel', 2),
(3, 'Logan', 'Kasper', 1),
(4, 'Alexa', 'Derryberry', 3);
select * from fan;

INSERT INTO employee(ssn, lot_assignment, first_name, last_name) VALUES
(1, 4, 'Joe', 'Pesci'),
(2, 4, 'Chris', 'Evans'),
(3, 4, 'Chris', 'Hemsworth'),
(4, 5, 'Chris', 'Pine'),
(5, 5,  'Garfield', 'The Cat'),
(6, 5, 'Andrew', 'Garfield'),
(7, 6, 'Drew', 'Barrymore'),
(8, 6, 'Harry', 'Styles'),
(9, 6, 'Harry', 'Headbanger'),
(10, 7, 'Louis', 'XVII'),
(11, 7, 'Joan', 'Of Arc'),
(12, 7, 'James', 'Pierce'),
(13, 8, 'Adlen', 'Allegood'),
(14, 8, 'Amber', 'Birdwell'),
(15, 8, 'Betty', 'White'),
(16, 9, 'Howie', 'Mandel'),
(17, 9, 'Mel', 'B'),
(18, 9, 'Baby', 'Spice');

select * from employee;

INSERT INTO allocation(employee, license_plate, spot_number, lot_id,arrival_time ,departure_time, allocation_num) VALUES
(1,'V1',101,4,'8:00:00','12:00:00',69),
(2,'V2',101,4,'10:00:00','17:00:00',49);
select * from allocation;