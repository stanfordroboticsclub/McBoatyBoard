import {Component} from 'react';
import * as React from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import background from './assets/ims/palau.jpg'
import image from './assets/ims/robologonew.png'
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './legacy/serviceWorker';
import TopNavBar from './components/TopNavBar';
import SideNavBar from './components/SideNavBar';
import routes from "./assets/routes.js";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: background,
            logo: image,
            color: "black",
            hasImage: true,
        };
    }
    render() {
        return(
            <div className="wrapper">
                <TopNavBar/>
                <SideNavBar {...this.props} routes = {routes} logo={this.state.logo} image={this.state.image}
            color={this.state.color}
            hasImage={this.state.hasImage}/>
            </div>
    );
    }
}
export default Admin;