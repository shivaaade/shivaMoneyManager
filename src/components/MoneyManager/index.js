import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Welcome from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here

class MoneyManager extends Component {
  state = {
    first: [],
    bal: 0,
    inc: 0,
    expen: 0,
    status: 'Income',
    title: '',
    amount: '',
  }

  onChangeType = e => {
    this.setState({status: e.target.value})
  }

  onSubmitForm = e => {
    e.preventDefault()

    const {status, title, amount} = this.state

    if (status === 'Income') {
      this.setState(prev => ({
        bal: prev.bal + parseInt(amount),
        inc: prev.inc + parseInt(amount),
      }))
    } else {
      this.setState(prev => ({
        bal: prev.bal - parseInt(amount),
        expen: prev.expen + parseInt(amount),
      }))
    }

    const newVal = {
      id: uuidv4(),
      status,
      title,
      amount,
    }

    this.setState(prev => ({
      first: [...prev.first, newVal],
      title: '',
      amount: '',
    }))
  }

  onChangeTitle = e => {
    this.setState({title: e.target.value})
  }

  onChangeAmount = e => {
    this.setState({amount: e.target.value})
  }

  onDeleteFirst = id => {
    const {first} = this.state
    const second = first.filter(each => each.id === id)
    const third = first.filter(each => each.id !== id)
    const {amount, status} = second[0]

    if (status === 'Income') {
      this.setState(prev => ({
        first: third,
        bal: prev.bal - parseInt(amount),
        inc: prev.inc - parseInt(amount),
      }))
    } else {
      this.setState(prev => ({
        first: third,
        bal: prev.bal + parseInt(amount),
        expen: prev.expen - parseInt(amount),
      }))
    }
  }

  render() {
    const {first, status, bal, inc, expen, title, amount} = this.state

    return (
      <div>
        <h1>Hi, Richard</h1>
        <p>Welcome back to your Money Manager</p>
        <ul>
          <li key="1">
            <img
              alt="balance"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png "
            />
            <p>Your Balance</p>
            <p data-testid="balanceAmount">rs {bal}</p>
          </li>
          <li key="2">
            <img
              alt="income"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            />
            <p>Your Income</p>
            <p data-testid="incomeAmount">rs {inc}</p>
          </li>
          <li key="3">
            <img
              alt="expenses"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            />
            <p>Your Expenses</p>
            <p data-testid="expensesAmount">rs {expen}</p>
          </li>
        </ul>
        <div>
          <form onSubmit={this.onSubmitForm}>
            <h1>Add Transaction</h1>
            <label htmlFor="title1">TITLE</label>
            <input
              value={title}
              onChange={this.onChangeTitle}
              type="text"
              placeholder="TITLE"
              id="title1"
            />
            <label htmlFor="amount">Amount</label>
            <input
              value={amount}
              onChange={this.onChangeAmount}
              type="text"
              placeholder="Amount"
              id="amount"
            />
            <label htmlFor="status">Type</label>
            <select value={status} id="status" onChange={this.onChangeType}>
              {transactionTypeOptions.map(each => (
                <option value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
        </div>
        <h1>History</h1>
        <div className="history">
          <p>Title</p>
          <p>Amount</p>
          <p>Type</p>
        </div>
        <ul>
          {first.map(each => (
            <Welcome
              key={each.id}
              onDeleteFirst={this.onDeleteFirst}
              details={each}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default MoneyManager
