const db = require('./db.js');

function getCustomer (req, res) {
    get_Customer = `SELECT * FROM Customer JOIN Customer_phones USING (NFC_ID) JOIN Customer_emails USING (NFC_ID) WHERE NFC_ID=${req.params.NFC_ID};`
    db.query(get_Customer, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            let phone1 = ' '
            let phone2 = ' '
            let email1 = ' '
            let email2 = ' '
            
            const phones0 = Object.keys(rows).map(key => rows[key].phone)
            const emails0 = Object.keys(rows).map(key => rows[key].email)
            let phones = phones0.filter((item, pos ,self) => self.indexOf(item) == pos)
            let emails = emails0.filter((item, pos ,self) => self.indexOf(item) == pos)

            phone1 = phones[0]
            email1 = emails[0]
            if(phones.length>1) phone2 = phones[1]
            if(emails.length>1) email2 = phones[1]
            const final = {...rows[0], phone1, phone2, email1, email2}
            delete final['phone']
            delete final['email']
            res.send(final)
        }
    })
}
exports.getCustomer = getCustomer;


function getAllCustomers (req, res) {
    get_All_Customers = `SELECT c.NFC_ID, c.firstname, c.lastname FROM Customer as c;`
    db.query(get_All_Customers, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else res.send(rows)
    })
}
exports.getAllCustomers = getAllCustomers;





/*function getCustomer (req, res) {
    get_Customer = `SELECT * FROM Customer JOIN Customer_phones USING (NFC_ID) JOIN Customer_emails USING (NFC_ID) WHERE NFC_ID=${req.params.NFC_ID};`
    db.query(get_Customer, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            const phones0 = Object.keys(rows).map(key => rows[key].phone)
            const emails0 = Object.keys(rows).map(key => rows[key].email)
            let phones = phones0.filter((item, pos ,self) => self.indexOf(item) == pos)
            let emails = emails0.filter((item, pos ,self) => self.indexOf(item) == pos)

            const final = {...rows[0], phones, emails}
            delete final['phone']
            delete final['email']
            res.send(final)
        }
    })
}
exports.getCustomer = getCustomer;

function insertCustomer (req, res) {
    const phones_0 = req.body.phone
    const phones = phones_0.split(',')
    const emails_0 = req.body.email
    const emails = emails_0.split(',');
    const newCustomer = "INSERT INTO Customer (NFC_ID, firstname, lastname, dateofbirth, number_of_indentification_document, type_of_indentification_document, issuing_authority)"
        + "VALUES ("
        + '"' + `${req.body.NFC_ID}` + '"' + ','
        + '"' + `${req.body.firstname}` + '"' + ','
        + '"' + `${req.body.lastname}` + '"' + ','
        + '"' + `${req.body.dateofbirth}` + '"' + ','
        + '"' + `${req.body.number_of_indentification_document}` + '"' + ','
        + '"' + `${req.body.type_of_indentification_document}` + '"' + ','
        + '"' + `${req.body.issuing_authority}");`
    
    db.query(newCustomer, async (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            let NFC_ID = req.body.NFC_ID
            for (const phone of phones) {
                db.query(`INSERT INTO Customer_phones VALUES (${NFC_ID},'${phone}');`)
            }
            for (const email of emails) {
                db.query(`INSERT INTO Customer_emails VALUES (${NFC_ID},'${email}');`)
            }
            res.send("Customer Inserted Successfully")
        }
    })
}
exports.insertCustomer = insertCustomer


function updateCustomer (req, res) {
    const NFC_ID = req.params.NFC_ID
    const phones_0 = req.body.phone
    const phones = phones_0.split(',')
    const emails_0 = req.body.email
    const emails = emails_0.split(',');
    const firstname = (req.body.firstname) ? `firstname='${req.body.firstname}',` : ""
    const lastname = (req.body.lastname) ? `lastname='${req.body.lastname}',` : ""
    const dateofbirth = (req.body.dateofbirth) ? `dateofbirth='${req.body.dateofbirth}',` : ""
    const number_of_indentification_document = (req.body.number_of_indentification_document) ? `number_of_indentification_document='${req.body.number_of_indentification_document}',` : ""
    const type_of_indentification_document = (req.body.type_of_indentification_document) ? `type_of_indentification_document='${req.body.type_of_indentification_document}',` : ""
    const issuing_authority = (req.body.issuing_authority) ? `issuing_authority='${req.body.issuing_authority}'` : ""

    const update_Customer = `UPDATE Customer SET ${firstname} ${lastname} ${dateofbirth} ${number_of_indentification_document} ${type_of_indentification_document} ${issuing_authority} WHERE NFC_ID=${NFC_ID};`
            
    const deletePhones = `DELETE FROM Customer_phones WHERE NFC_ID=${NFC_ID};`
    const deleteEmails = `DELETE FROM Customer_emails WHERE NFC_ID=${NFC_ID};`

    db.query(update_Customer, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            db.query(deletePhones, async (err2, rows) => {
                if(err2) res.status(400).send(err2.message) 
                else {
                    for (const phone of phones) {
                        db.query(`INSERT INTO Customer_phones VALUES (${NFC_ID},'${phone}');`)
                    }
                }
            })

            db.query(deleteEmails, async (err3, rows) => {
                if(err3) res.status(400).send(err3.message) 
                else {
                    for (const email of emails) {
                        db.query(`INSERT INTO Customer_emails VALUES (${NFC_ID},'${email}');`)
                    }
                }
            })
            res.send("Customer Updated Successfully")
        }
    })
}
exports.updateCustomer = updateCustomer


function deleteCustomer (req, res) {
    delete_Customer = `DELETE FROM Customer WHERE NFC_ID=${req.params.NFC_ID};`
    db.query(delete_Customer, (err, rows) => {
        if(err) res.status(400).send(err.message) 
        else {
            db.query(`DELETE FROM Customer_phones WHERE NFC_ID=${req.params.NFC_ID};`)
            db.query(`DELETE FROM Customer_emails WHERE NFC_ID=${req.params.NFC_ID};`)
            res.send("Customer Deleted Successfully")
        }
    })
}
exports.deleteCustomer = deleteCustomer
*/