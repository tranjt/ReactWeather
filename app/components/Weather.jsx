var React = require("react");
var WeatherForm = require("WeatherForm");
var WeatherMessage = require("WeatherMessage");
var openWeatherMap = require("openWeatherMap");
var ErrorModal = require("ErrorModal");

var Weather = React.createClass({
    getInitialState: function() {
        return {
            isLoading: false,

        };
    },
    handleSearch: function(location) {
        
        this.setState({
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined
        });        

        openWeatherMap.getTemp(location).then(function(temp) {
            this.setState({
                location: location,
                temp: temp,
                isLoading: false
            });
        }.bind(this), function(e) { //catch           
            this.setState({
                isLoading: false,
                errorMessage: e.message
            });            
        }.bind(this));
    },
    componentDidMount: function() {
        var location = this.props.location.query.location;
        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = "#/";
        }
    },
    componentWillReceiveProps: function(newProps) {
        var location = newProps.location.query.location;
        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = "#/";
        }
    },

    render: function() {
        var {temp, location, isLoading, errorMessage} = this.state;
        
        function renderMessage() {
            if (isLoading) {
                return <h3 className="text-center">Featching Weather...</h3>;
            } else if (temp && location){
                return <WeatherMessage location={location} temp={temp}/>;
            }
        }

        function renderError() {
            if (typeof errorMessage === "string"){
                return (
                    <ErrorModal message={errorMessage}/>
                )            
            }
        }
        
        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        );
    }
});

module.exports = Weather;