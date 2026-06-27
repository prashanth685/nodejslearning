// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Method = () => {
//   const [post, setPost] = useState([]);
//   const fetchpost = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
//     console.log(res.data);
//     setPost(res.data);
//   };
//   useEffect(() => {
//     fetchpost();
//   }, []);
//   return (
//     <>
//       {post && (
//         <ul>
//           <li>{post.id}</li>
//         </ul>
//       )}
//     </>
//   );
// };
// export default Method;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Method = () => {
  const [post, setPost] = useState([]);

  const fetchpost = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    setPost(res.data);
  };

  useEffect(() => {
    fetchpost();
  }, []);

  return (
    <div>
      {post.map((item, index) => (
        <ul key={index}>
          <li>Title: {item.title}</li>
          <li>User ID: {item.userId}</li>
          {/* <li>ID: {post.id}</li>
          <li>Completed: {post.completed ? "Yes" : "No"}</li> */}
        </ul>
      ))}
    </div>
  );
};

export default Method;
