import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Nav from "./Nav"

const Header = () => {
    
    const [city, setCity] = useState([])
    const [stateId, setStateId] = useState('')
    const [location, setLocation] = useState([])
    const navigate = useNavigate()

    useEffect(() =>{
        getCity()
        getLocation()
    }, [stateId])

    const getCity = async() => {
        let cityData = await fetch(`${process.env.REACT_APP_API}/location`);
        let data = await cityData.json()
        // console.log(data.city);
        if(data.success){
            setCity(data.city)
        }
    }

    const handleState = (e) => {
        const getStateId = e.target.value
        // console.log(getStateId);
        setStateId(getStateId)
    }

    const handleLocation = (e) => {
        const getLocationId = e.target.value
        // console.log(getLocationId);
        navigate('/location/'+getLocationId)
    }

    const getLocation = async() => {
        const locationData = await fetch(`${process.env.REACT_APP_API}/location/${stateId}`)
        const data = await locationData.json()
        // console.log(data);
        setLocation(data)
    }

    
    

  return (
    <>
        <div className="navigation" style={{backgroundColor:'#000000a7'}}>
           
            <Nav/>


            <div className="head-cont">
                <p className="header text-light text-center">
                    Select the best Restaurants, Cafes and Bars
                </p>
                <div className="row option justify-content-around gy-2">
                    
                  
                        <select className="col-md-5" onChange={(e)=>handleState(e)}>
                        <option value="">--- Please Select City ---</option>
                            {
                                
                                city.map((cityItem, index) => {
                                    return(
                                        <>
                                        <option key={index} className="text-dark" value={cityItem.state_id}>{cityItem.state}</option>
                                        </>
                                    )
                                })
                            }
                        </select>
    

                    
                        <select onChange={(e)=>handleLocation(e)} className="col-md-5">
                            
                            <option value="">--- Please Select Restaurant ---</option>
                            {
                                location.length > 0 &&
                                location.map((locationItem, i) => {
                                    return (
                                        <option key={i} className="text-dark" value={locationItem.location_id}>
                                            {locationItem.location_name}
                                        </option>
                                    )
                                })
                            }
                        </select>
                   
                    
                </div>
            </div>

        </div>

        
    </>
  )
}
export default Header