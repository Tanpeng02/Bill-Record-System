import { createBrowserRouter } from "react-router-dom"
import Layout from "@/pages/Layout"
import YearBill from "@/pages/YearBill"
import MonthBill from "@/pages/MonthBill"
import NewBill from "@/pages/NewBill"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/month',
                element: <MonthBill />
            },
            {
                path: '/year',
                element: <YearBill />
            }
        ]
    },
    {
        path: '/new',
        element: <NewBill />
    }
])

export default router