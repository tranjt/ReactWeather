var axios = require("axios");

const OPEN_WEATHER_MAP_URL ="http://api.openweathermap.org/data/2.5/weather?&APPID=ceac678e91037bdcaf898815c4a29f35&units=metric";

module.exports = {
    getTemp: function(location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;
        
        return axios.get(requestUrl).then(function(res) {                
                if (res.data.cod && res.data.message) {
                    throw new Error("404 city not found");
                }else {                   
                    return res.data.main.temp;
                }
            }, function(res) {               
                throw new Error("404 city not found");
            });
    }
}



