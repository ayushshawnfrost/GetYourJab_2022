import { Component } from 'react';
import logo from '../assets/Step_2.svg';
import "../_App.scss";
import NavBar from './NavBar';
// import Syringe from '../assets/doctor.svg';
// import particlesJS from 'particles.js'
// import CeterDetailsByPincode from './centerDetails' 
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class LandingComponent extends Component {
    state = {}

    // componentDidMount(){
    // particlesJS.load('particles-js', 'assets/particles.json', function() {
    //     console.log('callback - particles.js config loaded');
    //   });
    // }

    render() {
        return (

            <div className="centerStyle" >
                <NavBar></NavBar>
                {/* <CeterDetailsByPincode /> */}
                <div className="container" >
                    <div className="about">
                        <div className="aboutSection">
                            <h1>Search Your Nearest Vaccination Center</h1>

                        </div>
                        {/* <div className="gradient"> */}
                        {/* <img src={Syringe} alt=""/> */}
                        {/* </div> */}
                    </div>
                    <div className="landing_imp">
                        <Card className="landing_imp_card"
                        // style={{ 'maxWidth': '345',}}
                        style={{ 'width': '40rem' }}
                        >
                            <CardActionArea >
                                <CardMedia
                                    style={{ 'height': '22rem' }}
                                    image={logo}
                                    title="Contemplative Reptile"
                                />
                                <CardContent className="landing_imp_content" style={{ 'display': 'flex', 'flexDirection':'column', 'justifyContent':'center','alignItems':'center' }}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Win over Covid-19
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Get Your Vaccination Safely at the Time of Your Appointment
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                {/* <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button> */}
                            </CardActions>
                        </Card>
                    </div>
                    <div className="about">
                        <div className="aboutSection">
                            <h3>
                                {/* <br />Get a preview list of the nearest centers and check availability of vaccination slots */}
                                Goto 'Slots' on the top menu to find slots
                            </h3>

                        </div>
                    </div>

                    <footer className="footer">
                    </footer>
                </div>
            </div>
        );
    }
}

export default LandingComponent