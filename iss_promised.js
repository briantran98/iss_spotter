const request = require('request-promise-native');

const fetchMyIP = () => request('https://api.ipify.org?format=json')
const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`);
};
const fetchISSFlyOverTimes = (coords) => {
  const { latitude, longitude } = JSON.parse(coords).data
  return  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
} 

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then(data => {
    return JSON.parse(data).response;
  })
}

module.exports = { nextISSTimesForMyLocation }