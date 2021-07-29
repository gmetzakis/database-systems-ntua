USE ntuadb;

DELIMITER $$

CREATE TRIGGER check_email_validity1 
BEFORE UPDATE ON Customer_emails
    FOR EACH ROW
    BEGIN
        if (new.email not like '%@%.%' or new.email like '@%' or new.email like '%@%@%' ) THEN
			signal sqlstate '45000' set message_text = 'Wrong email format inserted';
		end if;
	end;
$$

CREATE TRIGGER check_email_validity2 
BEFORE INSERT ON Customer_emails
    FOR EACH ROW
    BEGIN
        if (new.email not like '%@%.%' or new.email like '@%' or new.email like '%@%@%' ) THEN
			signal sqlstate '45000' set message_text = 'Wrong email format inserted';
		end if;
	end;

$$

CREATE TRIGGER check_phone_validity1 
BEFORE UPDATE ON Customer_phones
    FOR EACH ROW
    BEGIN
        if (length(new.phone) <> 10) THEN
			signal sqlstate '45000' set message_text = 'Wrong phone inserted';
		end if;
	end;

$$

CREATE TRIGGER check_phone_validity2
BEFORE INSERT ON Customer_phones
    FOR EACH ROW
    BEGIN
        if (length(new.phone) <> 10) THEN
			signal sqlstate '45000' set message_text = 'Wrong phone inserted';
		end if;
	end;
    
 $$
 
CREATE TRIGGER check_beds_validity1
BEFORE INSERT ON Hotel_rooms
    FOR EACH ROW
    BEGIN
        if (new.number_of_beds >=7) THEN
        signal sqlstate '45000' set message_text = 'Our hotel doesnt have rooms with more than 7 beds';
		end if;
	end;

$$

CREATE TRIGGER check_beds_validity2
BEFORE UPDATE ON Hotel_rooms
    FOR EACH ROW
    BEGIN
        if (new.number_of_beds >=7) THEN
        signal sqlstate '45000' set message_text = 'Our hotel doesnt have rooms with more than 7 beds';
		end if;
	end;

$$

CREATE TRIGGER check_for_have_access_validity1
BEFORE INSERT ON Have_access
    FOR EACH ROW
    BEGIN
        if (new.starting_time_date > new.ending_time_date) THEN
        signal sqlstate '45000' set message_text = 'Ending date cant be smaller than starting date (Have_access table)';
		end if;
	end;

$$

CREATE TRIGGER check_for_have_access_validity2
BEFORE UPDATE ON Have_access
    FOR EACH ROW
    BEGIN
        if (new.starting_time_date > new.ending_time_date) THEN
        signal sqlstate '45000' set message_text = 'Ending date cant be smaller than starting date (Have_access table)';
		end if;
	end;

$$

CREATE TRIGGER check_for_visit_validity1
BEFORE UPDATE ON Visit
    FOR EACH ROW
    BEGIN
        if (new.date_time_of_entrance > new.date_time_of_exit) THEN
        signal sqlstate '45000' set message_text = 'Ending date cant be smaller than starting date (Visit table)';
		end if;
	end;

$$

CREATE TRIGGER check_for_visit_validity2
BEFORE INSERT ON Visit
    FOR EACH ROW
    BEGIN
        if (new.date_time_of_entrance > new.date_time_of_exit) THEN
        signal sqlstate '45000' set message_text = 'Ending date cant be smaller than starting date (Visit table)';
		end if;
	end;

$$

CREATE TRIGGER check_for_amount_validity1
BEFORE INSERT ON Charge_for_service
    FOR EACH ROW
    BEGIN
        if (new.amount <= 0) THEN
        signal sqlstate '45000' set message_text = 'Amount cant be lower or equal to zero';
		end if;
	end;

$$

CREATE TRIGGER check_for_amount_validity2
BEFORE UPDATE ON Charge_for_service
    FOR EACH ROW
    BEGIN
        if (new.amount <= 0) THEN
        signal sqlstate '45000' set message_text = 'Amount cant be lower or equal to zero';
		end if;
	end;

$$

