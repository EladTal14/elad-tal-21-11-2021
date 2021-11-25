import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {FavouriteCard} from "./favourite-card";
import styled from "styled-components";
import {Typography} from "@mui/material";

export const Favourites = () => {
  const dispatch = useAppDispatch()
  const favourites = useAppSelector(state => state.favourites.favourites)
  if (favourites && !favourites!.length) {
    return (
      <Typography variant="h6" gutterBottom component="div">
        You haven`t chosen any city.
      </Typography>
    )
  }
  return (
    <>
      <h1>Favourites</h1>
      <StyledDiv>
        {favourites.map(fav => <FavouriteCard key={fav.key} temp={fav.temp} name={fav.name}
                                              behaviour={fav.behaviour}/>)}
      </StyledDiv>
    </>

  );
};

const StyledDiv = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;