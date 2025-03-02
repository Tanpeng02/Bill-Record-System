import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import dayjs from 'dayjs'
import {useState,useMemo} from 'react'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import _ from 'lodash'

const Month = () => {
    const [dateVisible,setDateVisible]=useState(false)
    const [currentDate,setCurrentDate]=useState(()=>{new Date()})

    const dateFormat = dayjs(currentDate).format('YYYY | MMMM')

    const openDatePicker=()=>{
        setDateVisible(true)
    }
    const onConfirm = (date)=>{
        console.log(date);
        
        setCurrentDate(date)
        console.log(monthGroup);
        
    }

    const {billList} = useSelector(state=>state.bill)
    const monthGroup = useMemo(()=>{
        return _.groupBy(billList,(item)=>dayjs(item.date).format("YYYY | MMMM"))
        
    },[billList])
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
              {dateFormat} Bill  
            </span>
            <span className={classNames('arrow',dateVisible && 'expand')} onClick={openDatePicker}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{100}</span>
              <span className="type">Expense</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
              <span className="type">Income</span>
            </div>
            <div className="item">
              <span className="money">{200}</span>
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
            onClose={()=>setDateVisible(false)}
          />
        </div>
      </div>
    </div >
  )
}

export default Month