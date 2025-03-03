import { Outlet, useNavigate } from "react-router-dom"
import { TabBar } from "antd-mobile"
import { fetchBillList } from "@/store/modules/billStore"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'

const tabs = [
    {
        key: '/month',
        title: 'Month Bill',
        icon: <BillOutline />
    },
    {
        key: '/new',
        title: 'New Bill',
        icon: <AddCircleOutline/>
    },
    {
        key: '/year',
        title: 'Year Bill',
        icon: <CalculatorOutline />
    },
]

const Layout = () => {
    

    const navigate = useNavigate()
    const setRouteActive=(path)=>{
        console.log(path)
        navigate(path)
    }
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchBillList())
        setRouteActive('/month')
    }, [dispatch])

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={setRouteActive}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout