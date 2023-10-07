import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import Loader from "./Loader"

const CommonMeal = (props) => {
    // const [page, setPage] = useState(1)
    const [mealData, setMealData] = useState([])
    

    let data = props.mealData
    useEffect(()=> {
        setMealData(data)
    },[props])

    console.log(mealData);
  return (
    <div>
        <div className="row">
            
            {/* <div className="col-md-8"> */}
            <div className="container row mx-auto">
            
            {
                mealData.length > 0 ? (
                    mealData
                    
                    .map((meal, i) => {
                        return (
                            <div key={i} className="col-12 meal-container gy-3 p-3" >
                                <div className="row align-items-center justify-content-between">
                                    <div className="col-md-4 ">
                                        <img style={{width:"100%", borderRadius:"17px"}} src={meal?.restaurant_thumb ? `${meal.restaurant_thumb}` : `${"https://th.bing.com/th/id/OIP.rGwX0AnqS2l36QyQo76MLAAAAA?pid=ImgDet&w=400&h=400&rs=1"}`} alt={meal.restaurant_name} />
                                    </div>
    
                                    <div className="col-12 col-md-8 content-header">
                                        <NavLink to={`/restaurant/menu/${meal.restaurant_id}`} className="heading mealRest my-2">{meal.restaurant_name}</NavLink>
                                        <p className="address my-3">{meal.address}</p>
                                        <p className=""></p>
                                        <hr />
                                        <div className="cuisine row justify-content-around">
                                            
                                            {
                                                meal.cuisines.length > 0 &&
                                                meal.cuisines.map((c,i) => {
                                                    return (
                                                        <button key={i} className="col-5 col-md-3 p-2">{c.cuisine_name}</button>
                                                    )
                                                })
                                            }
                                            
                                        </div>
    
                                        <div className="mealtyp row justify-content-around">
                                            {
                                                meal.mealTypes.length > 0 &&
                                                meal.mealTypes.map((m, i) => {
                                                    return (
                                                        <button key={i} className="col-5 col-md-3 p-2 my-2">{m.mealtype_name}</button>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                        <hr />
    
    
    
                                        <div className=" d-flex align-items-center justify-content-around">
                                            <p >
                                                Cost for 2 : ₹{meal.cost}
                                            </p>
                                            <p className=" rating">
                                                Rating : {meal.average_rating}
                                            </p>
                                            <p className="rating" >
                                                Rating : {meal.rating_text}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>
                        )
                    })
                ) 
                : 
                (<>
                <Loader/>
                </>)

                
            }

            

        </div>
        </div>
        {/* {
        mealData.length > 0 &&
        <div className="pagination d-flex justify-content-center">
            <span>Prev</span>
            {
                [(mealData.length / 3 )].map((_, i) => {
                    return <span key={i}> {i } </span>
                })
            }
            
            <span>Next</span>
        </div>
    } */}
    </div>
    
  )
}
export default CommonMeal