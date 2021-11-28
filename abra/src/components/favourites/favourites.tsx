import {useAppSelector} from "../../app/hooks";
import {FavouriteCard} from "./favourite-card";
import styled from "styled-components";
import React from "react";

export const Favourites: React.VFC<{ onPageChange: (page: string) => void }> = ({onPageChange}) => {
  const favourites = useAppSelector(state => state.favourites.favourites)
  const {theme} = useAppSelector(state => state.util)
  if (favourites && !favourites!.length) {
    return (
      <StyledH1>
        You haven`t chosen any city.
      </StyledH1>
    )
  }
  return (
    <>
      <StyledH1 theme={theme}>Favourites</StyledH1>
      <StyledDiv>
        {favourites.map(fav => <FavouriteCard key={fav.key} temp={fav.temp} name={fav.name} id={fav.key}
                                              behaviour={fav.behaviour} onPageChange={onPageChange}/>)}
      </StyledDiv>
    </>

  );
};

const StyledH1 = styled.h1`
  color: ${props => props.theme === 'dark' ? 'white' : 'black'};
  transition: background-color 0.3s linear;
`
const StyledDiv = styled.div`
  display: flex;
  padding: 20px;
  gap: 20px;
`;