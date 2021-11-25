import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import React, {useEffect, useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {changeCity, getLocationAsync} from "../../features/location/locationSlice";
import {CircularProgress} from "@mui/material";
import {getTempOneDaySync} from "../../features/temparture/tempSlice";

type IProps = {
  label: string;
}

export const AutocompleteInput: React.VFC<IProps> = ({label}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce({value: searchTerm.trim(), delay: 500});
  const dispatch = useAppDispatch();
  const {value: cities, status} = useAppSelector(state => state.location);
  const [error, setError] = useState('')

  useEffect(() => {
    if (debouncedSearchTerm) {
      dispatch(getLocationAsync(debouncedSearchTerm))
    }
  }, [debouncedSearchTerm, dispatch])

  const handleInputChange = (value: string) => {
    setSearchTerm(value)
  }
  const handleOptionChange = (e: any, a: any) => {
    if (a !== null) {
      dispatch(changeCity({name: a.LocalizedName, key: a.Key}))
      dispatch(getTempOneDaySync(a.Key))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!(/^[a-zA-Z]+$/.test(e.key))) {
      setError('Only english.')
      e.preventDefault()
      return
    }
    setError('')
  }

  return (
    <StyledAutoComplete
      disablePortal
      options={cities as any}
      sx={{width: 300}}
      isOptionEqualToValue={(option: any, value: any) => option.LocalizedName === value.LocalizedName}
      getOptionLabel={(option: any) => option.LocalizedName}
      onChange={handleOptionChange}
      loading={status === 'loading'}
      inputValue={searchTerm}
      onInputChange={(event, newInputValue) => {
        handleInputChange(newInputValue);
      }}

      renderInput={(params) =>
        <TextField
          onKeyDown={handleKeyDown}

          {...params} label={label}
          error={!!error}

          helperText={error}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {status === 'loading' ? <CircularProgress color="inherit" size={20}/> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />}
    />
  );
};

const StyledAutoComplete = styled(Autocomplete)`
  && {
    padding-top: 20px;
    align-self: center;
  }
`;
