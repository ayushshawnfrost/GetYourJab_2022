import { Component } from 'react';
import axios from "axios";

class BeneficiaryDetails extends Component {
    state = { beneficiaryDetails : null, }

    componentDidMount(){
             const config = {
              headers: { Authorization: `Bearer ${this.props.token}` },
            };
            axios
              .get(
                `https://cdndemo-api.co-vin.in/api/v2/appointment/beneficiaries`,
                 config
              )
              .then((response) => {
                this.setState({beneficiaryDetails : JSON.stringify(response.data)})
              })
              .catch((err) => {
                console.log(err);
              });
    }
    render() {
        return (
            <div>
                {this.state.beneficiaryDetails}
            </div>
        );
    }
}

export default BeneficiaryDetails;