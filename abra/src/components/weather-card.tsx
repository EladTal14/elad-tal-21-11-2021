import React from "react";
import {Box, Card, CardContent, Skeleton, Typography} from "@mui/material";
import {useAppSelector} from "../app/hooks";
import styled from "styled-components";
import {farenToCelsius, getDayFromDate} from "../services/util";

type IProps = {
  dayDate: string;
  temp: number;
  behaviour: string
}

export const WeatherCard: React.FC<IProps> = ({dayDate, temp, behaviour}) => {
  const dayName = getDayFromDate(dayDate)
  const {value, status} = useAppSelector(state => state.temp)
  const temperature = value === 'celsius' ? farenToCelsius(temp) : temp

  return (
    <StyledCard sx={{maxWidth: 200, minWidth: 200}}>
      <CardContent>
        {status === 'loading' ?
          (<Box sx={{width: 150, height: 115}}>
            <Skeleton  animation="wave" variant="text"/>
            <Skeleton width={50} animation="wave" variant="text"/>
            <Skeleton animation="wave" variant="text"/>
          </Box>) :
          (<>
            <Typography sx={{fontSize: 18}} color="text.primary" gutterBottom>
              {dayName}
            </Typography>

            <Typography sx={{mb: 1.5}} color="text.secondary">
              {temperature}&#176;{value[0].toUpperCase()}
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

    }
  }
`
