import Cookies from 'js-cookie'

const ParkKey = 'aqfwpt-park'

export function getPark() {
  return Cookies.get(ParkKey)
}

export function setPark(id) {
  return Cookies.set(ParkKey, id)
}

export function removePark() {
  return Cookies.remove(ParkKey)
}
