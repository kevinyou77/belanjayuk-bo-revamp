export default (date) => {
  const dateDob = new Date(date)

  const y = dateDob.getFullYear()
  let m = dateDob.getMonth()
  let d = dateDob.getDay()

  if (m < 10) {
    m = `0${m}`
  }

  if (d < 10) {
    d = `0${d}`
  }

  return `${y}-${m}-${d}`
}