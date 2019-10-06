import React from "react";
import styled from "styled-components";
import landingBanner from "../../../assets/landingmiddlebanner.jpg";

const BodyBanner = styled.div`
  height: 30vh;
  background-image: url(${landingBanner});
  background-size: cover;
  background-position: center;
`;

export default function LandingMiddle() {
  return <BodyBanner></BodyBanner>;
}
