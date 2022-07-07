import React, { useState, useEffect } from 'react'

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}

const FunctionApp = () => {
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null})
    const [status, setStatus] = useState(navigator.onLine)
    const [location, setLocation] = useState(initialLocationState)
    let mounted = true

    useEffect(() => {
        document.title = `You have clicked ${count} times`
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        navigator.geolocation.getCurrentPosition(handleGeolocation)
        const watchId = navigator.geolocation.watchPosition(handleGeolocation)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            navigator.geolocation.clearWatch(watchId)
            mounted = false
        }
    }, [count])

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn)
    }

    const handleMouseMove = event => {
        setMousePosition({
           x: event.pageX,
           y: event.pageY
        })
    }

    const handleOnline = () => {
        setStatus(true)
    }

    const handleOffline = () => {
        setStatus(false)
    }

    const handleGeolocation = (event) => {
        if (mounted) {
        setLocation({
            latitude: event.coords.latitude,
            longitude: event.coords.longitude,
            speed: event.coords.speed
        })
        }
    }

    return (
        <>
            <h2>Counter</h2>
            <button onClick={incrementCount}>I've been clicked {count} times</button>
            <div style={{width: '50px', height: '50px', background: isOn ? 'yellow' : 'grey'}} onClick={toggleLight}>

            </div>
            <div>
                <h2>Mouse Position</h2>
                <p>X Position {mousePosition.x}</p>
                <p>Y Position {mousePosition.y}</p>
            </div>
            <div>
                <h2>Network Status</h2>
                <p>You are {status ? 'online' : 'offline'}</p>
            </div>
            <div>
                <h2>Geolocation</h2>
                <p>Latitude is {location.latitude}</p>
                <p>Longitude is {location.longitude}</p>
                <p>Your speed is {location.speed ? location.speed : "0"}</p>
            </div>
        </>
    )
}

export default FunctionApp