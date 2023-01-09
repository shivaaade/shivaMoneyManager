// Write your code here

const Welcome = props => {
  const {details, onDeleteFirst} = props
  const {title, amount, id, status} = details

  const onDelete = () => {
    onDeleteFirst(id)
  }

  return (
    <li>
      <div className="history">
        <p>{title}</p>
        <p>{amount}</p>
        <p>{status}</p>
        <button data-testid="delete" onClick={onDelete} type="button">
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          />
        </button>
      </div>
    </li>
  )
}

export default Welcome
