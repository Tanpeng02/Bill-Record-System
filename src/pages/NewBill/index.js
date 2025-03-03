import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '@/pages/components/icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '@/contants'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { postBillList } from '@/store/modules/billStore'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { fetchBillList } from '@/store/modules/billStore'

const NewBill = () => {
  const navigate = useNavigate()
  const [type, setType] = useState('pay')

  const [money, setMoney] = useState(0)
  const moneyChange = (value) => {
    setMoney(value)
  }

  const [useFor, setUseFor] = useState('')
  const { billList } = useSelector(state => state.bill)
  console.log('BillList: ', billList)

  const dispatch = useDispatch()

  const saveBill = () => {
    const data = {
      type: type,
      money: type === 'pay' ? -money : +money,
      date: date,
      useFor: useFor,
      id: `${billList.length + 1}`
    }

    if (useFor !== '' && money !== 0) {
      dispatch(postBillList(data))
      moneyChange(0)
      setUseFor('')
    }
    console.log(billList);
    
  }

  //DatePicker Setting
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState(new Date())
  const todayDate = dayjs(new Date()).format('YYYY/MM/DD')

  const onConfirm = (date) => {
    setDate(date)
  }

  useEffect(()=>{
    dispatch(fetchBillList())
  },[dispatch])

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate('/month')}>
        Record
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(type === 'pay' ? 'selected' : '')}
            onClick={() => { 
              setType('pay') 
              setUseFor('')
            }}
          >
            Expense
          </Button>
          <Button
            className={classNames(type === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => { 
              setType('income') 
              setUseFor('')
            }}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={() => setDateVisible(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{todayDate === dayjs(date).format('YYYY/MM/DD') ? 'Today' : dayjs(date).format('YYYY/MM/DD')}</span>
              <DatePicker
                className="kaDate"
                title="Bill Record Date"
                max={new Date()}
                visible={dateVisible}
                onClose={() => setDateVisible(false)}
                onConfirm={onConfirm}
                confirmText={"Confirm"}
                cancelText={"Cancel"}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">RM</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[type].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                         useFor === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default NewBill