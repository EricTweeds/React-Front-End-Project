import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  getWeather,
  receiveWeather,
  fetchWeather,
  addLocation,
  fetchWeatherIfNeeded,
  selectedLocation
} from '../actions'
import Header from '../components/Header'
import Weather from '../components/Weather'
import AddLocation from './AddLocation'

const listStyle = {
    listStyle: 'none'
};

class AsyncApp extends Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.handleRefreshClick = this.handleRefreshClick.bind(this)
    }
    componentDidMount() {
        const { dispatch, selectedLocation } = this.props
        dispatch(fetchWeatherIfNeeded(selectedLocation, dispatch))
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedLocation !== prevProps.selectedLocation) {
            const { dispatch, selectedLocation } = this.props
            dispatch(fetchWeatherIfNeeded(selectedLocation, dispatch))
        }
    }
    
    handleChange(nextLocation) {
        const { dispatch } = this.props
        this.props.dispatch(AddLocation(nextLocation))
        this.props.dispatch(fetchWeatherIfNeeded(nextLocation, dispatch))
    }

    handleRefreshClick(e) {
        e.preventDefault()
        const {dispatch, selectedLocation} = this.props
        dispatch(fetchWeatherIfNeeded(selectedLocation, dispatch))
    }

    render() {
        const { weather, isFetching } = this.props
        return (
            <div>
            <AddLocation onChange={this.handleChange} />
            {isFetching && weather.length ===0 && <h2>Loading...</h2>}
            {!isFetching && weather.length ===0 && <h2>Empty</h2>}
            {weather && <Weather weather ={weather}/>}
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { selectedLocation, weatherByLocation, locations, weather } = state
    const {
        isFetching,
        lastUpdated,
    } = weatherByLocation[selectedLocation] || {
        isFetching: true,
        items: []
    }
    return {
        selectedLocation,
        weather,
        isFetching,
        lastUpdated,
        locations
    }
}

export default withRouter(connect(mapStateToProps)(AsyncApp))