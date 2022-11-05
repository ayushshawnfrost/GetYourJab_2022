import { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import LoginForm from './loginForm';
import axios from "axios";
import { sha256 } from "js-sha256";
import NavBar from './NavBar';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
class FormComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phoneNo: "",
            txnId: "",
            Otp: "",
            token: "",
            dialogue: false
        }
    }

    onChangePhoneNo = (phoneNo) => {
        ;
        console.log(phoneNo)
    }

    login = async () => {
        // e.preventDefault();
        const otp = this.state.Otp;
        const cnfOTPPayload = {
            otp: sha256(otp),
            txnId: this.state.txnId,
        };
        axios
            .post(
                "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
                cnfOTPPayload
            )
            .then((response) => {
                this.setState({ token: response.data.token });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    onDownload = (e) => {
        e.preventDefault();
        const beneficiaryCode = "85584425547020"
        // e.target.elements.beneficiaryCode.value;
        const config = {
            // headers: { Authorization: `Bearer ${this.state.token}`,accept: application/"json", "text/plain" }
        };
        axios
            .post(
                `https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=${beneficiaryCode}`,
                config
            )
            .then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data], { type: "application/pdf" }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }
    getOtp = async (e) => {
        e.preventDefault();
        console.log(e)
        // const mobileNumber = e.target.elements.mobNo.value;
        const requestOptions = {
            mobile: this.state.phoneNo,
        };
        axios
            .post(
                "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
                requestOptions
            )
            .then((response) => {
                this.setState({ txnId: response.data.txnId });
                console.log(response);
            })
            .catch((err) => {
                this.setState({ dialogue: true })
            });
    };
    render() {
        return (
            <Fragment>
                <NavBar></NavBar>
                <div className="form-card" >
                    <div className="formAlignCenter">
                        <h1 style={{ color: 'black' }}>Login through your mobile number.</h1>
                        <form >
                            <div className="otpForm">
                                <TextField
                                    className="otpForm"
                                    label="Mobile No."
                                    onChange={(e) => this.setState({ phoneNo: e.target.value })}
                                // error
                                // helperText="Incorrect entry." 
                                />
                            </div>
                            <div className="button submit">
                                <Button onClick={(e) => this.getOtp(e)} className="otpButton" variant="contained" disabled={this.state.phoneNo.length < 10}>Generate OTP</Button>
                            </div>
                        </form>
                        {this.state.txnId.length > 0 && <form onSubmit={this.props.login}>
                            <TextField className="loginForm" label="Your OTP" onChange={(e) => this.setState({ Otp: e.target.value })} />
                            <br></br>
                            <Button onClick={(e) => this.login(e)} className="otpButton" variant="contained" disabled={this.state.phoneNo.length < 6}>Login</Button>
                        </form>}
                        {/* <button onClick={this.onDownload}>download</button> */}
                    </div>
                    <Snackbar open={this.state.dialogue} autoHideDuration={2000} onClose={() => { this.setState({ dialogue: false }) }}>
                        <MuiAlert elevation={6} variant="filled" onClose={() => { this.setState({ dialogue: false }) }} severity="error">
                            oopse! Unable to send the OTP
                        </MuiAlert>
                    </Snackbar>
                </div>
            </Fragment>
        );
    }
}

export default FormComponent;