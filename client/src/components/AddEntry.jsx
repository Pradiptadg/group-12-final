import { useState, useRef } from 'react';

import ToggleSwitch from "./ToggleSwitch";
import axios from 'axios'
import React from 'react';
const validator = require('email-validator')

const AddEntry = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [userAge, setAge] = useState('');
  const [toggleWaiver, setToggle] = useState('');
  const [entryList, setEntryList] = useState([])

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null); 



  const waiverBox = document.querySelector('#waiver')

  // CREATE (POST)
  function submitEntry() {
    axios.post(`${process.env.REACT_APP_HOST}/api/create`, { first: firstName, last: lastName, email: emailAddress, age: userAge, toggle: toggleWaiver }).then((response) => {
      setEntryList([...entryList, { first_name: firstName, last_name: lastName, email_address: emailAddress, user_age: userAge, waiver_signed: toggleWaiver}]
      )
    })

    ref1.current.value = ""
    setFirstName('')
    ref2.current.value = ""
    setLastName('')
    ref3.current.value = ""
    setEmailAddress('')
    ref4.current.value = ""
    setAge('')
    ref5.current.value = ""
    setToggle('')
  }
  
  function refreshPage() {
    window.location.reload(false);
  }
  function waiver() {
    window.open('https://www.waiverfile.com');
  }

  function containsNumbers(str) 
{
    return /\d/.test(str);
}


  function valid_Email(email) {

  const valid = validator.validate(email);

  return valid;
    
    
  }

  






  
  return (
    <div className="addEntry">
      <h2>Add an Entry</h2>
      <div id='userInput'>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input ref={ref1} id="firstName" type="text" name="firstName" onChange={(e) => setFirstName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input ref={ref2} id="lastName" type="text" name="lastName" onChange={(e) => setLastName(e.target.value)} />
        </div>
        
        <div className="emailField" >
          <label htmlFor="email">Email Address</label>
          <input ref={ref3} id="email" type="email" name="email" onChange={(e) => setEmailAddress(e.target.value)} />
        </div>
      
        


        <div>
          <label htmlFor="age">Age</label>
          <input ref={ref4} id="age" type="age" name="age" onChange={(e) => setAge(e.target.value)} />
        </div>

         </div>

      <div className="container1">
        <React.Fragment>
        <label htmlFor="toggle">Sign Waiver?</label>
          <ToggleSwitch label ="waiver" />
          <checkbox ref={ref5} id="toggle" type="toggle" name="toggle" onChange={(e) => setToggle(e.target.value)} />
        </React.Fragment>


      </div>

    
      <div id='userInput'>
        <button className="submitBtn"
          onClick={() => {

            if(!valid_Email(emailAddress)) {
              alert("Email invalid!")
            }

            if(firstName==lastName) {
              alert("First and last name cannot be the same!")
            }

            if(containsNumbers(firstName) || containsNumbers(lastName)) {
              alert("First or last name must be valid")

            }

            if(!Number.isInteger(userAge)){
              alert("Age must be valid!")
            }


            else if (firstName.length > 0 && lastName.length > 0 && emailAddress.length > 0 && userAge.length > 0 && !waiverBox.checked) {
              submitEntry(); refreshPage();
            }
            else if (firstName.length > 0 && lastName.length > 0 && emailAddress.length > 0 && userAge.length > 0 && waiverBox.checked){
                  waiver(); submitEntry(); refreshPage();
            }

            else if (firstName.length==0 || lastName.length==0 || emailAddress.length==0 || userAge.length==0 || !waiverBox.checked){
             alert("All fields need to be filled out!")

            }

          


           
      
          }}
        >Add Entry</button>
      </div>

    </div>
  )


}



export default AddEntry;
