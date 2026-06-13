import React, { useState } from "react";

const Login = () => {
  const [formdata, setFormdata] = useState({
    userId: "",
    id: "",
    title: "",
    body: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const postdata = async () => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      console.log("response", data);
      setFormdata({
        userId: "",
        id: "",
        title: "",
        body: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const Onsubmit = (e) => {
    e.preventDefault();
    postdata();
  };
  return (
    <>
      <form onSubmit={Onsubmit}>
        <label htmlFor="userId">userId</label>
        <input
          type="text"
          name="userId"
          value={formdata.userId}
          onChange={handlechange}
        />
        <label htmlFor="id">id</label>
        <input
          type="text"
          name="id"
          value={formdata.id}
          onChange={handlechange}
        />
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          value={formdata.title}
          onChange={handlechange}
        />
        <label htmlFor="body">body</label>
        <input
          type="text"
          name="body"
          value={formdata.body}
          onChange={handlechange}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;
