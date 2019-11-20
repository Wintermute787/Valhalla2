import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteProfile } from "../../actions/profileActions";
import styled from "styled-components";
import Spinner from "../common/Spinner";
import Profile from "../profile/Profile";
import banner1 from "../../assets/fantasybanner3.jpg";

const DashBody = styled.div`
  height: 100%;
  padding: 1em;
  background-color: #1a1a1d;
`;

const HeaderOne = styled.div`
  height: 80vh;
  background-image: url(${banner1});
  position: relative;
  top: 2em;
  background-size: cover;
  background-position: center;
  margin-bottom: 3em;

  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 
  grid-template-rows: 2fr 2fr ;
  grid-column-gap: 5em;
  grid-row-gap: 20px;
  min-height: 80vh;
  padding: 6em;
  
`;

const Div1 = styled.div`
 
  transform: skew(-5deg);
  background-color: #027373
  background: linear-gradient(177deg, rgba(19,0,62,1) 0%, rgba(2,115,115,1) 35%, rgba(0,212,255,1) 100%);

  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;
const Div2 = styled.div`
 
  transform: skew(-5deg);
  background-color: #043540
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;
const Div3 = styled.div`
  
  transform: skew(-5deg);
  background-color: #027373
  background: linear-gradient(177deg, rgba(2,0,36,1) 0%, rgba(2,115,115,1) 35%, rgba(0,212,255,1) 100%);

  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
`;

const Icon = styled.div`
  color: white;
  width: 100%;
  text-align: center;
  font-size: 3em;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`;

const HeaderText = styled.div`
  text-align: center;
  color: white;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
`;

class Dashboard extends Component {
  //loading in the current profile upon mounting the component
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  onDeleteClick(e) {
    this.props.deleteProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    //in order for object keys to work I had to create a edgecase for if it is a null value
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      //this is a method of creating a view for an account that has a profile, and one that doesnt
      if (Object.keys(profile).length > 0) {
        dashboardContent = <Profile />;
      } else {
        dashboardContent = (
          <DashBody>
            <HeaderOne></HeaderOne>
            <Grid>
              <Div1>
                <Icon>
                  <i className="fas fa-sort-amount-up"></i>
                </Icon>
                <HeaderText>
                  <h1>Create your profile!</h1>
                  <Link to="/create-profile">
                    <button
                      type="button"
                      className="btn btn-lg mt-4 btn-primary"
                    >
                      Create
                    </button>
                  </Link>
                </HeaderText>
              </Div1>

              <Div3>
                <Icon>
                  <i className="fas fa-dice-d20"></i>
                </Icon>
                <HeaderText>
                  <h1>Find or create a game!</h1>
                  <button type="button" className="btn btn-lg mt-4 btn-primary">
                    Games
                  </button>
                </HeaderText>
              </Div3>
            </Grid>
          </DashBody>
        );
      }
    }

    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteProfile }
)(Dashboard);
