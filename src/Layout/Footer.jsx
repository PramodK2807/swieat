import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ background: "#29262a", width: "100%" , marginTop:"20px"}}>
      <div className="container py-5">
      <div
              className="logo"
              style={{
                margin:"20px 0",
                display: "flex",
                color: "white",
                flexDirection: "column",
                fontWeight: "bold",
              }}>
              <NavLink to="/" className="m-0 p-0 text-light">
                SwiEat
              </NavLink>
              <p className="m-0 tagline" style={{ fontSize: "10px" }}>
                We Deliver Trust
              </p>
            </div>
        <div className="row">
          <div className=" col-6">
            
            <p className="footer-heading">More About The Project</p>
            <p className="p-color">This project is only for the learning purpose, and all the restaurant, menu are dummy, do not expect any delivery.</p>
          </div>
          <div className="col-6 ">
            <p className="footer-heading">Get Connect With Me</p>
            <NavLink target='_blank' to='https://github.com/PramodK2807' ><i class="fa-brands fa-github"></i> Github</NavLink>
            <br />
            <NavLink target='_blank' to='https://www.linkedin.com/in/pramod-kushwaha-1a35ba153/?trk=public-profile-join-page' ><i class="fa-brands fa-linkedin"></i> LinkedIn</NavLink>
            <br />
            <NavLink target='_blank' to='https://pramodk2807.github.io/portfolio/' ><i class="fa-solid fa-globe"></i> Website</NavLink>
          </div>
         
        </div>
      </div>
    </footer>
  );
};
export default Footer;
