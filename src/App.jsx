import { useState } from 'react'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import PriceCalculator from './components/PriceCalculator';
import './App.css'

function App() {
  

  return (
    <ApolloProvider client={client}>
      <h1 className='text-2xl mb-2'>Bitcoin Price Calculator</h1>
      <div className="flex justify-center">
        
        
        <PriceCalculator />
      </div>
    </ApolloProvider>
  )
}

export default App
