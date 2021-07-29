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
    Typography, Box, FormControl, InputLabel, Input, Button
} from "@material-ui/core";
import axios from "axios";
import NavBar from "./NavBar";
import {useHistory} from "react-router-dom";

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
    containerC: {
        paddingLeft: 40,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 0
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
                    <Typography variant="h5">Exposed Areas </Typography>
                </Toolbar>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'><b>Room ID</b></TableCell>
                            <TableCell align='left'><b>Service</b></TableCell>
                            <TableCell align='left'><b>Time of Entrance</b></TableCell>
                            <TableCell align='left'><b>Time of Exit</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(session => (
                            <TableRow key={session.SessionID}>
                                <TableCell>{session.hotel_room_ID}</TableCell>
                                <TableCell>{session.name_of_the_room}</TableCell>
                                <TableCell>{moment(new Date(session.date_time_of_entrance)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                                <TableCell>{moment(new Date(session.date_time_of_exit)).format("HH:mm:ss.SSS A on D MMM YYYY")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default function ExposedAreas() {
    const classes = useStyles();
    const history = useHistory();

    const findSuspectsSubmitHandler = event => {
        event.preventDefault();
        history.push(`/find_covid_suspects/` + Id );
    }

    const path = window.location.pathname;

    const foo = path.split('/')
    const Id = foo[2]

    const [data, setData] = React.useState(
        [
            {
                hotel_room_ID: 0,
                name_of_the_room: '',
                date_time_of_entrance: '',
                date_time_of_exit: '',
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/db/api/tracking/' + Id;
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
            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>  Find Possibly Exposed Customers </h3>
                    </div>
                    <form autoComplete="off" onSubmit={findSuspectsSubmitHandler}>
                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={findSuspectsSubmitHandler}>
                                    Find
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>
        </div>
    )
}