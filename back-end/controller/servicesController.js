const db = require('./db.js');

function getAllServices (req, res) {
    get_All_Services = `SELECT s.service_ID, s.service_description FROM Services s;`
    db.query(get_All_Services, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}
exports.getAllServices = getAllServices;


function getServiceVisitsWithCriteria (req, res) {
    if(req.params.service_ID != 'null') {var service_ID = (req.params.service_ID) ? `service_ID=${req.params.service_ID} AND` : "";}
    else {var service_ID = (req.body.service_ID) ? `service_ID=${req.body.service_ID} AND` : "";}
    if(req.params.amount != 'null') {var amount = (req.params.amount) ? `amount=${req.params.amount} AND` : "";}
    else {var amount = (req.body.amount) ? `amount=${req.body.amount} AND` : "";}
    if(req.params.date_time_of_entrance != 'null') {var date_time_of_entrance = (req.params.date_time_of_entrance) ? `DATE(Visit_history.date_time_of_entrance)='${req.params.date_time_of_entrance}' AND` : "";}
    else {var date_time_of_entrance = (req.body.date_time_of_entrance) ? `DATE(Visit_history.date_time_of_entrance)='${req.body.date_time_of_entrance}' AND` : "";}
    if(req.params.must_register != 'null') {var must_register = req.params.must_register;}
    else {var must_register = req.body.must_register;}
    const helpfull = `3>2`;

    if(must_register=='yes' || amount) {
        get_Services_criteria = "SELECT DISTINCT Visit_history.NFC_ID, hotel_room_ID, description_of_position, service_description, date_time_of_entrance, date_time_of_exit, amount "
            + "FROM Visit_history "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Provided_to USING (hotel_room_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Services_that_need_registration USING (service_ID) "
            + "JOIN Charge_for_service USING (service_ID) "
            + `WHERE service_ID <> 0 AND ${date_time_of_entrance} ${service_ID} ${amount} ${helpfull};`
    }

    else if(must_register=='no') {
        get_Services_criteria = "SELECT DISTINCT Visit_history.NFC_ID, hotel_room_ID, description_of_position, service_description, date_time_of_entrance, date_time_of_exit, 'no cost' as amount "
            + "FROM Visit_history "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Provided_to USING (hotel_room_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Services_that_dont_need_registration USING (service_ID) "
            + `WHERE service_ID <> 0 AND ${date_time_of_entrance} ${service_ID} ${helpfull};`
    }
    else {
        get_Services_criteria0 = "SELECT DISTINCT Visit_history.NFC_ID, hotel_room_ID, description_of_position, service_description, date_time_of_entrance, date_time_of_exit, amount "
            + "FROM Visit_history "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Provided_to USING (hotel_room_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Services_that_need_registration USING (service_ID) "
            + "JOIN Charge_for_service USING (service_ID) "
            + `WHERE service_ID <> 0 AND ${date_time_of_entrance} ${service_ID} ${amount} ${helpfull}`

        get_Services_criteria1 = "SELECT DISTINCT Visit_history.NFC_ID, hotel_room_ID, description_of_position, service_description, date_time_of_entrance, date_time_of_exit, 'no cost' as amount "
            + "FROM Visit_history "
            + "JOIN Hotel_rooms USING (hotel_room_ID) "
            + "JOIN Provided_to USING (hotel_room_ID) "
            + "JOIN Services USING (service_ID) "
            + "JOIN Services_that_dont_need_registration USING (service_ID) "
            + `WHERE service_ID <> 0 AND ${date_time_of_entrance} ${service_ID} ${helpfull};` 
            
        get_Services_criteria = get_Services_criteria0 + " UNION " + get_Services_criteria1;
    }

    db.query(get_Services_criteria, (err, rows) => {
        if(err) res.status(400).send(err.message)
        else res.send(rows)
    })
}
exports.getServiceVisitsWithCriteria = getServiceVisitsWithCriteria;


/*
function getService (req, res) {
    get_Service = `SELECT * FROM Services WHERE service_ID=${req.params.service_ID};`
    db.query(get_Service, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}
exports.getService = getService;


function insertService (req, res) {
    const newService = "INSERT INTO Services (service_ID,service_description)"
        + "VALUES ("
        + '"' + `${req.body.service_ID}` + '"' + ','
        + '"' + `${req.body.service_description}");`
    
    db.query(newService, async (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            const register = req.body.must_register
            let service_ID = req.body.service_ID

            if(register) db.query(`INSERT INTO Services_that_need_registration VALUES (${service_ID});`)
            else db.query(`INSERT INTO Services_that_dont_need_registration VALUES (${service_ID});`)
            
            res.send("Service Inserted Successfully")
        }
    })
}
exports.insertService = insertService


function updateService (req, res) {
    const service_ID = req.params.service_ID
    const service_description = (req.body.service_description) ? `service_description='${req.body.service_description}'` : ""
    
    const update_Service = `UPDATE Services SET ${service_description} WHERE service_ID=${service_ID};`
    
    const deleteRegSer = `DELETE FROM Services_that_need_registration WHERE service_ID=${service_ID};`
    const deleteUnRegSer = `DELETE FROM Services_that_dont_need_registration WHERE service_ID=${service_ID};`

    db.query(update_Service, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            const register = req.body.must_register
            if(register) {
                db.query(deleteRegSer, async (err2, rows) => {
                    if(err2) res.status(400).send(err2.message) 
                    else db.query(`INSERT INTO Services_that_need_registration VALUES (${service_ID});`)
                })
            }
            else {
                db.query(deleteUnRegSer, async (err3, rows) => {
                    if(err3) res.status(400).send(err3.message) 
                    else db.query(`INSERT INTO Services_that_dont_need_registration VALUES (${service_ID});`)
                })
            }
            res.send("Service Updated Successfully")
        }
    })
}
exports.updateService = updateService


function deleteService (req, res) {
    delete_Service = `DELETE FROM Services WHERE service_ID=${req.params.service_ID};`
    db.query(delete_Service, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            db.query(`DELETE FROM Services_that_need_registration WHERE service_ID=${req.params.service_ID};`)
            db.query(`DELETE FROM Services_that_dont_need_registration WHERE service_ID=${req.params.service_ID};`)
            res.send("Service Deleted Successfully")
        }
    })
}
exports.deleteService = deleteService
*/