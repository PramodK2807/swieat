import Footer from "./Footer"
import Header from "./Header"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({children}) => {
  return (
    <div>
        <Header/>
        <ToastContainer/>
        {children}
        <Footer/>
    </div>
  )
}
export default Layout