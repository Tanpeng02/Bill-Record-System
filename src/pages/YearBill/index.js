import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import { fetchBillList } from '@/store/modules/billStore'
import { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import dayjs from 'dayjs'
import classNames from 'classnames'
import MonthlyBill from './components/MonthlyBill'

const YearBill = () => {
    

    const { billList } = useSelector(state => state.bill)

    const yearGroup = useMemo(()=>{
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY'))
    },[billList])

    const [currentYear, setCurrentYear] = useState(dayjs(new Date()).format('YYYY'))

    const [visibleDate, setVisibleDate] = useState(false)

    const confirmDate = (value) => {
        const dateFormat = dayjs(value).format('YYYY')
        setCurrentYear(dateFormat)
        setCurrentYearBill(yearGroup[dateFormat] || [])
    }

    const [currentYearBill, setCurrentYearBill] = useState([])

    const yearResult = useMemo(() => {

        const expense = currentYearBill.filter((item) => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentYearBill.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)

        return {
            expense,
            income,
            total: expense + income
        }

    },[currentYearBill])

    useEffect(() => {
        const nowDate = dayjs(new Date()).format('YYYY')
        setCurrentYearBill(yearGroup[nowDate]||[])
    }, [yearGroup])

    const monthGroup = useMemo(()=>{
        const groupDatas = _.groupBy(currentYearBill,item=>dayjs(item.date).format('YYYY MMMM'))
        const keys = Object.keys(groupDatas)
        return {
            groupDatas,
            keys
        }
    },[currentYearBill])

    console.log('MG: ',monthGroup);
    
    const sortedKeys = monthGroup.keys.sort((a,b)=>new Date(a)-new Date(b))

    return (
        <div className="yearlyBill">
            <NavBar className="nav" backArrow={false}>
                Yearly Financial Summary
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date">
                        <span className="text">
                            {currentYear + ''} Bill
                        </span>
                        <span className={classNames('arrow ', visibleDate && 'expand')} onClick={() => { setVisibleDate(!visibleDate) }}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{yearResult.expense.toFixed(2)}</span>
                            <span className="type">Expense</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.income.toFixed(2)}</span>
                            <span className="type">Income</span>
                        </div>
                        <div className="item">
                            <span className="money">{yearResult.total.toFixed(2)}</span>
                            <span className="type">Balance</span>
                        </div>
                        
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="Bill Record Date"
                        precision="year"
                        visible={visibleDate}
                        max={new Date()}
                        onClose={() => { setVisibleDate(false) }}
                        onConfirm={confirmDate}
                    />

                    
                </div>
                
                {
                    
                    sortedKeys.map((item)=><MonthlyBill key={item} date={item} billList={monthGroup.groupDatas[item]}/>)
                }
            </div>
            
        </div >
    )
}

export default YearBill