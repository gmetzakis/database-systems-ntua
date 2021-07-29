import React, {useEffect} from 'react';
import moment from 'moment';
import {
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import axios from "axios";
import NavBar from "./NavBar";

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
        justifyContent: 'center',
    },
}));

const SPTable = ({list}) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={9}>
                <Toolbar className={classes.bar}>
                    <Typography variant="h5">Possibly Exposed Customers </Typography>
                </Toolbar>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'><b>Possibly Exposed Customer's NFC ID</b></TableCell>
                            <TableCell align='left'><b>Exposed Room ID</b></TableCell>
                            <TableCell align='left'><b>Time of Entrance</b></TableCell>
                            <TableCell align='left'><b>Time of Exit</b></TableCell>
                            <TableCell align='left'><b>Possibly Exposed From Customer With NFC ID</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(session => (
                            <TableRow key={session.SessionID}>
                                <TableCell>{session.Possibly_exposed_customer_ID}</TableCell>
                                <TableCell>{session.Exposed_room_ID}</TableCell>
                                <TableCell>{moment(new Date(session.date_time_of_entrance)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                                <TableCell>{moment(new Date(session.date_time_of_exit)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                                <TableCell>{session.Possibly_Exposed_From_Customer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default function FindCovidSuspects() {
    const path = window.location.pathname;

    const foo = path.split('/')
    const CustomerId = foo[2]


    const [data, setData] = React.useState(
        [
            {
                Possibly_exposed_customer_ID: 0,
                Exposed_room_ID: 0,
                date_time_of_entrance: '',
                date_time_of_exit: '',
                Possibly_Exposed_From_Customer: 0,
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/db/api/detectCovid/' + CustomerId ;
        axios.get(url, {
            headers: {
            }
        }).then(response => {
            setData(response.data);
        })
    }

    return (
        <div>
            <NavBar/>
            <SPTable list={data}/>
        </div>
    )
}