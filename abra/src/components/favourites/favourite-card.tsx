import React from "react";
import {Box, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import styled from "styled-components";
import {farenToCelsius} from "../../services/util";
import {UnitScale} from "../../enum/unit-scale";
import {LoadingState} from "../../enum/loading-state";

type IProps = {
  name: string;
  temp: number;
  behaviour: string;
}

export const FavouriteCard: React.FC<IProps> = ({name, temp, behaviour}) => {
  const {value:scaleUnit, status} = useAppSelector(state => state.temp)
  const temperature = scaleUnit === UnitScale.Celsius ? farenToCelsius(temp) : temp

  return (
    <StyledCard sx={{maxWidth: 200, minWidth: 200}}>
      <CardContent>
        {status === LoadingState.Loading ?
          (<Box sx={{width: 150, height: 115}}>
            <Skeleton animation="wave" variant="text"/>
            <Skeleton width={50} animation="wave" variant="text"/>
            <Skeleton animation="wave" variant="text"/>
          </Box>) :
          (<>
            <Typography sx={{fontSize: 18}} color="text.primary" gutterBottom>
              {name}
            </Typography>

            <Typography sx={{mb: 1.5}} color="text.secondary">
              {temperature}&#176;{scaleUnit[0].toUpperCase()}
            </Typography>
            <Typography sx={{mb: 1.5}} color="text.secondary">
              {behaviour}
            </Typography>
          </>)
        }

      </CardContent>
    </StyledCard>
  );
};
const StyledCard = styled(Card)`
  && {
    background-color: #aa8df7;
    transition: transform 0.2s linear, box-shadow 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 4px 6px lightgray;
      cursor: pointer;
    }
  }
`
