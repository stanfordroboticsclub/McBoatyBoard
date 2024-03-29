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
import ChartistGraph from "react-chartist";
import {Grid, Row, Col, NavItem} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  responsiveSales,
  legendSales,
  voltageChart,
  mockVoltageData
} from "variables/Variables.jsx";

import 'react-animated-term/dist/react-animated-term.css'

import config from "../assets/config";
import firebase from "firebase";

var localLogs = ['{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : "", "battery" : "100"}',
  '{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : "", "battery" : "100", "px" : "1", "py" : "2"}'];
var oneLog = '{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : "", "battery" : "100"}';
class Dashboard extends Component {
  is_mounted = false;
  constructor(props) {

    if(!firebase.apps.length) { firebase.initializeApp(config) };
    super(props);
    this.state = {
      client: props.client
    };
    this.state = {
      logs: ['{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : "", "battery" : "100"}'],
      recent: '{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : "", "battery" : "100"}',
      databaseRecent: '{{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : 0, "battery" : 100},' +
          '{"lat" : "38", "long": "-123", "velocity" : "", "orientation" : 0, "battery" : 100}}',
      velocityRaw: [],
      velocityData: {
        labels: [      ],
        series:[]
      },
      responseToPost: ""
    };


  }
 // Writes User Data
 //  writeUserData = () => {
 //    if (this.is_mounted) {
 //      const db = firebase.firestore();
 //      var time = new Date();
 //      var stringTime = time.getTime().toString();
 //      db.collection("data").doc(stringTime).set({
 //        time: stringTime,
 //        raw: this.state.recent,
 //        lat: JSON.parse(this.state.recent).lat,
 //        long: JSON.parse(this.state.recent).long,
 //        velocity: JSON.parse(this.state.recent).velocity,
 //        orientation: JSON.parse(this.state.recent).orientation,
 //        battery: JSON.parse(this.state.recent).battery
 //      });
 //    }
 //  };

  //Delete x amount of documents
  // deleteDocuments = () => {
  //   const db = firebase.firestore();
  //   var size = 0;
  //   var deleteSize = 0;
  //
  //   db.collection("data").orderBy("time", "asc").limit(100)
  //       .get()
  //       .then(function (querySnapshot) {
  //         var counter = querySnapshot.size.valueOf();
  //         querySnapshot.forEach(function (doc) {
  //             if (counter > 10) {
  //               counter--;
  //               db.collection("data").doc(doc.id).delete().then(function () {
  //                 console.log("Document successfully deleted!");
  //               }).catch(function (error) {
  //                 console.error("Error removing document: ", error);
  //               });
  //             }
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log("Error getting documents: ", error);
  //       });
  // };

  // getData = () => {
  //   if(this.is_mounted) {
  //     let currentThis = this;
  //     const db = firebase.firestore();
  //     db.collection("data").orderBy("time", "desc").limit(1)
  //         .get()
  //         .then(function (querySnapshot) {
  //           querySnapshot.forEach(function (doc) {
  //             // doc.data() is never undefined for query doc snapshots
  //             //console.log(doc.id, " => ", doc.data());
  //             currentThis.setState((prevState, props) => {
  //               prevState.databaseRecent = doc.data();
  //               //console.log("Saved Database Get Data to React State", prevState.databaseRecent);
  //               return {
  //                 databaseRecent: prevState.databaseRecent
  //               }
  //             });
  //           });
  //         })
  //         .catch(function (error) {
  //           console.log("Error getting documents: ", error);
  //         });
  //   }
  // };
  // update = () => {
  //   this.getData();
  //   this.deleteDocuments();
  //   this.updateVelocityGraph();
  // };

  //JSON.stringify({post: this.state.recent})

  componentWillMount() {
    this.is_mounted = true;
    setInterval(this.updateGraphLocal, 2000);
    console.log("Mounted", this.is_mounted);
  }

