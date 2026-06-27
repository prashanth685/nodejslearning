// import React from "react";
// import Parent from "./Parent";

// const Child = () => {
//   return (
//     <>
//       <Parent name="ajay" />
//     </>
//   );
// };

// export default Child;

import React from "react";

const Child = ({ children }) => {
  return <div>{children}</div>;
};

export default Child;
