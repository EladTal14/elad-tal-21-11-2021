import {useAppSelector} from "../../app/hooks";
import {FavouriteCard} from "./favourite-card";
import styled from "styled-components";
import {Typography} from "@mui/material";
import React from "react";

export const Favourites: React.VFC<{ onPageChange: (page: string) => void }> = ({onPageChange}) => {
  const favourites = useAppSelector(state => state.favourites.favourites)
  if (favourites && !favourites!.length) {
    return (
      <Typography variant="h6" gutterBottom component="div">
        You haven`t chosen any city.
      </Typography>
    )
  }
  console.log('favourites',favourites)
  return (
    <>
      <h1>Favourites</h1>
      <StyledDiv>
        {favourites.map(fav => <FavouriteCard key={fav.key} temp={fav.temp} name={fav.name} id={fav.key}
                                              behaviour={fav.behaviour} onPageChange={onPageChange}/>)}
      </StyledDiv>
    </>

  );
};

const StyledDiv = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;