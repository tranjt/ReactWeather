var React = require("react");


var WeatherMessage = function(props) {
        var {temp, location} = props;
        return (
            <div>
                <h1> Location: {location}</h1>
                <h2> Temperature: {temp}</h2>
            </div>
        );
};

module.exports = WeatherMessage;