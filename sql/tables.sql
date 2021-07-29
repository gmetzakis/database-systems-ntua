DROP DATABASE IF EXISTS ntuadb;
CREATE DATABASE ntuadb;

USE ntuadb;

CREATE TABLE Customer(
    -- NFC_ID INT NOT NULL IDENTITY(1,1),
    NFC_ID INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    dateofbirth DATE NOT NULL,
    number_of_indentification_document VARCHAR(20) NOT NULL,
    type_of_indentification_document VARCHAR(20) NOT NULL,
    issuing_authority VARCHAR(30) NOT NULL,
    PRIMARY KEY (NFC_ID)
);

CREATE TABLE Customer_emails(
    NFC_ID INT NOT NULL,
    email VARCHAR(70) NOT NULL,
    PRIMARY KEY (NFC_ID, email), FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE
);

CREATE TABLE Customer_phones(
    NFC_ID INT NOT NULL,
    phone VARCHAR(30) NOT NULL,
    PRIMARY KEY (NFC_ID, phone), FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE
);

CREATE TABLE Services(
    service_ID INT NOT NULL,
    service_description VARCHAR(50) NOT NULL,
    reg_or_no_reg INT NOT NULL, -- 0 if need registration and 1 if not
    PRIMARY KEY (service_ID)
);

CREATE TABLE Services_that_need_registration(
    service_ID INT NOT NULL,
    PRIMARY KEY (service_ID),
    FOREIGN KEY (service_ID) REFERENCES Services(service_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Services_that_dont_need_registration(
    service_ID INT NOT NULL,
    PRIMARY KEY (service_ID),
    FOREIGN KEY (service_ID) REFERENCES Services(service_ID) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Hotel_rooms(
    hotel_room_ID INT NOT NULL PRIMARY KEY,
    number_of_beds INT NOT NULL,
    name_of_the_room VARCHAR(25) NOT NULL,
    description_of_position VARCHAR(100) NOT NULL
);

CREATE TABLE Have_access(
    NFC_ID INT NOT NULL,
    hotel_room_ID INT NOT NULL,
    starting_time_date DATETIME NOT NULL,
    ending_time_date DATETIME NOT NULL,
    PRIMARY KEY (NFC_ID, hotel_room_ID),
    FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE,
    FOREIGN KEY (hotel_room_ID) REFERENCES Hotel_rooms(hotel_room_ID) ON DELETE CASCADE
);

CREATE TABLE Visit(
    NFC_ID INT NOT NULL,
    hotel_room_ID INT NOT NULL,
    date_time_of_entrance DATETIME NOT NULL,
    date_time_of_exit DATETIME NOT NULL,
    PRIMARY KEY (NFC_ID, hotel_room_ID, date_time_of_entrance),
    FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE cascade,
    FOREIGN KEY (hotel_room_ID) REFERENCES Hotel_rooms(hotel_room_ID) ON DELETE cascade
);

CREATE TABLE Registered_to_services(
    NFC_ID INT NOT NULL,
    service_ID INT NOT NULL,
    datetime_of_registration DATETIME NOT NULL,
    PRIMARY KEY (NFC_ID, service_ID),
    FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE,
    FOREIGN KEY (service_ID) REFERENCES Services_that_need_registration(service_ID) ON DELETE CASCADE
);

CREATE TABLE Provided_to(
    hotel_room_ID INT NOT NULL,
    service_ID INT NOT NULL,
    PRIMARY KEY (hotel_room_ID, service_ID),
    FOREIGN KEY (service_ID) REFERENCES Services(service_ID) ON DELETE CASCADE,
    FOREIGN KEY (hotel_room_ID) REFERENCES Hotel_rooms(hotel_room_ID) ON DELETE CASCADE
);

CREATE TABLE Charge_for_service(
    datetime_of_the_event DATETIME NOT NULL,
    charge_description VARCHAR(80) NOT NULL,
    amount INT NOT NULL,
    NFC_ID INT NOT NULL,
    service_ID INT NOT NULL,
    PRIMARY KEY (datetime_of_the_event, service_ID, NFC_ID),
    FOREIGN KEY (service_ID) REFERENCES Services(service_ID) ON DELETE CASCADE,
    FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE
);

CREATE TABLE Receive_services(
    NFC_ID INT NOT NULL,
    service_ID INT NOT NULL,
    datetime_of_the_event DATETIME NOT NULL,
    PRIMARY KEY(NFC_ID, service_ID, datetime_of_the_event),
    FOREIGN KEY (service_ID) REFERENCES Services(service_ID) ON DELETE CASCADE,
    FOREIGN KEY (NFC_ID) REFERENCES Customer(NFC_ID) ON DELETE CASCADE,
    FOREIGN KEY (datetime_of_the_event) REFERENCES Charge_for_service(datetime_of_the_event) ON DELETE CASCADE
);

CREATE TABLE Visit_history(
	visit_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	NFC_ID INT NOT NULL,
    hotel_room_ID INT NOT NULL,
    date_time_of_entrance DATETIME NOT NULL,
    date_time_of_exit DATETIME NOT NULL
);

CREATE TABLE Transactions_history(
	transaction_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	datetime_of_the_event DATETIME NOT NULL,
    charge_description VARCHAR(80) NOT NULL,
    amount INT NOT NULL,
    NFC_ID INT NOT NULL,
    service_ID INT NOT NULL
);