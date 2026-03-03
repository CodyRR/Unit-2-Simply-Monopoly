import { useState } from 'react'
import HomePage from './pages/HomePage'
import RulesPage from './pages/RulesPage'
import OptionsPage from './pages/OptionPage'
import GamePage from './pages/GamePage'
import AboutPage from './pages/AboutPage'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { Route, Routes, Navigate } from 'react-router'
import './App.css'
import ResultsPage from './pages/ResultsPage'
import { defaultPlayerData } from './data/defaultPlayerData'
import Players from './classes/Player'


function App() {

  const playerArray = [];
  const defaultArray = [];
  const defaultGameOption = {
    turnNumber: 10,
    diceStyle: 1,
    passGoAmount: 200
  }

  let gameOptions = {
    turnNumber: 10,
    diceStyle: 1,
    passGoAmount: 200
  }

  defaultPlayerData.forEach(function(playerData) {

    playerArray.push( new Players(playerData[0], playerData[1], playerData[2], playerData[3]))
    defaultArray.push( new Players(playerData[0], playerData[1], playerData[2], playerData[3]))
  });

  const [thePlayers, setThePlayers] = useState(playerArray);
  const [defaultPlayers, setDefaultPlayers] = useState(defaultArray);
  const [generalOptions, setGeneralOptions] = useState(gameOptions);
  const [defaultOption, setDefaultOption] = useState(defaultGameOption);

  return (
    <div id='body-container'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/rules' element={<RulesPage />} />
        <Route path='/options' element={<OptionsPage thePlayers={thePlayers} setThePlayers={setThePlayers} defaultPlayers={defaultPlayers} generalOptions={generalOptions} setGeneralOptions={setGeneralOptions} defaultOption={defaultOption} />} />
        <Route path='/game' element={<GamePage thePlayers={thePlayers} setThePlayers={setThePlayers} generalOptions={generalOptions}/>} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/results' element={<ResultsPage thePlayers={thePlayers} setThePlayers={setThePlayers} defaultPlayers={defaultPlayers} setGeneralOptions={setGeneralOptions} defaultOption={defaultOption}/>} />
        <Route path='*' element={<Navigate to='/' />} />'
      </Routes>
      <Footer />
    </div>
  )
}

export default App
