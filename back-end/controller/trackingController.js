const db = require('./db.js');


function trackCustomersVisits (req, res) {
    track_moves = "SELECT hotel_room_ID, name_of_the_room, date_time_of_entrance, date_time_of_exit "
            + "FROM Visit_history "
            + "USE INDEX(visit_date_and_time) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + `WHERE Visit_history.NFC_ID = ${req.params.NFC_ID} ;`
    
    db.query(track_moves, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.trackCustomersVisits = trackCustomersVisits;



function detectPossibleCovidCases (req, res) {
    detect_covid = "SELECT DISTINCT ts.NFC_ID AS Possibly_exposed_customer_ID, ts.hotel_room_ID AS Exposed_room_ID, ts.date_time_of_entrance, ts.date_time_of_exit, "
            + "tb.NFC_ID AS Possibly_Exposed_From_Customer, tb.date_time_of_entrance, tb.date_time_of_exit "
            + "FROM Visit_history tb JOIN Visit_history ts "
            + `ON tb.NFC_ID = ${req.params.NFC_ID} AND `
            + "tb.NFC_ID <> ts.NFC_ID AND "
            + "tb.hotel_room_ID = ts.hotel_room_ID AND "
            + "((ts.date_time_of_entrance BETWEEN tb.date_time_of_entrance AND ADDTIME(tb.date_time_of_entrance, '72:00:00')) OR "
            + "(ts.date_time_of_exit BETWEEN tb.date_time_of_entrance AND ADDTIME(tb.date_time_of_entrance, '72:00:00')));";
        
    db.query(detect_covid, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.detectPossibleCovidCases = detectPossibleCovidCases;




function mostUsedRooms (req, res) {
    annual_20_40 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '20-40' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "

    annual_41_60 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '41-60' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "

    annual_over60 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '61+' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "
    
    monthly_20_40 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '20-40' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "

    monthly_41_60 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '41-60' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "

    monthly_over60 = "SELECT hotel_room_ID, name_of_the_room, description_of_position, COUNT(hotel_room_ID) AS NO_of_People_visited, '61+' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Hotel_rooms "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY hotel_room_ID, AGE_GROUP, TIMEFRAME "

    most_used_rooms = annual_20_40 + " UNION " + annual_41_60 + " UNION " + annual_over60 + " UNION " + monthly_20_40 + " UNION " + monthly_41_60 + " UNION " + monthly_over60 + "ORDER BY TIMEFRAME DESC, AGE_GROUP, NO_of_People_visited DESC;";

    db.query(most_used_rooms, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.mostUsedRooms = mostUsedRooms;


function mostUsedServices (req, res) {
    annual_20_40 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '20-40' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    annual_41_60 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '41-60' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    annual_over60 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '61+' AS AGE_GROUP, 'Last year' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_20_40 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '20-40' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_41_60 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '41-60' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_over60 = "SELECT service_ID, service_description, COUNT(service_ID) AS Used_times, '61+' AS AGE_GROUP, 'Last month' AS TIMEFRAME "
            + "FROM Services "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + "JOIN Customer USING (NFC_ID) "
            + `WHERE number_of_beds = 0 AND (YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30) `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "
    
    most_used_services = annual_20_40 + " UNION " + annual_41_60 + " UNION " + annual_over60 + " UNION " + monthly_20_40 + " UNION " + monthly_41_60 + " UNION " + monthly_over60 + "ORDER BY TIMEFRAME DESC, AGE_GROUP, Used_times DESC;";

    db.query(most_used_services, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.mostUsedServices = mostUsedServices;


function servicesUsedByTheMostPeople (req, res) {
    annual_20_40 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '20-40' AS AGE_GROUP, 'Last year' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    annual_41_60 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '41-60' AS AGE_GROUP, 'Last year' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    annual_over60 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '61+' AS AGE_GROUP, 'Last year' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 365))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_20_40 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '20-40' AS AGE_GROUP, 'Last month' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 20 AND 40) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_41_60 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '41-60' AS AGE_GROUP, 'Last month' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) BETWEEN 41 AND 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "

    monthly_over60 = "SELECT service_ID, service_description, COUNT(*) as Users_using_this_service, '61+' AS AGE_GROUP, 'Last month' AS TIMEFRAME FROM( "
            + "SELECT DISTINCT Charge_for_service.NFC_ID, Service_ID, service_description "
            + "FROM Charge_for_service "
            + "JOIN Customer USING (NFC_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Provided_to USING (service_ID) "
            + "JOIN Visit_history USING (hotel_room_ID) "
            + `WHERE service_ID <>0 AND ((YEAR(NOW()) - YEAR(Customer.dateofbirth) > 60) AND (DATE(NOW()) - DATE(Visit_history.date_time_of_entrance) < 30))) T `
            + "GROUP BY service_ID, AGE_GROUP, TIMEFRAME "
    
    services_used_by_most = annual_20_40 + " UNION " + annual_41_60 + " UNION " + annual_over60 + " UNION " + monthly_20_40 + " UNION " + monthly_41_60 + " UNION " + monthly_over60 + "ORDER BY TIMEFRAME DESC, AGE_GROUP, Users_using_this_service DESC;";
    
    db.query(services_used_by_most, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.servicesUsedByTheMostPeople = servicesUsedByTheMostPeople;