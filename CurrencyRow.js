import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOption,
        selectCurrency,
        onChange,
        amount,
        handlechange
    } = props
    return (
        <div>
            <input type="number" value={amount} onChange={handlechange} className="input" />
            <select value={selectCurrency} onChange={onChange}>
                {currencyOption.map(option => (
                    <option key={option} value={option}>{option} </option>
                ))}


            </select>
        </div>
    )
}
