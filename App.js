import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow'
import About from './About';
const BASE_URL = 'https://open.er-api.com/v6/latest/USD'
function App() {
  const [currencyOption, setCurrencyOption] = useState([])//to set or import options
  const [fromCurrency, setFromcurrency] = useState()//to set the display value in form
  //later with the help of events and onchange we can use it to set the currency
  const [toCurrency, setTocurrency] = useState()//same setting intital value in toform
  const [amount, setAmount] = useState(1)//iniital value in numbr box
  const [exchangerate, setExchangerate] = useState()
  const [amountinFormcurrency, setamountinFormcurrency] = useState(true)//true if changes are made in  form currency else false
  console.log(exchangerate)


  let toamount, fromamount;
  if (amountinFormcurrency) {
    fromamount = amount
    toamount = amount * exchangerate
  } else {
    toamount = amount
    fromamount = amount / exchangerate
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0]
        const Currency = Object.keys(data.rates)[1]
        setCurrencyOption([data.base, ...Object.keys(data.rates)])
        setFromcurrency(Currency)
        setTocurrency(firstCurrency)
        setExchangerate(data.rates[firstCurrency])
      }
      )
  }, [])
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangerate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])
  function handlefromchange(e) {
    setAmount(e.target.value)
    setamountinFormcurrency(true)
  }

  function handletochange(e) {
    setAmount(e.target.value)
    setamountinFormcurrency(false)
  }
  return (
    <>

      <h1>Convert</h1>
      <CurrencyRow currencyOption={currencyOption}
        onChange={e => setFromcurrency(e.target.value)}
        selectCurrency={fromCurrency}//the initial display value
        amount={fromamount}
        handlechange={handlefromchange} />
      <div className="equals">=</div>
      <CurrencyRow currencyOption={currencyOption}
        onChange={e => setTocurrency(e.target.value)}
        handlechange={handletochange}
        selectCurrency={toCurrency}
        amount={toamount} />

    </>
  );
}

export default App;