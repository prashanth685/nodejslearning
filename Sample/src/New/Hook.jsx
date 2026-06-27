import React, { useEffect, useState } from "react";
const Hook = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("runnnig");
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    console.log(count);
  }, [count]);
  return (
    <>
      <h1>Hello</h1>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>
    </>
  );
};
export default Hook;
