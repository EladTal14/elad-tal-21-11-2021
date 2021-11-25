export const farenToCelsius = (faren: number = 0) => {
  return Math.round((faren - 32) / 1.8)
}

export const getDayFromDate = (dayDate: string) => {
  return new Date(dayDate).toLocaleDateString('en-IL', {weekday: 'long'})
}