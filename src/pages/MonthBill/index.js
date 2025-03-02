import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import dayjs from 'dayjs'
import { useState, useMemo } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {
    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY | MMMM')
    })
    const [currentMonthBill, setCurrentMonthBill] = useState([])
    const { billList } = useSelector(state => state.bill)

    const openDatePicker = () => {
        setDateVisible(true)
    }

    const onConfirm = (date) => {

        const dateFormat = dayjs(date).format('YYYY | MMMM')
        setCurrentDate(dateFormat)

        setCurrentMonthBill(monthGroup[dateFormat]||[])

    }

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY | MMMM"))

    }, [billList])

    const monthResult = useMemo(() => {
        const expense = currentMonthBill.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        console.log(expense);
        
        const income = currentMonthBill.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        console.log(income);
        

        return {
            expense,
            income,
            total: expense + income
        }
    }, [currentMonthBill])


    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                Monthly Financial Summary
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date">
                        <span className="text">
                            {currentDate} Bill
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')} onClick={openDatePicker}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.expense.toFixed(2)}</span>
                            <span className="type">Expense</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">Income</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">Balance</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="Bill Date"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
            </div>
        </div >
    )
}

export default Month