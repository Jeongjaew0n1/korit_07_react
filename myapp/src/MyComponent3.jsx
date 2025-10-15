import { useState } from "react";

function MyComponent3() {
  const [ count1, setCount1 ] = useState(0);
  const [ count2, setCount2 ] = useState(0);

  const increment = () => {
    setCount1(count1 + 1);
    setCount2(count2 + 1);
  }

  return (
    <div>
      <p>현재 값 : {count1} ⭐ {count2}</p>
      <button onClick={increment}> 증가 </button>
    </div>
  );
}

export default MyComponent3;
