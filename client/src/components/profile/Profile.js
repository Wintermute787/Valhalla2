import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Profile.css";
import { Container, Row, Col, Grid } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
const banner3 = require("../../assets/bannerimage3.png");
const banner4 = require("../../assets/bannerimage4.png");
const banner5 = require("../../assets/bannerimage5.png");

class Profile extends Component {
  render() {
    const { profile } = this.props.profile;
    return (
      <div className="wrapper">
        <Row>
          <Col xs lg="2">
            <div className="sidebar">
              <h2 className="username">{profile.username}</h2>
              <hr />
              <div className="sidebar_icons">
                <Row className="sidebar_icons-wrapper">
                  <Col xs lg="12">
                    <i className="fas fa-rocket"> Profile Settings</i>
                  </Col>
                  <Col xs lg="12">
                    <i className="fas fa-rocket"> Profile Settings</i>
                  </Col>
                  <Col xs lg="12">
                    <i className="fas fa-rocket"> Profile Settings</i>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
          <Col xs lg="10">
            <div className="content">
              <Carousel className="carosuel">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={banner3}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>Happy Birthday Valhalla!</h3>
                    <p>Today we celebrate the launch of Valhalla!</p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={banner4}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Join with Friends!</h3>
                    <p>
                      Take your characters into anyone of our premade games or
                      join with friends in your own custom campaign!
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={banner5}
                    alt="Third slide"
                  />

                  <Carousel.Caption>
                    <h3>Winter festival is here!</h3>
                    <p>
                      Play games, win prizes, see what Valhalla has for you!
                    </p>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(Profile);
