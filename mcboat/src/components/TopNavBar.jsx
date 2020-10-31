import React, { Component } from "react";
import { Navbar, NavItem} from "react-bootstrap";
import * as Icon from "react-bootstrap-icons"
import roboLogo from "../assets/ims/robologonew.png";
import '../assets/css/TopNavBar.css';
class TopNavBar extends React.Component {
    render() {
        return(
        <Navbar bg="dark">
            <Navbar.Brand className="navbarBrand" href="#">
                {/*<img*/}
                {/*    src={roboLogo}*/}
                {/*    width="50"*/}
                {/*    height="50"*/}
                {/*/>*/}
            </Navbar.Brand>
            <NavItem href="#" className="top-nav-bar">
                <b className="Title">Boat Dashboard</b>
            </NavItem>
        </Navbar>
        );
    }
}
export default TopNavBar;