import { useState } from 'react'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import PriceCalculator from './components/PriceCalculator';
import './App.css'

function App() {
  

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Bitcoin Price Calculator</h1>
        <PriceCalculator />
      </div>
    </ApolloProvider>
  )
}

export default App
