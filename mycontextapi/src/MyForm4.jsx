import { useState } from "react";

function MyForm3() {

  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ email, setEmail ] = useState('');
  
  const handleSubmit = (event) => {
    alert(`Hello, ${firstName} ${lastName}`);
    event.preventDefault();
  }
  return(
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text" onChange={e=> setFirstName(e.target.value)}/>
      <br />
      <label>Last Name : </label>
      <input type="text" onChange={e=> setLastName(e.target.value)}/>
      <br />
      <label>Email : </label>
      <input type="text" onChange={e=> setEmail(e.target.value)}/>
      <br />
      <input type="submit" value='클릭하세요'/>
      <br /> <br />
    </form>
  );
}
export default MyForm3;