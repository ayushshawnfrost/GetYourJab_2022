import { Component } from 'react';

class certificateDownload extends Component {
    state = {  }
    render() {
        return (
            <div className="formAlignCenter">
            <form onSubmit={this.props.onDownload}>
                <div className="Certificate"><input type="text" className="beneficiaryCode" name="beneficiaryCode" placeholder="Type BeneficiaryCode" /></div>
                <div className="button submit"><button className="download">Download certificate</button></div>
            </form>
        </div>
        );
    }
}

export default certificateDownload;