import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { TbCurrencyNaira } from "react-icons/tb";

const CALCULATE_PRICE = gql`
  query CalculatePrice($type: TradeType!, $margin: Float!, $exchangeRate: Float!) {
    calculatePrice(type: $type, margin: $margin, exchangeRate: $exchangeRate)
  }
`;

function PriceCalculator() {
  const [type, setType] = useState('buy');
  const [margin, setMargin] = useState(0.2);
  const [exchangeRate, setExchangeRate] = useState(500);
  const [calculatePrice, { loading, error, data }] = useLazyQuery(CALCULATE_PRICE);

  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePrice({ variables: { type, margin: parseFloat(margin), exchangeRate: parseFloat(exchangeRate) } });
  };

  return (
    <div>
      <div className="card glass bg-pink-300 w-96 shadow-xl">
          <div className="card-body">
          <form onSubmit={handleSubmit}>
        <div>
          <label>
          <span className='mr-2 pt-2 font-bold'>Type:</span>
            <select className="select select-primary max-w-xs" value={type} onChange={(e) => setType(e.target.value)}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
        </div>
        <div>
          <label>
          <span className='mr-2  font-bold'>Margin (%):</span>
            <input type="number" className="w-1/4 mt-2 input input-bordered max-w-xs" value={margin} onChange={(e) => setMargin(e.target.value)} step="0.1" />
          </label>
        </div>
        <div>
          <label>
           <span className='mr-1 '>Exchange Rate (NGN/USD):</span> 
            <input className="w-1/5 pl-2 mt-2 input input-bordered max-w-xs" type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} step="0.01" />
          </label>
        </div>
        
        <button className="btn btn-accent" type="submit">Calculate Price</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div className="stats shadow">
          <div className="stat">
          <p >Price: <span className="badge badge-success badge-lg">{moneyFormatter.format(data.calculatePrice.toFixed(2))} </span></p>
          </div>
        </div>
      )}
          </div>
        </div>
      

      
    </div>
  );
}

export default PriceCalculator;