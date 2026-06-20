// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { decrement, increment } from "../app/slices/counter";

// const Counter = () => {
//   const count = useSelector((state) => state.counter.value);
//   const dispatch = useDispatch();
//   return (
//     <>
//       <h2>Count {count}</h2>
//       <button onClick={() => dispatch(increment())}>increment</button>
//       <button onClick={() => dispatch(decrement())}>decrement</button>
//     </>
//   );
// };

// export default Counter;

import { useEffect, useRef, useState } from "react";

function Counter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;

          const timer = setInterval(() => {
            start += Math.ceil(target / 100);

            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 20);

          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref}>
      <h2>{count}+</h2>
      <p>{label}</p>
    </div>
  );
}

export default function Stats() {
  return (
    <div className="flex gap-10">
      <Counter target={200} label="Happy Clients" />
      <Counter target={20} label="Years of Experience" />
    </div>
  );
}
