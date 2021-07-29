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
                    <Typography variant="h5">Most Used Areas </Typography>
                </Toolbar>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'><b>Room ID</b></TableCell>
                            <TableCell align='left'><b>Service</b></TableCell>
                            <TableCell align='left'><b>Position</b></TableCell>
                            <TableCell align='left'><b>No. of People Visited</b></TableCell>
                            <TableCell align='left'><b>Age Group</b></TableCell>
                            <TableCell align='left'><b>Timeframe</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(session => (
                            <TableRow key={session.SessionID}>
                                <TableCell>{session.hotel_room_ID}</TableCell>
                                <TableCell>{session.name_of_the_room}</TableCell>
                                <TableCell>{session.description_of_position}</TableCell>
                                <TableCell>{session.NO_of_People_visited}</TableCell>
                                <TableCell>{session.AGE_GROUP}</TableCell>
                                <TableCell>{session.TIMEFRAME}</TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default function MostUsedAreas() {

    const [data, setData] = React.useState(
        [
            {
                hotel_room_ID: 0,
                name_of_the_room: '',
                description_of_position: '',
                NO_of_People_visited: 0,
                AGE_GROUP: '',
                TIMEFRAME: '',
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/db/api/mostUsedRooms';
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