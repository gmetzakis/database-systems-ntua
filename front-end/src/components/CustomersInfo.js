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
    containerC: {
        paddingLeft: 40,
        paddingRight: 80,
        //width: '80%',
        paddingTop: 0
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
                    <Typography variant="h5">Customers Information </Typography>
                </Toolbar>
                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align='left'><b>NFC ID</b></TableCell>
                            <TableCell align='left'><b>First Name</b></TableCell>
                            <TableCell align='left'><b>Last Name</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list && list.map(session => (
                            <TableRow key={session.SessionID}>
                                <TableCell>{session.NFC_ID}</TableCell>
                                <TableCell>{session.firstname}</TableCell>
                                <TableCell>{session.lastname}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default function CustomersInfo() {

    const classes = useStyles();
    const history = useHistory();

    const [NFCid, setNFCId] = React.useState(null);
    const handleNFCId = event => {
        setNFCId(event.target.value);
    }
    const NFCidSubmitHandler = event => {
        event.preventDefault();
        history.push(`/NFCinfo/` + NFCid );
    }

    const path = window.location.pathname;

    const foo = path.split('/')
    const Id = foo[2]

    const [data, setData] = React.useState(
        [
            {
                NFC_ID: 0,
                firstname: '',
                lastname: '',
            }
        ]
    );

    useEffect(() => {
        loadData();
    }, [])

    const loadData = async () => {

        const url = 'http://localhost:8765/db/api/customers/';
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
                        <h3>  Insert the Customer NFC ID </h3>
                    </div>
                    <form autoComplete="off" onSubmit={NFCidSubmitHandler}>

                        <Box display="flex" flexDirection="row" p={2} m={2} bgcolor="background.paper">

                            <Box p={2}>
                                <FormControl margin="normal" fullWidth>
                                    <InputLabel htmlFor="Id" shrink={true}>ID</InputLabel>
                                    <Input required={false} id="Id" type="number"
                                           value={NFCid}
                                           onChange={e => handleNFCId(e)}/>
                                </FormControl>
                            </Box>

                            <Box className={classes.boxButton} p={1} m={1}>
                                <Button className={classes.button} variant="contained" color="primary" type="submit"
                                        onSubmit={NFCidSubmitHandler}>
                                    Search
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Paper>
            </div>
        </div>
    )
}