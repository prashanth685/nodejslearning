import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "../app/slices/counter";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <>
      <h2>Count {count}</h2>
      <button onClick={() => dispatch(increment())}>increment</button>
      <button onClick={() => dispatch(decrement())}>decrement</button>
    </>
  );
};

export default Counter;
