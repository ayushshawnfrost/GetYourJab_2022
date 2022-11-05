import { Component, Fragment } from 'react';
import axios from 'axios';
import Moment from 'moment';
// import Center from './center';
// import TextField from '@material-ui/core/TextField';
// import DateFnsUtils from '@date-io/date-fns';
// import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import {
//     MuiPickersUtilsProvider,
//     // KeyboardTimePicker,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
import { TabPanel } from './TabPanel';
import CeterDetailsByPincode from './CeterDetailsByPincode';
import GetCenterByDistrict from './GetCenterByDistrict';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class GetCenterBy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            centerDetails: [],
            pincode: "",
            selectedDate: new Date(),
            value: 0,
            dialogueError: false
        }
    }
    getCenterDetails = (e) => {
        e.preventDefault();
        // const pinCode = e.target.elements.pincode.value;
        // const date = e.target.elements.date.value;
        const dateDMY = Moment(this.state.selectedDate).format('DD-MM-YYYY');
        axios
            .get(
                `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${this.state.pincode}&date=${dateDMY}`
            )
            .then((response) => {
                this.setState({ centerDetails: response.data.sessions })
            })
            .catch((err) => {
                console.log(err);
            });
    }

    handleDateChange = (date) => {
        this.setState({ selectedDate: date });
    };

    handleChange = (event, newValue) => {
        this.setState({ value: newValue, dialogueError: newValue === 2 ? true : false });
        console.log(this.state.value)
    };

    a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <AppBar position="static" >
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        aria-label="simple tabs example"
                        centered
                        textColor="secondary"
                        indicatorColor="secondary">
                        <Tab label="By Pincode" {...this.a11yProps(0)} />
                        <Tab label="By District" {...this.a11yProps(1)} />
                        <Tab label="Search by MAP" {...this.a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={this.state.value} index={0}>
                    <CeterDetailsByPincode />
                </TabPanel>
                <TabPanel value={this.state.value} index={1}>
                    <GetCenterByDistrict />
                </TabPanel>
                <TabPanel value={this.state.value} index={2}>
                    Work in Progress stay tuned!
                    <Snackbar open={this.state.dialogueError} autoHideDuration={3000} onClose={() => { this.setState({ dialogueError: false }) }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => { this.setState({ dialogueError: false }) }} severity="warning">
                            Work in Progress stay tuned!
                        </MuiAlert>
                    </Snackbar>
                </TabPanel>
            </Fragment >
        );
    }
}

export default GetCenterBy;