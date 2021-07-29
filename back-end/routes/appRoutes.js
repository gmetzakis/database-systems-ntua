module.exports = (app) => {
    const {getCustomer, getAllCustomers} = require('../controller/customerController.js')
    const {getAllRooms} = require('../controller/roomsController.js')
    const {getAllServices, getServiceVisitsWithCriteria} = require('../controller/servicesController.js')
    const {trackCustomersVisits, detectPossibleCovidCases, mostUsedRooms, mostUsedServices, servicesUsedByTheMostPeople} = require('../controller/trackingController.js')

    app.route('/db/api/customers')
        .get(getAllCustomers);  

    app.route('/db/api/customers/:NFC_ID')
        .get(getCustomer);

    app.route('/db/api/rooms')
        .get(getAllRooms); 

    app.route('/db/api/services')
        .get(getAllServices); 



    app.route('/db/api/servicesCriteria/:service_ID/:amount/:date_time_of_entrance/:must_register')
        .get(getServiceVisitsWithCriteria);



    app.route('/db/api/tracking/:NFC_ID')
        .get(trackCustomersVisits);

    app.route('/db/api/detectCovid/:NFC_ID')
        .get(detectPossibleCovidCases);


        
    app.route('/db/api/mostUsedRooms')
        .get(mostUsedRooms);

    app.route('/db/api/mostUsedServices')
        .get(mostUsedServices);

    app.route('/db/api/servicesUsedByTheMostPeople')
        .get(servicesUsedByTheMostPeople);
}
