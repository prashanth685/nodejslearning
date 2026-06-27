// import React from "react";

// const Parent = ({ name }) => {
//   return (
//     <>
//       <h2>{name}</h2>
//     </>
//   );
// };

// export default Parent;

import React from "react";
import Child from "./Child";

const Parent = () => {
  return (
    <div>
      <Child>
        <h1>Hello,</h1>
        <p>from React</p>
      </Child>
    </div>
  );
};

export default Parent;
