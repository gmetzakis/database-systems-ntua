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

export default function Sessions() {

    const classes = useStyles();
    const history = useHistory();

    /***************************************************************************************
     * Most Used Areas
     ***************************************************************************************/

    const mostUsedAreasSubmitHandler = event => {
        event.preventDefault();
        history.push(`/mostUsedAreas/` );
    }

    /***************************************************************************************
     * Most frequently Services
     ***************************************************************************************/

    const mostFreqServSubmitHandler = event => {
        event.preventDefault();
        history.push(`/mostFreqServ/` );
    }

    /***************************************************************************************
     * MMost Used Services
     ***************************************************************************************/

    const mostUsedServSubmitHandler = event => {
        event.preventDefault();
        history.push(`/mostUsedServ/` );
    }

    return (


        <div className={classes.root}>
            <NavBar/>

            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Most Used Areas </h3>
                    </div>
                    <form autoComplete="off" onSubmit={mostUsedAreasSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={mostUsedAreasSubmitHandler}>
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
                        <h3>Most frequently Used Services </h3>
                    </div>
                    <form autoComplete="off" onSubmit={mostFreqServSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={mostFreqServSubmitHandler}>
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
                        <h3>Most Used Services</h3>
                    </div>
                    <form autoComplete="off" onSubmit={mostUsedServSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">
                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={mostUsedServSubmitHandler}>
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