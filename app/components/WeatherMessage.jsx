var React = require("react");


var WeatherMessage = function(props) {
        var {temp, location} = props;
        return (
            <div>
                <h1 className="text-center"> Location: {location}</h1>
                <h2  className="text-center"> Temperature: {temp}</h2>
            </div>
        );
};

module.exports = WeatherMessage;