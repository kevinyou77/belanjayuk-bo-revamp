export default (date) => {
  const dateDob = new Date(date)

  const y = dateDob.getFullYear()
  let m = dateDob.getMonth() + 1
  let d = dateDob.getDate()

  if (m != 0 && m < 11) {
    m = `0${m}`
  }

  if (d != 0 && d < 10) {
    d = `0${d}`
  }

  return `${y}-${m}-${d}`
}