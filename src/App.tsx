import { useState } from 'react'
import './App.css'
import Slider from './Slider'

const App = () =>  {

  return (
    <div className="App">
      <Slider min={0} max={2000}></Slider>
    </div>
  )
}

export default App
