import { NavLink } from "react-router-dom"

const QuickSupport = () => {
  return (
    <>
        <div className="quickSupport">
          <div className="container d-flex align-items-center justify-content-between" style={{gap:'20px'}}>
            <div>
              <NavLink to="mailto:pramodkushwaha1328@gmail.com" style={{textDecoration:"underline", marginRight:"20px" }}> <i class="fa-solid fa-envelope"></i>  Mail To Us</NavLink>
              <i class="fa-solid fa-mobile" > +91 6260392809</i>
            </div> 
            <div >
              24 * 7 Support?
            </div>
          </div>
        </div>
    </>
  )
}
export default QuickSupport