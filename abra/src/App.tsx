import React, {useState} from 'react';
import {Header} from "./components/header/header";
import {AutocompleteInput} from "./components/autocomplete/autocomplete";
import {CityWeather} from "./components/city-weather/city-weather";
import {useAppDispatch} from "./app/hooks";
import {Favourites} from "./components/favourites/favourites";
import {Pages} from "./enum/pages";


function App() {
  const dispatch = useAppDispatch()
  const [page, setPage] = useState(Pages.Home as string)

  const handlePageChange = (userPage: string) => {
    setPage(userPage)
  }

  return (
    <div className="App">
      <Header onPageChange={handlePageChange}/>
      {page === Pages.Favourites ? <Favourites/> :
        <>
          <AutocompleteInput label="City"/>
          <CityWeather/>
        </>
      }
    </div>
  );
}

export default App;
