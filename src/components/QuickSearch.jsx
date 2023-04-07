import { useEffect, useState } from "react"
import {NavLink} from 'react-router-dom'
import Loader from "./Loader"
const QuickSearch = () => {

    const [mealData, setMealData] = useState([])

    useEffect(() => {
        getMealData()
    }, [])

    const getMealData = async() => {
        let meal = await fetch(`${process.env.REACT_APP_API}/mealType`);
        let data = await meal.json()
        // console.log(data);
        if(data){
            setMealData(data)
        }
    }
  return (
    <>

    <div className="container my-5">
        <div className="content-header  ">
            <p className="heading my-3">
                Quick Search
            </p>
            <p style={{color:'#8C96AB', marginBottom:"20px"}}>Discover Restaurants by meal type</p>
        </div>

        <div className="search-container my-3">

            <div className="row g-4 meal">
                
                {
                    mealData.length > 0 ?
                    mealData.map((item, i) => {
                        return (
                            <NavLink key={i} to={`/mealtype/${item.mealtype_id}`} className="col-md-4 col-12 col-sm-6 meal-card">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <img className="img-fluid" style={{width:"170px", height:'115px', borderRadius:'8px 0 0 8px'}} src={item.meal_image} alt={item.mealtype
                                        } />
                                    </div>
                                    <div className="col-6">
                                        <p className="title my-2">
                                            {item.mealtype}
                                        </p>
                                        <p className="text-dark">{item.content}</p>
                                    </div>
                                </div>
                            </NavLink>
                        )
                    })

                    :

                    <Loader/>
                }
                
            </div>
        </div>
    </div>
    
    </>
  )
}
export default QuickSearch