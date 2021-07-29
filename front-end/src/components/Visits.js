import React from 'react';
import NavBar from "./NavBar";
import DateFnsUtils from '@date-io/date-fns';
//import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    button: {
        textTransform: 'none'
    }
}));

function conversion(date){
    if (date === ''){
        return null
    }
    else {
        const foo = date.split('/')
        const day = foo[0]
        const month = foo[1]
        const year = foo[2]
        return [year+'-'+month+'-'+day]
    }
}
function convertInts(Number){
    if (Number === ''){
        return null
    }else{
        return Number
    }
}
function convertMustReturn(something){
    if (something === ''){
        return null
    }else{
        return something
    }
}

export default function Visits() {

    const classes = useStyles();
    const history = useHistory();

    /***************************************************************************************
     * Visits
     ***************************************************************************************/
    const [service, setService] = React.useState(null);
    const handleService = event => {
        setService(event.target.value);
    }


    const [date, setDate] = React.useState('');
    const handleDate = event => {
        setDate(event.target.value);
    }
    const [mustRegistered, setMustRegistered] = React.useState('');
    const handleMustRegistered = event => {
        setMustRegistered(event.target.value);
    }
    const [cost, setCost] = React.useState('');
    const handleCost = event => {
        setCost(event.target.value);
    }
    const visitsSubmitHandler = event => {
        event.preventDefault();
        history.push(`/visitsResults/` + service + `/` + convertInts(cost) + '/' + conversion(date) + `/` + convertMustReturn(mustRegistered));
    }


    return (


        <div className={classes.root}>
            <NavBar/>

            <div className={classes.containerC}>
                <Paper elevation={6} className={classes.paper}>
                    <div className={classes.header}>
                        <h3>Visits </h3>
                    </div>
                    <form autoComplete="off" onSubmit={visitsSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">

                            <Box p={2}>


                                <FormControl className={classes.formControl}>
                                    <InputLabel id="Service">Service ID</InputLabel>
                                    <Select
                                        labelId="Service"
                                        id="service"
                                        value={service}
                                        onChange={e => handleService(e)}
                                    >
                                        <MenuItem value={0}>Room</MenuItem>
                                        <MenuItem value={1}>Bar</MenuItem>
                                        <MenuItem value={2}>Restaurant</MenuItem>
                                        <MenuItem value={3}>Hair Salon</MenuItem>
                                        <MenuItem value={4}>Gym</MenuItem>
                                        <MenuItem value={5}>Conference Room</MenuItem>
                                        <MenuItem value={6}>Sauna</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>



                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="foo" shrink={true}>Must Registered</InputLabel>
                                    <Input required={false} id="must_registered" type="string"
                                           value={mustRegistered}
                                           onChange={e => handleMustRegistered(e)}/>
                                </FormControl>
                            </Box>

                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="date" shrink={true}>Date</InputLabel>
                                    <Input required={false} id="date" type="string"
                                           value={date}
                                           onChange={e => handleDate(e)}/>
                                </FormControl>
                            </Box>

                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="cost" shrink={true}>Cost</InputLabel>
                                    <Input required={false} id="cost" type="number"
                                           value={cost}
                                           onChange={e => handleCost(e)}/>
                                </FormControl>
                            </Box>

                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={visitsSubmitHandler}>
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