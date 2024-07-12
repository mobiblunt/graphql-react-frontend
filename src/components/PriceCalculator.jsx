import React, { useState } from 'react';
import { useLazyQuery, gql } from '@apollo/client';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    calculatePrice({ variables: { type, margin: parseFloat(margin), exchangeRate: parseFloat(exchangeRate) } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="buy">Buy</option>
              <option value="sell">Sell</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Margin (%):
            <input type="number" value={margin} onChange={(e) => setMargin(e.target.value)} step="0.1" />
          </label>
        </div>
        <div>
          <label>
            Exchange Rate (NGN/USD):
            <input type="number" value={exchangeRate} onChange={(e) => setExchangeRate(e.target.value)} step="0.01" />
          </label>
        </div>
        <button type="submit">Calculate Price</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Result:</h2>
          <p>Price: {data.calculatePrice.toFixed(2)} NGN</p>
        </div>
      )}
    </div>
  );
}

export default PriceCalculator;