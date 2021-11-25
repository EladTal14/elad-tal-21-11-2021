export async function fetchLocation(userInput: string) {
  try {
    const res = await fetch(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${process.env.REACT_APP_API_KEY}&q=${userInput}`)
    return res.json()
  } catch (error) {
    console.log('error', error)
    return {name: 'Tel Aviv', key: '215854'}
  }
}
