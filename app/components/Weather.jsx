var React = require("react");
var WeatherForm = require("WeatherForm");
var WeatherMessage = require("WeatherMessage");
var openWeatherMap = require("openWeatherMap");

var Weather = React.createClass({
    getInitialState: function() {
        return {
            isLoading: false,
        };
    },
    handleSearch: function(location) {
        
        this.setState({isLoading: true});        
        openWeatherMap.getTemp(location).then(function(temp) {
            this.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }.bind(this), function(errMessage) { //catch
            this.setState({isLoading: false});
            alert(errMessage);
        }.bind(this));
    },
    render: function() {
        var {temp, location, isLoading} = this.state;
        
        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Featching Weather...</h3>;
            } else if (temp && location){
                return <WeatherMessage location={location} temp={temp}/>;
            }
        }
        
        return (
            <div>
                <h1 className="text-center">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
            </div>
        );
    }
});

module.exports = Weather;