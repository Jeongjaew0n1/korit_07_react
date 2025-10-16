type HelloProps = {
  name: string; // 얘네는 Java에서 field처럼 느껴집니다.
  age: number;
  fn?: () => void; // 얘는 그럼 Java에서 메서드처럼 느껴집니다. call1() 유형.
  fn2?: (msg) => void; // 얘는 매개변수로 string data를 받고 return 타입이 없습니다. call2() 유형.
}
export default HelloProps;

// 여기 내에 모든 type들을 다 모아두는 편입니다.