  componentWillUnmount() {
    this.is_mounted = false;
    console.log("Component unmounting...")
  }
  updateGraphLocal = () => {
    if(this.is_mounted) {
      let currentThis = this;

      currentThis.setState((prevState, props) => {
        var i = 0;
        var series2 = [];
        var series3 = [];
        for (i = 0; i < props.databaseRecent.length - 1; i++) {
          series3.push(i);
          series2.push(props.databaseRecent[i]['velocity']);
        }
        prevState.velocityData = {
          labels: series3,
          series: [series2]

        };
        return {
          velocityRaw: prevState.velocityRaw,
          velocityData: prevState.velocityData
        }
      });
    }
  };
  // updateVelocityGraph = () => {
  //   if(this.is_mounted) {
  //     let currentThis = this;
  //     const db = firebase.firestore();
  //     currentThis.setState((prevState, props) => {
  //       prevState.velocityRaw = [];
  //       return {
  //         velocityRaw: prevState.velocityRaw
  //       }
  //     });
  //     db.collection("data").orderBy("time", "asc").limit(10)
  //         .get()
  //         .then(function (querySnapshot) {
  //           querySnapshot.forEach(function (doc) {
  //             currentThis.setState((prevState, props) => {
  //               prevState.velocityRaw.push(doc.data()['velocity']);
  //               console.log("Velocity raw: " + prevState.velocityRaw);
  //               var i;
  //               var temp = [];
  //               for (i = 0; i < prevState.velocityRaw.length; i++) {
  //                 temp.push(prevState.velocityRaw[i]);
  //               }
  //               prevState.velocityData = {
  //                 labels: [doc.data()['velocity'], prevState.velocityRaw[0], 3, 4, 5, 6, 7, 8, 9, 10],
  //                 series: [[Number(prevState.velocityRaw[0]), Number(prevState.velocityRaw[1]), Number(prevState.velocityRaw[2]),
  //                   Number(prevState.velocityRaw[3]), Number(prevState.velocityRaw[4]),
  //                   Number(prevState.velocityRaw[5]), Number(prevState.velocityRaw[6]), Number(prevState.velocityRaw[7]),
  //                   Number(prevState.velocityRaw[8]), Number(prevState.velocityRaw[9])]
  //                 ]
  //               };
  //               return {
  //                 velocityRaw: prevState.velocityRaw,
  //                 velocityData: prevState.velocityData
  //               }
  //             });
  //           });
  //         })
  //         .catch(function (error) {
  //           console.log("Error getting documents: ", error);
  //         });
  //   }
  // };


  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Col>

            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-battery text-warning" />}
                statsText="Battery"
                statsValue= {this.props.databaseRecent[this.props.databaseRecent.length - 1]['battery']}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-map-2 text-success" />}
                statsText="Latitude"
                statsValue={this.props.databaseRecent[this.props.databaseRecent.length - 1]['lat']}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="pe-7s-map-2 text-success" />}
                  statsText="Longitude"
                  statsValue={this.props.databaseRecent[this.props.databaseRecent.length - 1]['long']}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                  bigIcon={<i className="pe-7s-magnet text-success" />}
                  statsText="Orientation"
                  statsValue={this.props.databaseRecent[this.props.databaseRecent.length - 1]['orientation']}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated Now"
              />
            </Col>
            {/*<Col lg={3} sm={6}>*/}
            {/*  <StatsCard*/}
            {/*    bigIcon={<i className="pe-7s-note text-danger" />}*/}
            {/*    statsText="Notifications"*/}
            {/*    statsValue="0"*/}
            {/*    statsIcon={<i className="fa fa-clock-o" />}*/}
            {/*    statsIconText="In the last hour"*/}
            {/*  />*/}
            {/*</Col>*/}
            {/*<Col lg={3} sm={6}>*/}
            {/*  <button > Push to Cloud </button>*/}
            {/*</Col>*/}
            {/*<Col lg={3} sm={6}>*/}
            {/*  <button onClick={this.updateLocal}> Pull from Local </button>*/}
            {/*</Col>*/}
            {/*<Col lg={3} sm={6}>*/}
            {/*  <button onClick={this.handleSubmit}> Push to Local </button>*/}
            {/*</Col>*/}
            {/*<Col lg={3} sm={6}>*/}
            {/*  <StatsCard*/}
            {/*    bigIcon={<i className="fa fa-twitter text-info" />}*/}
            {/*    statsText="Followers"*/}
            {/*    statsValue="+45"*/}
            {/*    statsIcon={<i className="fa fa-refresh" />}*/}
            {/*    statsIconText="Updated now"*/}
            {/*  />*/}
            {/*</Col>*/}
          </Col>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="voltageChart"
                title="Velocity Chart ()"
                category=""
                stats=""
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={this.state.velocityData}
                      type="Line"
                      options={voltageChart}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            {/*<Col md={4}>*/}
            {/*  <Card*/}
            {/*    statsIcon="fa fa-clock-o"*/}
            {/*    title="Email Statistics"*/}
            {/*    category="Last Campaign Performance"*/}
            {/*    stats="Campaign sent 2 days ago"*/}
            {/*    content={*/}
            {/*      <div*/}
            {/*        id="chartPreferences"*/}
            {/*        className="ct-chart ct-perfect-fourth"*/}
            {/*      >*/}
            {/*        <ChartistGraph data={dataPie} type="Pie" />*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*    legend={*/}
            {/*      <div className="legend">{this.createLegend(legendPie)}</div>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Col>*/}
          </Row>

          <Row>
            <Col md={6}>
              {/*{this.state.logs.toString()}*/}
            </Col>

            {/*<Col md={6}>*/}
            {/*  <Card*/}
            {/*    title="Tasks"*/}
            {/*    category="Backend development"*/}
            {/*    stats="Updated 3 minutes ago"*/}
            {/*    statsIcon="fa fa-history"*/}
            {/*    content={*/}
            {/*      <div className="table-full-width">*/}
            {/*        <table className="table">*/}
            {/*          <Tasks />*/}
            {/*        </table>*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Col>*/}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
