import React from 'react';
import './App.css';
import AddEntry from '../AddEntry.jsx';
import CurrentEntries from '../CurrentEntries.jsx';
import Footer from '../Footer.jsx';
import Error from './Error.jsx'
import Header from '../Header';
import Waiver from '../Waiver.jsx';



function App() {

  return (


    <div className="App">

      <Header/>




      <h1>Entries</h1>

      <hr/>
      

   

      <AddEntry />
      
      <Waiver/>
      
  
      <hr />
      <CurrentEntries />
      <hr />

      <Footer />
    </div>
  )
}


export default App;

