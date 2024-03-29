/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import { style } from "variables/Variables.jsx";

import routes from "../routes";

import image from "assets/img/sidebar-3.jpg";

import { w3cwebsocket as W3CWebSocket } from "websocket";



class Admin extends Component {
  is_mounted = false;
  constructor(props) {
    super(props);
    const client = new W3CWebSocket('ws://localhost:9999/');
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      messages: [],
      fixedClasses: "dropdown show-dropdown open",
      client: client,
      recent: "",
      databaseRecent:  '{{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : 0, "battery" : 100},{}}',
      logs: []
    };

    console.log("Websocket something");
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onclose = () => {
      console.log("WebSocket closed");
    };
    // client.onmessage = (message) => {
    //   this.state.messages.push(message.data);
    //   console.log("received message");
    //   console.log(message.data);
    // };
    this.state.client.onmessage = async (message) => {
      if(this.is_mounted) {
        this.setState((prevState, props) => {
        prevState.logs.push(message.data.toString());
        prevState.recent = message.data.toString();
        //console.log("On Message: ", message.data);
        return {
          logs: prevState.logs,
          recent: prevState.recent
        }
      });
        const response = await fetch('http://localhost:5000/api/push', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: message.data.toString(),
          mode: "cors",
        });
        const body = await response.text();

        // this.setState({responseToPost: body});
        // console.log("Response from server: ", this.state.responseToPost);
      }
    };
    this.handler = this.handler.bind(this);
  }
  handler() {
    this.setState({
      databaseRecent: this.state.databaseRecent
    })
  }

  updateLocal = () => {
    if (this.is_mounted) {
      this.callApi()
          .then(res => this.setState({databaseRecent: res.express}))
          .catch(err => console.log(err));
      console.log(this.state.databaseRecent);
      let currentThis = this;
      currentThis.setState((prevState, props) => {
       // console.log("Database Recent: ", prevState.databaseRecent);
        console.log("Length: ", this.state.databaseRecent.length);
        if(this.state.databaseRecent.length > 1 && this.state.databaseRecent.length !== 88) {
          prevState.databaseRecent.sort(function(a, b){
            return parseFloat(a.time) - parseFloat(b.time);
          });
        }
        return {
          databaseRecent: prevState.databaseRecent
        }
      });
      console.log("Received: ", this.state.databaseRecent[this.state.databaseRecent.length - 1]['time']);
      //console.log("Length: ", this.state.databaseRecent.length);
    }
    else {
      console.log("not mounted");
    }
  };
  callApi = async () => {
    if (this.is_mounted) {
      const response = await fetch('http://localhost:5000/api/get');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    }
  };

  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Boat Dashboard</b>
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 10
    });
  };

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                messages = {this.state.messages}
                client = {this.state.client}
                handleClick={this.handleNotificationClick}
                handleNewLog = {this.handleNewLog}
                logs = {this.state.logs}
                databaseRecent = {this.state.databaseRecent}
                handler = {this.handler}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.is_mounted = true;
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Boat Dashboard</b>
        </div>
      ),
      level: level,
      position: "tr",
      autoDismiss: 15
    });
    setInterval(this.updateLocal, 2000);
    console.log("Set interval for updating");
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  render() {
    return (
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}
        messages = {this.state.messages}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            client = {this.state.client}
            messages = {this.state.messages}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {

            this.state.messages.map((message, index) => {
              return <div key={index}>{message}</div>
            })
          }
          <Footer />
          {/*<FixedPlugin*/}
          {/*  handleImageClick={this.handleImageClick}*/}
          {/*  handleColorClick={this.handleColorClick}*/}
          {/*  handleHasImage={this.handleHasImage}*/}
          {/*  bgColor={this.state["color"]}*/}
          {/*  bgImage={this.state["image"]}*/}
          {/*  mini={this.state["mini"]}*/}
          {/*  handleFixedClick={this.handleFixedClick}*/}
          {/*  fixedClasses={this.state.fixedClasses}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

export default Admin;
