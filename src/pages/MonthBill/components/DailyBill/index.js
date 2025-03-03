import classNames from 'classnames'
import './index.scss'
import { useMemo , useState} from 'react'
import Icon from '@/pages/components/icon'

const DailyBill = ({ date, billList }) => {
    const dayResult = useMemo(() => {
        const expense = billList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)
        return {
            expense,
            income,
            total: expense + income
        }
    }, [billList])

    const [visible,setVisible]= useState(false)
    const active=()=>{
        setVisible(!visible)
    }
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span onClick={active} className={classNames('arrow',visible && 'expand') }></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">Expense</span>
                        <span className="money">{dayResult.expense.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">Income</span>
                        <span className="money">{dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">Balance</span>
                    </div>
                </div>
            </div>
            <div className="billList" style={{display: visible?'block':'none'}}>
                {billList.map(item => {
                    return (
                        <div className="bill" key={item.id}>
                            <Icon type={item.useFor}/>
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
export default DailyBill