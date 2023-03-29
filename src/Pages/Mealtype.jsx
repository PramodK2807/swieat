import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CommonMeal from "../components/CommonMeal";
// import Filter from "../components/Filter";
import Layout from "../Layout/Layout";

const Mealtype = () => {
  const [mealData, setMealData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const params = useParams();

  useEffect(() => {
    getMealtype();
  }, []);

  const getMealtype = async () => {
    let onMealtype = await fetch(
      `${process.env.REACT_APP_API}/filter/${params.id}`
    );
    let data = await onMealtype.json();
    // console.log(data);
    setMealData(data);
  };

  const costFilter = async (e) => {
    console.log(e.target.value);

    let cost = e.target.value.split("-");
    let lCost = cost[0];
    let hCost = cost[1];
    let costUrl = "";

    if (e.target.value === "") {
      costUrl = `${process.env.REACT_APP_API}/filter`;
    } else {
      costUrl = `${process.env.REACT_APP_API}/filter?hCost=${hCost}&lCost=${lCost}`;
    }

    let data = await fetch(`${costUrl}`);
    let result = await data.json();
    setFilterData(result)

  };

  

  return (
    <Layout>
      <div className="row" style={{ margin: "10px 0" }}>
        <div className="col-md-4">
          <div className="container">
            <div
              style={{
                border: "solid 1px #192F60",
                marginTop: "15px",
                paddingLeft: "20px",
                paddingRight: "20px",
              }}
            >
              <h1 className="text-center">Filter</h1>

              <div>
                <div className="my-3">
                  <p className="menu-name d-flex ">Price Filter</p>
                  <hr />
                  <div className="filter-btn" onChange={(e) => costFilter(e)}>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="" />
                      All
                    </label>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="100-300" />
                      100-300
                    </label>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="301-600" />
                      301-600
                    </label>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="601-900" />
                      601-900
                    </label>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="901-1200" />
                      901-1200
                    </label>
                    <label className="radio">
                      <input type="radio" name="cuisine" value="1201-5000" />
                      1201-5000
                    </label>
                  </div>
                </div>

                {/* <p className="menu-name d-flex ">Cuisine Filter</p>
                <hr />
                <div className="filter-btn" onChange={(e) => cuisineFilter(e)}>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="" />
                    All
                  </label>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="1" />
                    North Indian
                  </label>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="2" />
                    South Indian
                  </label>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="3" />
                    Chinese
                  </label>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="4" />
                    Fast Food
                  </label>
                  <label className="radio">
                    <input type="radio" name="cuisine" value="5" />
                    Street Food
                  </label> */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <CommonMeal mealData={filterData.length > 0 ? filterData : mealData} />
        </div>
      </div>
    </Layout>
  );
};
export default Mealtype;
