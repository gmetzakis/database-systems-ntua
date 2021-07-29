import React, {useEffect} from 'react';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Typography,
    Grid,
    IconButton, Collapse, Box
} from "@material-ui/core";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import axios from "axios";
import NavBar from "./NavBar";
import moment from "moment";


const useStyles = makeStyles(theme => ({
    root: {
        //width: '100%',
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 20,
        paddingBottom: 40
    },
    paper: {
        marginTop: theme.spacing(1),
        //width: '100%',
        overflowX: 'auto',
        marginBottom: theme.spacing(1),
    },
    table: {
        //width: 330,
    },
    bar: {
        paddingTop: 10,
        paddingBottom: 20
    },
}));

export default function MoreCustomersInfo() {

    const classes = useStyles();
    const path = window.location.pathname;
    const foo = path.split('/')
    const NFCId = foo[2]

    const [data, setData] = React.useState(

        [
            {
                NFC_ID: 0,
                firstname: '',
                lastname: '',
                dateofbirth: '',
                number_of_indentification_document: '',
                type_of_indentification_document: '',
                issuing_authority: '',
                phone1: '',
                phone2: '',
                email1: '',
                email2: '',
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/db/api/customers/' + NFCId ;
        axios.get(url, {
            headers: {
            }
        }).then(response => {
            setData(response.data);
        })
    }

    const fooPhone = data.phone2
    const fooEmail = data.email2
    let finalPhone = ''
    let finalEmail = ''
    if (fooPhone !== ' '){
        finalPhone = ',' + fooPhone
    } else {
        finalPhone = fooPhone
    }
    if (fooEmail !== ' '){
        finalEmail = ',' + fooEmail
    } else {
        finalEmail = fooEmail
    }

    return (
        <div>
            <NavBar/>
            <div className={classes.root}>
                <Paper className={classes.paper} elevation={9}>
                    <Toolbar className={classes.bar}>
                        <Grid container direction="column">
                            <Grid item xs>
                                <Typography variant="h7">NFC ID: <b>{data.NFC_ID}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">First Name: <b>{data.firstname}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Last Name: <b>{data.lastname}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Date Birth: <b>{moment(new Date(data.dateofbirth)).format(" D MMM YYYY")}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Type of Identification Document: <b>{data.type_of_indentification_document}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Number of Identification Document: <b>{data.number_of_indentification_document}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Issuing Authority: <b>{data.issuing_authority}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Phone(s): <b>{data.phone1 + finalPhone}</b></Typography>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h7">Email(s): <b>{data.email1 + finalEmail}</b></Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>

                </Paper>
            </div>
        </div>
    )
}