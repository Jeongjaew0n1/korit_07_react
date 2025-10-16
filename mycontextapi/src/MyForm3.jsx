import { useState } from "react";

function MyForm3() {

  const [ user, setUser ] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  
  // form에서 쓸거라 handleSubmit부터 작성하겠습니다.
  const handleSubmit = (event) => {
    alert(`Hello, ${user.firstName} ${user.lastName}`);
    event.preventDefault();
  }

  // form 태그 썻고 내부에 input 창으로 입력 받을거니까 onChange를 작성할겁니다.
  const handleChange = (event) => {
    setUser({...user, [event.target.name]: [event.target.value]});
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text" name='firstName' onChange={handleChange} value={user.firstName}/>
      <br />
      <label>Last Name : </label>
      <input type="text" name='lastName' onChange={handleChange} value={user.lastName}/>
      <br />
      <label>Email : </label>
      <input type="text" name='email' onChange={handleChange} value={user.email}/>
      <br />
      <input type="submit" value='클릭하세요'/>
      <br /> <br />
    </form>
  );
}
export default MyForm3;