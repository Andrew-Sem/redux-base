import React from "react"
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customerReducer";
import {fetchCustomers} from "./asyncActions/customers";

function App() {
	const dispatch = useDispatch()
	const cash = useSelector(state => state.cash.cash)
	const customers = useSelector((state => state.customers.customers))

	const addCash = (cash) => {
		dispatch({type: "ADD_CASH", payload: cash})
	}
	const getCash = (cash) => {
		dispatch({type: "GET_CASH", payload: cash})
	}

	const addCustomer = (name) => {
		const customer = {
			name,
			id: Date.now()
		}
		dispatch(addCustomerAction(customer))
	}

	const removeCustomer = (customer) => {
		dispatch(removeCustomerAction(customer.id))
	}

	const foo = () => {
		dispatch(fetchCustomers())
		console.log(customers);
	}

	return (
		<div className="App">
			<div style={{fontSize: "3rem"}}>{cash}</div>
			<div style={{display: "flex"}}>
				<button className={"btn"} onClick={() => addCash(Number(prompt()))}>Пополнить счёт</button>
				<button className={"btn"} onClick={() => getCash(Number(prompt()))}>Снять со счёта</button>
				<button className={"btn"} onClick={() => addCustomer(prompt())}>Добавить клиента</button>
				<button className={"btn"} onClick={() => foo()}>Получить клиентов из базы</button>
			</div>
			{customers.length
				?
				<div style={{marginTop: 20}}>
					{customers.map(customer =>
						<div className={"customer"} onClick={() => removeCustomer(customer)} key={customer.id}>
							{customer.name}
						</div>)}
				</div>
				:
				<div style={{fontSize: "2rem", marginTop: 20}}>Нет клиентов</div>
			}
		</div>
	);
}

export default App;
