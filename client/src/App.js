import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Coin from './Coin';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data);
        // console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <h1 className="title">Crypto Currency</h1>
      <div className="coin-search">
        <h1 className="coin-text">Search a currency</h1>
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
 
    <div className="table-header">
      <p style={{width:"250px"}}></p>
      <p style={{width:"150px"}}>NAME</p>
      <p style={{width:"160px"}}>Symbol</p>
      <p style={{width:"140px"}}>Price</p>
      <p style={{width:"110px"}}>Volume</p>
      <p style={{width:"100px"}}>% Change</p>
      <p style={{width:"90px"}}>High (24h)</p>
      <p style={{width:"130px"}}>Low (24h)</p>
      <p style={{width:"170px"}}>Market Cap</p>
    </div>

      {
        filteredCoins.map(coin => {
          return (
            <Coin 
            key={coin.id} 
            name={coin.name} 
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            high={coin.high_24h}
            low={coin.low_24h}
            marketcap={coin.market_cap}
            />
            )
          })
        }
      
    </div>
  );
}

export default App;
