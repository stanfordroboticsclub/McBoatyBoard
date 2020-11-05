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
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import {
  responsiveSales,
  legendSales,
  voltageChart,
  mockVoltageData
} from "variables/Variables.jsx";

class Dashboard extends Component {
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
          <Row>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-battery text-warning" />}
                statsText="Battery"
                statsValue="100%"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-network text-success" />}
                statsText="Network"
                statsValue="20 ms"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated Now"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-note text-danger" />}
                statsText="Notifications"
                statsValue="0"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            {/*<Col lg={3} sm={6}>*/}
            {/*  <StatsCard*/}
            {/*    bigIcon={<i className="fa fa-twitter text-info" />}*/}
            {/*    statsText="Followers"*/}
            {/*    statsValue="+45"*/}
            {/*    statsIcon={<i className="fa fa-refresh" />}*/}
            {/*    statsIconText="Updated now"*/}
            {/*  />*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="voltageChart"
                title="Voltage Chart (Volts)"
                category=""
                stats="Updated 2 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={mockVoltageData}
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
            {/*<Col md={6}>*/}
            {/*  <Card*/}
            {/*    id="chartActivity"*/}
            {/*    title="2014 Sales"*/}
            {/*    category="All products including Taxes"*/}
            {/*    stats="Data information certified"*/}
            {/*    statsIcon="fa fa-check"*/}
            {/*    content={*/}
            {/*      <div className="ct-chart">*/}
            {/*        <ChartistGraph*/}
            {/*          data={dataBar}*/}
            {/*          type="Bar"*/}
            {/*          options={optionsBar}*/}
            {/*          responsiveOptions={responsiveBar}*/}
            {/*        />*/}
            {/*      </div>*/}
            {/*    }*/}
            {/*    legend={*/}
            {/*      <div className="legend">{this.createLegend(legendBar)}</div>*/}
            {/*    }*/}
            {/*  />*/}
            {/*</Col>*/}

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
