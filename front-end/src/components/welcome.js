import React from 'react';
import NavBar from "./NavBar";
import DateFnsUtils from '@date-io/date-fns';
import {
    makeStyles,
    FormControl,
    InputLabel,
    Input,
    Box,
    Button,
    Paper
} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1
    },
    containerC: {
        paddingLeft: 80,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 40
    },
    containerN: {
        paddingLeft: 80,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 0
    },
    header: {
        paddingLeft: 35,
        paddingTop: 10
        //margin: 10
    },
    boxButton: {
        paddingLeft: theme.spacing(4)
    },
    button: {
        textTransform: 'none'
    }
}));


export default function Welcome() {

    const classes = useStyles();
    const history = useHistory();

    /***************************************************************************************
     * Visitors
     ***************************************************************************************/

    const findvisitorsSubmitHandler = event => {
        event.preventDefault();
        history.push(`/visits/` );
    }

    /***************************************************************************************
     * Covid-19
     ***************************************************************************************/

    const covidSubmitHandler = event => {
        event.preventDefault();
        history.push(`/covid/` );
    }


    /***************************************************************************************
     * Most Used
     ***************************************************************************************/

    const most_usedSubmitHandler = event => {
        event.preventDefault();
        history.push(`/most_used/` );
    }


    return (


        <div className={classes.root}>
            <NavBar/>

            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Find Visitors </h3>
                    </div>
                    <form autoComplete="off" onSubmit={findvisitorsSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={findvisitorsSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>

            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Track Exposed Customer </h3>
                    </div>
                    <form autoComplete="off" onSubmit={covidSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={covidSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>


            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Statistics </h3>
                    </div>
                    <form autoComplete="off" onSubmit={most_usedSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={most_usedSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>

        </div>

    )
        ;
}