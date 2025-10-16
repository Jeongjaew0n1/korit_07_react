import { useState } from "react";

function MyForm3() {

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName} ${lastName}`);
    event.preventDefault();
  }

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  }

  const handleEamilChange = (event) => {
    setEmail(event.target.value);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text" name='firstName' onChange={handleFirstNameChange} value={firstName}/>
      <br />
      <label>Last Name : </label>
      <input type="text" name='lastName' onChange={handleLastNameChange} value={lastName}/>
      <br />
      <label>Email : </label>
      <input type="text" name='email' onChange={handleEamilChange} value={email}/>
      <br />
      <input type="submit" value='클릭하세요'/>
      <br /> <br />
    </form>
  );
}
export default MyForm3;