import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import dayjs from 'dayjs'
import { useState, useMemo, useEffect } from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DailyBill from './components/DailyBill'

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
    console.log('billList: ',billList);
    

    const monthGroup = useMemo(() => {
        return _.groupBy(billList, item => dayjs(item.date).format("YYYY | MMMM"))

    }, [billList])

    console.log('monthGroup',monthGroup);
    

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

    useEffect(()=>{
        const nowDate = dayjs(new Date()).format("YYYY | MMMM")
        setCurrentMonthBill(monthGroup[nowDate]||[])
    },[monthGroup])

    //Group the bill of a day in the same month
    const dayGroup =useMemo(()=>{
        const groupData = _.groupBy(currentMonthBill,item=>dayjs(item.date).format('YYYY / MM / DD'))
        const keys = Object.keys(groupData)
        
        
        return {
            groupData,
            keys
        }
    },[currentMonthBill])

    console.log(dayGroup);
    
    //assign the keys in ascending order
    const sortedKeys = dayGroup.keys.sort((a, b) => new Date(a) - new Date(b));
    

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
                        confirmText={"Confirm"}
                        cancelText={"Cancel"}
                    />
                    
                </div>
                
                {
                    sortedKeys.map(item=><DailyBill key={item} date={item} billList={dayGroup.groupData[item]}/>)
                }
            </div>
            
        </div >
    )
}

export default Month