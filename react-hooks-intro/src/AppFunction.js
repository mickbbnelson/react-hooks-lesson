import React, {useState, useEffect} from "react";

const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}

const App = () => {
    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null })
    const [status, setStatus] = useState(navigator.onLine)
    const [location, setLocation] = useState(initialLocationState)
    let mounted = true;

    useEffect(() => {
        document.title = `You have clicked ${count} times`;
        window.addEventListener("mousemove", handleMouseMove)
        window.addEventListener('online', handleOnline)
        window.addEventListener('offline', handleOffline)
        navigator.geolocation.getCurrentPosition(handleGeolocation)
        const watchId = navigator.geolocation.watchPosition(handleGeolocation)

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener('online', handleOnline)
            window.removeEventListener('offline', handleOffline)
            navigator.geolocation.clearWatch(watchId);
            mounted = false;
        }
    }, [count])

    const handleGeolocation = (e) => {
        if (mounted) {
        setLocation({
          latitude: e.coords.latitude,
          longitude: e.coords.longitude,
          speed: e.coords.speed,
        })}
    }
    
    const handleOnline = () => {
        setStatus(true)
    }

    const handleOffline = () => {
        setStatus(false)
    }

    const handleMouseMove = (e) => {
        setMousePosition({ x: e.pageX, y: e.pageY})
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const toggleLight = () => {
        setIsOn(prevIsOn => !prevIsOn)
    }

    return (
        <>
            <h2>Counter</h2>
            <button onClick={incrementCount}>I was clicked {count} times</button> 
    
            <h2 onClick={toggleLight}>Toggle Light</h2>
            <div
            style={{
                height: '50px',
                width: '50px',
                background: isOn ? "yellow" : "grey"
            }}/>
            <p>Mouse position X: {mousePosition.x}</p>
            <p>Mouse position Y: {mousePosition.y}</p>
            <p>You are {status ? "Online" : "Offline"}</p>

            <h2>GeoLocation</h2>
            <p>Latitude {location.latitude}</p>
            <p>Longitude {location.longitude}</p>
            <p>your speed {location.speed ? location.speed : '0'}</p>
        </>
    )
}

export default App