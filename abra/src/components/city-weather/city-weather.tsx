import styled, {keyframes} from "styled-components";
import heart from '../../assets/images/heart.svg'
import sunny from '../../assets/images/sunny.png'
import {WeatherCard} from "../weather-card";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {farenToCelsius} from "../../services/util";
import {useEffect} from "react";
import {getTempFiveDaySync, getTempOneDaySync} from "../../features/temparture/tempSlice";
import {Button} from "@mui/material";
import {addFavourite, removeFavourite} from "../../features/favouritesSlice";
import {UnitScale} from "../../enum/unit-scale";

export const CityWeather = () => {
  const dispatch = useAppDispatch()
  const city = useAppSelector(state => state.location.city)
  const {Day: day, Temperature} = useAppSelector(state => state.temp.oneDay)
  const {value: cityTemp, fiveDaysTemp} = useAppSelector(state => state.temp)
  const {favourites} = useAppSelector(state => state.favourites)

  const isFavourite = favourites.find(fav => fav.key === city.key)
  const temperature = cityTemp === UnitScale.Celsius ? farenToCelsius(Temperature?.Maximum?.Value) : Temperature?.Maximum?.Value || 0

  const daysNormalized = fiveDaysTemp.map(day => {
    return {
      date: day.Date,
      temperature: day.Temperature.Maximum.Value,
      dayBehaviour: day.Day.IconPhrase
    }
  })

  useEffect(() => {
    dispatch(getTempOneDaySync(city.key))
    dispatch(getTempFiveDaySync(city.key))
  }, [city.key])

  const addRemoveAction = () => {
    if (isFavourite) {
      dispatch(removeFavourite({name: city.name}))
    } else {
      dispatch(addFavourite({
        name: city.name,
        key: city.key,
        temp: Temperature?.Maximum?.Value,
        behaviour: day.IconPhrase
      }))
    }
  }

  return (
    <StyledDiv>
      <div className="flex column">
        <div className="city-name">
          <div className="flex">
            <img className="weather-icon" src={sunny} alt="weather-icon"/>
            <div className="flex column">
              <span className="city-name">{city.name}</span>
              <span>{temperature}&#176;{cityTemp[0].toUpperCase()}</span>
            </div>
          </div>

          <div className="flex actions">
            <img className={`heart-icon ${isFavourite && 'favourite'}`} src={heart} alt="heart"/>
            <StyledButton
              onClick={addRemoveAction}>{!!isFavourite ? 'Remove from favourites' : 'Add to favourites'}</StyledButton>
          </div>
        </div>
        <h1>{day?.IconPhrase}</h1>
        <StyledList>
          {daysNormalized.map(day => <WeatherCard key={day.date} dayDate={day.date} temp={day.temperature}
                                                  behaviour={day.dayBehaviour}/>)}
        </StyledList>
      </div>
    </StyledDiv>
  );
};

const StyledList = styled.div`
  display: flex;
  justify-self: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 10px;
  padding: 2%;
`;

const rotate = keyframes`
  from {
    transform: rotateY(0deg);

  }

  to {
    transform: rotateY(360deg);
  }
`;

const StyledDiv = styled.div`
  flex: 1;
  background-color: #aa93e8;
  margin: 4% 4%;
  border-radius: 10px;

  .city-name {
    color: black;
    display: flex;
    justify-content: space-between;
    padding: 2% 2%;
  }

  .flex {
    display: flex;
  }

  span.city-name {
    font-size: 20px;
    width: 100px;
  }

  .heart-icon {

    &:hover {
      animation: ${rotate} 2s linear infinite;
    }

    &.favourite {
      filter: drop-shadow(-2px -3px 1px red);
    }
  }

  .column {
    flex-direction: column;
  }

  .actions {
    display: flex;
    gap: 10px;

    img {
      width: 45px;
    }
  }

  h1 {
    text-align: center;
  }

`;
const StyledButton = styled(Button)`
  && {
    color: #2e267b;
    border: 1px solid #2e267b;
    margin-right: 3px;
  }
`;
