import React, {useState} from 'react';
import {Header} from "./components/header/header";
import {AutocompleteInput} from "./components/autocomplete/autocomplete";
import {CityWeather} from "./components/city-weather/city-weather";
import {Favourites} from "./components/favourites/favourites";
import {Pages} from "./enum/pages";
import {useAppSelector} from "./app/hooks";
import styled from "styled-components";

function App() {
  const [page, setPage] = useState(Pages.Home as string)
  const {theme} = useAppSelector(state => state.util)
  const handlePageChange = (userPage: string) => {
    setPage(userPage)
  }

  return (
    <StyledApp className="App" theme={theme}>

      <Header onPageChange={handlePageChange}/>
      {page === Pages.Favourites ? <Favourites onPageChange={handlePageChange}/> :
        <>
          <AutocompleteInput label="City"/>
          <CityWeather/>
        </>
      }
    </StyledApp>
  );
}

const StyledApp = styled.div<{ theme: string }>`
  transition: all 0.3s linear;
  color: ${props => props.theme === 'dark' ? "black" : 'white'};
  background-color: ${props => props.theme === 'dark' ? "black" : 'white'};
`
export default App;