CREATE TRIGGER check_reservation1
BEFORE INSERT ON Have_access
    FOR EACH ROW
    BEGIN
        IF (EXISTS (SELECT * FROM Have_access WHERE new.hotel_room_ID = hotel_room_ID AND new.hotel_room_ID < 100 AND NOT (new.ending_time_date <= starting_time_date OR new.starting_time_date >= ending_time_date))) THEN
        signal sqlstate '45000' set message_text = 'Room is already occupied';
		end if;
	end;

$$

CREATE TRIGGER check_reservation2
BEFORE UPDATE ON Have_access
    FOR EACH ROW
    BEGIN
        IF (EXISTS (SELECT * FROM Have_access WHERE new.hotel_room_ID = hotel_room_ID AND new.hotel_room_ID < 100 AND NOT (new.ending_time_date <= starting_time_date OR new.starting_time_date >= ending_time_date))) THEN
        signal sqlstate '45000' set message_text = 'Room is already occupied';
		end if;
	end;

$$

CREATE TRIGGER check_time_have_access1
BEFORE INSERT ON Have_access
    FOR EACH ROW
    BEGIN
        IF (new.starting_time_date > NOW() OR new.ending_time_date > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_have_access2
BEFORE UPDATE ON Have_access
    FOR EACH ROW
    BEGIN
        IF (new.starting_time_date > NOW() OR new.ending_time_date > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_registered1
BEFORE INSERT ON Registered_to_services
    FOR EACH ROW
    BEGIN
        IF (new.datetime_of_registration > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_registered2
BEFORE UPDATE ON Registered_to_services
    FOR EACH ROW
    BEGIN
        IF (new.datetime_of_registration > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_visit1
BEFORE INSERT ON Visit
    FOR EACH ROW
    BEGIN
        IF (new.date_time_of_entrance > NOW() OR new.date_time_of_exit > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_visit2
BEFORE UPDATE ON Visit
    FOR EACH ROW
    BEGIN
        IF (new.date_time_of_entrance > NOW() OR new.date_time_of_exit > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_charge1
BEFORE INSERT ON Charge_for_service
    FOR EACH ROW
    BEGIN
        IF (new.datetime_of_the_event > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER check_time_charge2
BEFORE UPDATE ON Charge_for_service
    FOR EACH ROW
    BEGIN
        IF (new.datetime_of_the_event > NOW()) THEN
        signal sqlstate '45000' set message_text = 'Cant reference future time';
            end if;
        end;

$$

CREATE TRIGGER update_history_customer_delete1
AFTER INSERT ON Visit
	FOR EACH ROW
    BEGIN
		INSERT INTO Visit_history(NFC_ID, hotel_room_ID, date_time_of_entrance, date_time_of_exit) VALUES (new.NFC_ID, new.hotel_room_ID, new.date_time_of_entrance, new.date_time_of_exit);
	end;

$$

CREATE TRIGGER update_history_customer_delete2
AFTER UPDATE ON Visit
	FOR EACH ROW
    BEGIN
		INSERT INTO Visit_history(NFC_ID, hotel_room_ID, date_time_of_entrance, date_time_of_exit) VALUES (new.NFC_ID, new.hotel_room_ID, new.date_time_of_entrance, new.date_time_of_exit);
	end;

$$

CREATE TRIGGER room_lower1
BEFORE INSERT ON Provided_to
    FOR EACH ROW
    BEGIN
        IF ((new.hotel_room_ID < 100 AND new.service_ID <>0) OR
            (new.hotel_room_ID > 100 AND new.service_ID = 0)) THEN
        signal sqlstate '45000' set message_text = 'Rooms have an Id of less than 100';
        end if;
    end;

$$

CREATE TRIGGER room_lower2
BEFORE UPDATE ON Provided_to
    FOR EACH ROW
    BEGIN
        IF ((new.hotel_room_ID < 100 AND new.service_ID <>0) OR
            (new.hotel_room_ID > 100 AND new.service_ID = 0)) THEN
        signal sqlstate '45000' set message_text = 'Rooms have an Id of less than 100';
        end if;
    end;

$$

CREATE TRIGGER have_access1
BEFORE INSERT ON Have_access
	FOR EACH ROW
    BEGIN
		IF (NOT EXISTS (SELECT NFC_ID, hotel_room_ID FROM Registered_to_services JOIN Provided_to USING(service_ID)
						WHERE (new.NFC_ID = NFC_ID AND new.hotel_room_ID = hotel_room_ID) OR new.hotel_room_ID < 399)) THEN
		signal sqlstate '45000' set message_text = 'Cant have access to that room';
		end if;
	end;

$$

CREATE TRIGGER have_access2
BEFORE UPDATE ON Have_access
	FOR EACH ROW
    BEGIN
		IF (NOT EXISTS (SELECT NFC_ID, hotel_room_ID FROM Registered_to_services JOIN Provided_to USING(service_ID)
						WHERE (new.NFC_ID = NFC_ID AND new.hotel_room_ID = hotel_room_ID) OR new.hotel_room_ID < 399)) THEN
		signal sqlstate '45000' set message_text = 'Cant have access to that room';
		end if;
	end;

$$

CREATE TRIGGER can_visit1
BEFORE INSERT ON Visit
	FOR EACH ROW
    BEGIN
		IF (NOT EXISTS(SELECT NFC_ID, hotel_room_ID FROM Have_access 
        WHERE (new.NFC_ID = NFC_ID AND new.hotel_room_ID = hotel_room_ID))) THEN
        signal sqlstate '45000' set message_text = 'Cant access that room';
		end if;
	end;

$$

CREATE TRIGGER can_visit2
BEFORE UPDATE ON Visit
	FOR EACH ROW
    BEGIN
		IF (NOT EXISTS(SELECT NFC_ID, hotel_room_ID FROM Have_access 
        WHERE (new.NFC_ID = NFC_ID AND new.hotel_room_ID = hotel_room_ID))) THEN
        signal sqlstate '45000' set message_text = 'Cant access that room';
		end if;
	end;

$$

CREATE TRIGGER service_reg_no_reg1
BEFORE INSERT ON Services
	FOR EACH ROW
    BEGIN
		IF (new.reg_or_no_reg <> 0 AND new.reg_or_no_reg <>1) THEN
        signal sqlstate '45000' set message_text = 'Use 0 for a service that doesnt need registration and 1 for a service that needs';
		end if;
	end;

$$

CREATE TRIGGER service_reg_no_reg2
BEFORE UPDATE ON Services
	FOR EACH ROW
    BEGIN
		IF (new.reg_or_no_reg <> 0 AND new.reg_or_no_reg <>1) THEN
        signal sqlstate '45000' set message_text = 'Use 0 for a service that doesnt need registration and 1 for a service that needs';
		end if;
	end;

$$

CREATE TRIGGER service_isa
AFTER INSERT ON Services
	FOR EACH ROW
    BEGIN
		IF (new.reg_or_no_reg = 0) THEN
			INSERT INTO Services_that_dont_need_registration(service_ID) VALUES (new.service_ID);
		end if;
		IF (new.reg_or_no_reg = 1) THEN
			INSERT INTO Services_that_need_registration(service_ID) VALUES (new.service_ID);
        end if;
	end;
    
$$

CREATE TRIGGER update_history_transactions1
AFTER INSERT ON Charge_for_service
	FOR EACH ROW
    BEGIN
		INSERT INTO Transactions_history(datetime_of_the_event, charge_description, amount, NFC_ID, service_ID) VALUES
					(new.datetime_of_the_event, new.charge_description, new.amount, new.NFC_ID, new.service_ID);
	end;

$$

CREATE TRIGGER update_history_transactions2
AFTER UPDATE ON Charge_for_service
	FOR EACH ROW
    BEGIN
		INSERT INTO Transactions_history(datetime_of_the_event, charge_description, amount, NFC_ID, service_ID) VALUES
					(new.datetime_of_the_event, new.charge_description, new.amount, new.NFC_ID, new.service_ID);
	end;

$$


DELIMITER ;