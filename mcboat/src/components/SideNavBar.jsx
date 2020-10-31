import React, { Component } from "react";
import "../assets/css/SideNavBar.css";
import { NavLink } from "react-router-dom";


class SideNavBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        };
    }
    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
    }
    updateDimensions() {
        this.setState({ width: window.innerWidth });
    }
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    render() {
        const sidebarBackground = {
            backgroundImage: "url(" + this.props.image + ")"
        };
        return (
            <div
                id="sidebar"
                className="sidebar"
                data-color={this.props.color}
                data-image={this.props.image}
            >

                <div className="sidebar-background" style={sidebarBackground} />

                <div className="logo">
                    <a
                        href=""
                        className="simple-text logo-mini"
                    >
                        <div className="logo-img">
                            <img src={this.props.logo} alt="logo_image" />
                        </div>
                    </a>
                    <a
                        href=""
                        className="simple-text logo-normal"
                    >
                        Boat Dashboard
                    </a>
                </div>
                <div className="sidebar-wrapper">
                    <ul className="nav">
                        {this.props.routes.map((prop, key) => {
                            if (!prop.redirect)
                                return (
                                    <li
                                        className={this.activeRoute(prop.layout + prop.path)}
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.layout + prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={prop.icon} />
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
export default SideNavBar;