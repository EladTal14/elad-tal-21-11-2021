import React from "react";
import styled from "styled-components";
import {Button, Typography} from "@mui/material";
import sun from '../../assets/images/sun.svg'
import moon from '../../assets/images/moon.svg'
import {changeTemp} from "../../features/temparture/tempSlice";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {SwitchDarkMode} from "../switch/switch";
import {UnitScale} from "../../enum/unit-scale";
import {Pages} from "../../enum/pages";

export const Header: React.VFC<{ onPageChange: (userPage: string) => void }> = ({
                                                                                  onPageChange,
                                                                                }) => {
  const dispatch = useAppDispatch()
  const {value: scaleUnit} = useAppSelector(state => state.temp)
  const {theme} = useAppSelector(state => state.util)
  return (
    <StyledHeader theme={theme}>
      <div className="logo">

        <img src={theme === "light" ? sun : moon} alt="logo"/>
        <StyledTypography variant="h5">
          Weather
        </StyledTypography>
      </div>
      <div className="flex">
        <StyledButton onClick={() => {
          dispatch(changeTemp(scaleUnit === UnitScale.Celsius ? UnitScale.Fahrenheit : UnitScale.Celsius))
        }}>{scaleUnit}</StyledButton>
        <SwitchDarkMode/>
      </div>
      <div className="buttons">
        <StyledButton  variant="outlined" onClick={() => onPageChange(Pages.Home)}>Home</StyledButton>
        <StyledButton  variant="outlined"
                      onClick={() => onPageChange(Pages.Favourites)}>Favourites</StyledButton>
      </div>

    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  background-color: #aa93e8;
  display: flex;
  justify-content: space-between;
  padding: 2%;
  align-items: center;

  .flex {
    display: flex;
  }

  .logo {
    display: flex;
    align-items: center;
  }

  img {
    width: 100%;
    max-height: 70px;
    height: auto;
    padding-right: 6px;
    transition: filter 0.3s linear;
    filter: invert(${props => props.theme === 'light' ? 1 : 0});

  }

`;
const StyledButton = styled(Button)`
  && {
    color: ${props => props.theme === 'light' ? 'white' : '#2e267b'};
    border: 1px solid #2e267b;
    margin-right: 3px;
  }
`;
const StyledTypography = styled(Typography)`
  && {
    margin: 0;
  }
`;