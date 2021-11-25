export async function fetchOneDayTemp(cityId: string) {
  try {
    const res = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${cityId}?apikey=${process.env.REACT_APP_API_KEY}`)
    const json = await res.json()
    return json.DailyForecasts[0]
  } catch (error) {
    console.log('error', error)
    return {Date: '', Day: {}, Temperature: {}}
  }
}

export async function fetchFiveDayTemp(cityId: string) {
  try {
    const res = await fetch(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityId}?apikey=${process.env.REACT_APP_API_KEY}`)
    const json = await res.json()
    return json.DailyForecasts
  } catch (error) {
    console.log('error', error)
    return []
  }
}
