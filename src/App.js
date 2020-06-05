import React from 'react';
import SearchForCity from './components/SearchForCity'
import './App.css'
import {BackgroundProvider} from './context/BackgroundProvider'

function App() {
  return (
    <BackgroundProvider>
      
        <div className='container'>
          <SearchForCity />  
      </div>
    </BackgroundProvider>
  );
}

export default App;
