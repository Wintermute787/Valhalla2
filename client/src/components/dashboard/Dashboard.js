import React, { Component } from "react";
import styled from "styled-components";
import banner1 from "../../assets/fantasybanner3.jpg";

const DashBody = styled.div`
  height: 100%;
  background-color: black;
`;

const HeaderOne = styled.div`
  height: 50vh;
  background-image: url(${banner1});
  position: relative;
  top: 2em;
  background-size: cover;
  background-position: center;
  margin-bottom: 3em;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 4fr 2fr 
  grid-template-rows: 2fr 2fr ;
  grid-column-gap: 5em;
  grid-row-gap: 20px;
  min-height: 100vh;
  padding: 3em;
  
`;

const Div1 = styled.div`
  background-color: green;
`;
const Div2 = styled.div`
  background-color: blue;
`;
const Div3 = styled.div`
  background-color: red;
`;

const Div4 = styled.div`
  background-color: yellow;
`;

const Div5 = styled.div`
  background-color: teal;
`;

class Dashboard extends Component {
  render() {
    return (
      <DashBody>
        <HeaderOne></HeaderOne>
        <Grid>
          <Div1></Div1>
          <Div2></Div2>
          <Div3></Div3>
          <Div4></Div4>
          <Div5></Div5>
        </Grid>
      </DashBody>
    );
  }
}

export default Dashboard;
