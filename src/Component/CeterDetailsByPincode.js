import { Component, Fragment } from 'react';
import axios from 'axios';
import Moment from 'moment';
// import Center from './center';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
// import NavBar from './NavBar';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import { TabPanel } from './TabPanel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Chip from '@mui/material/Chip';
// import Box from '@mui/material/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

class CeterDetailsByPincode extends Component {
  constructor(props) {
    super(props)
    this.state = {
      centerDetails: [],
      pincode: "",
      selectedDate: new Date(),
      value: 0,
      dialogueSuccess: false,
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
        this.setState({ 
          centerDetails: response.data.sessions, 
          dialogueSuccess: response.data.sessions.length === 0 ? false : true, 
          dialogueError: response.data.sessions.length === 0 ? true : false  
        });
      })
      .catch((err) => {
        this.setState({ dialogueError: true });
        console.log(err);
      });
  }

  handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  };

  render() {
    return (
      <Fragment>

        <div className="formAlignCenter">
          <div className="form-card" >
            <h1>SEARCH YOUR NEAREST VACCINATION CENTER</h1>
            <h5>you can put any 6 digit pincode eg:482001 </h5>
            <form onSubmit={this.getCenterDetails}>
              <TextField className="cityCenter same-width" label="Pincode" onChange={(e) => this.setState({ pincode: e.target.value })} />
              <br></br>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Select Date"
                  value={this.state.selectedDate}
                  onChange={this.handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
              <div className="button submit">
                <Button onClick={this.getCenterDetails} className="otpButton" variant="contained" disabled={this.state.pincode.length !== 6}>Serach For Center</Button>
              </div>
            </form>
          </div>
          {this.state.centerDetails.length > 0 && <div className="card">
            {/* <DataTable
              value={this.state.centerDetails}
              id="data-table"
              style={{
              }}>
              <Column field="vaccine" header="Vaccine"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="min_age_limit" header="Min Age"></Column>
              <Column field="available_capacity_dose1" header="DOSE-I Available No."></Column>
              <Column field="available_capacity_dose2" header="DOSE-II Available No."></Column>
              <Column field="address" header="Address"></Column>
              <Column field="fee_type" header="Fees" ></Column>
            </DataTable> */}
            {this.state.centerDetails.map((item) => (<Accordion style={{ color: 'black', background: 'rgb(204, 213, 174)', margin: '0px' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{item.name}  <Chip label={item.vaccine} /></Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <tr>
                      <td style={{ 'textAlign': 'center', border: '1px solid black', background: '#588157' }}> <strong>Address </strong> </td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black', background: '#588157' }}> <strong>Min Age </strong> </td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black', background: '#588157' }}> <strong>DOSE-I </strong> </td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black', background: '#588157' }}> <strong>DOSE-II </strong> </td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black', background: '#588157' }}> <strong>Fee </strong> </td>
                    </tr>

                    <tr>
                      <td style={{ 'textAlign': 'center', border: '1px solid black' }}>{item.address}</td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black' }}>{item.min_age_limit}</td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black' }}>{item.available_capacity_dose1}</td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black' }}>{item.available_capacity_dose2}</td>
                      <td style={{ 'textAlign': 'center', border: '1px solid black' }}>{item.fee_type}</td>
                    </tr>
                  </table>
                </Typography>
              </AccordionDetails>
            </Accordion>))}
          </div>}
        </div>
        <Snackbar open={this.state.dialogueSuccess} autoHideDuration={3000} onClose={() => { this.setState({ dialogueSuccess: false }) }}>
          <MuiAlert elevation={6} variant="filled" onClose={() => { this.setState({ dialogueSuccess: false }) }} severity="success">
            Slots found!
          </MuiAlert>
        </Snackbar>
        <Snackbar open={this.state.dialogueError} autoHideDuration={3000} onClose={() => { this.setState({ dialogueError: false }) }}>
          <MuiAlert elevation={6} variant="filled" onClose={() => { this.setState({ dialogueError: false }) }} severity="error">
            No Slots Found!
          </MuiAlert>
        </Snackbar>
      </Fragment >
    );
  }
}

export default CeterDetailsByPincode;