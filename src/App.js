import './App.css';

import React, { useState } from 'react'
import News from './Components/News';
import NavBar from './Components/Navbar';
import {
  Routes,
  Route,
  BrowserRouter
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const apiKey = process.env.REACT_APP_NEWS_API

  const [progress, setP] = useState(10)

  const setProgress = (progress) => {
    setP(progress)
  }


  return (
    <div>
      <BrowserRouter>

        <NavBar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        // onLoaderFinished={() => setProgress(0)}
        />
        <Routes>
          <Route path='/' element={<News setProgress={setProgress} apiKey={apiKey} category="general" />}></Route>
          <Route path='/General' element={<News setProgress={setProgress} apiKey={apiKey} category="general" />}></Route>
          <Route path='/Business' element={<News setProgress={setProgress} apiKey={apiKey} category="business" />}></Route>
          <Route path='/Entertainment' element={<News setProgress={setProgress} apiKey={apiKey} category="entertainment" />}></Route>
          <Route path='/Health' element={<News setProgress={setProgress} apiKey={apiKey} category="health" />}></Route>
          <Route path='/General' element={<News setProgress={setProgress} apiKey={apiKey} category="general" />}></Route>
          <Route path='/Science' element={<News setProgress={setProgress} apiKey={apiKey} category="science" />}></Route>
          <Route path='/Sports' element={<News setProgress={setProgress} apiKey={apiKey} category="sports" />}></Route>
          <Route path='/Technology' element={<News setProgress={setProgress} apiKey={apiKey} category="technology" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )

}
export default App