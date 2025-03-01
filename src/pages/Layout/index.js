import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"



const Layout = () =>{
    return(
        <div>
            <Outlet/>
            i am layout
            <Button color="primary">Global</Button>
            <div className="purpleButton">
                <Button color="primary">Local</Button>
            </div>
        </div>
    )
}
export default Layout