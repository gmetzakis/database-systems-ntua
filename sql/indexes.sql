USE ntuadb;

CREATE INDEX visit_date_and_time on Visit_history(date_time_of_entrance, date_time_of_exit);
CREATE INDEX have_access_date_and_time on Have_access(starting_time_date, ending_time_date);
CREATE INDEX registered_time_and_date on Registered_to_services(datetime_of_registration);