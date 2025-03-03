import classNames from 'classnames'
import './index.scss'
import { useState, useMemo } from 'react'

const MonthlyBill = ({ date, billList }) => {

  const [detailsVisible, setDetailsVisible] = useState(false)

  const monthResult = useMemo(() => {
    const expense = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
    const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)

    return {
      expense,
      income,
      total: expense + income
    }
  }, [billList])

  return (
    <div className={classNames('dailyBill')}>
      <div className="header">
        <div className="dateIcon">
          <span className="date">{date}</span>
          <span className={classNames('arrow', detailsVisible && 'expand')} onClick={() => setDetailsVisible(!detailsVisible)}></span>
        </div>
        <div className="oneLineOverview">
          <div className="pay">
            <span className="type">Expense</span>
            <span className="money">{monthResult.expense.toFixed(2)}</span>
          </div>
          <div className="income">
            <span className="type">Income</span>
            <span className="money">{monthResult.income.toFixed(2)}</span>
          </div>
          <div className="balance">
            <span className="money">{monthResult.total.toFixed(2)}</span>
            <span className="type">Balance</span>
          </div>
        </div>
      </div>
      <div className="billList" style={{ display: detailsVisible ? 'block' : 'none' }}>
        {billList.map(item => {
          return (
            <div className="bill" key={item.id}>
              <div className="detail">
                <div className="billType">{item.useFor}</div>
              </div>
              <div className={classNames('money', item.type)}>
                {item.money.toFixed(2)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default MonthlyBill