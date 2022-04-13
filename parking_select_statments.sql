-- How many total parking spaces do I have?
	SELECT COUNT(*) FROM parking_spot;
    -- 30

--  How many parking lots are there at Cowpokes Stadium?
	SELECT COUNT(*) FROM lot
    WHERE stadium_id = 'Cowpokes Stadium';;
    -- 3

-- How many parking spaces are there at Cowpokes Stadium?
	SELECT COUNT(*) FROM parking_spot
	JOIN lot on parking_spot.lot_id = lot.id
	WHERE lot.stadium_ID = 'Cowpokes Stadium';
    -- 15

-- What parking spaces are currently available for use?
	SELECT * FROM parking_spot
	WHERE is_available = TRUE;

-- What parking spaces ended up being used for Event 1?
	SELECT ps.* FROM spot_event_history
	JOIN parking_spot ps on spot_event_history.spot_number = ps.spot_number and
    spot_event_history.lot_id = ps.lot_id
    where spot_event_history.event = 1;

-- What parking spaces ended up being used for Event 2?
    SELECT ps.* FROM spot_event_history
	JOIN parking_spot ps on spot_event_history.spot_number = ps.spot_number and
    spot_event_history.lot_id = ps.lot_id
    where spot_event_history.event = 2;

-- What employees occupy lot 2 at Rodeo Stadium?
	SELECT * FROM employee
	WHERE lot_assignment = 5;

-- How many Trucks have parked at any of my venues?
	SELECT COUNT(*) FROM vehicle
	WHERE type = 'Truck';

-- How many of each vehicle type have parked at any of my venues?
	SELECT COUNT(*),vehicle.type FROM vehicle
	GROUP BY type;

-- On average, how many vehicles come to an event?
SELECT COUNT(*) FROM spot_event_history;

--  EXTRA QUESTIONS

--  How many fans came in vehicle license plate 1?
	SELECT COUNT(*) FROM fan
	JOIN driver ON driver.driver_license = fan.driver
	WHERE driver.vehicle = 'V1';

-- What time did vehicle 1 arrive?
SELECT arrival_time FROM allocation
WHERE license_plate = 'V1';

-- How many fans came with each driver?
	SELECT COUNT(*), driver FROM fan
	GROUP BY driver;
