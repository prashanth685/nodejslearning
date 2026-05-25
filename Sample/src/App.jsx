import React, { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [lists, setLists] = useState(["Alaram", "Sleep", "Wakeup"]);
  const [search, setsearch] = useState("");
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = (e) => {
    setsearch(e.target.value);
  };

  const filteredlist = lists.filter((item) => {
    return item.toLowerCase().includes(search.toLowerCase());
  });
  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    // Validation example
    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    setError("");

    console.log("Form Submitted:", form);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Signed in successfully!");
    }, 1000);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          name="password"
          id="password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">{loading ? "Signing..." : "Sign in"}</button>
        {modal && (
          <div>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Hic omnis,
            pariatur impedit dolorem odit laudantium quidem accusamus aut
            sapiente ut consequatur dolorum. Cumque voluptatem expedita porro
            veritatis minima quidem consequatur!
          </div>
        )}
      </form>
      <input
        type="search"
        name="search"
        id="search"
        value={search}
        onChange={handleSearch}
      />
      <div>
        <ul>
          {/* {lists.map((item, index) => (
            <li key={index}>{item}</li>
          ))} */}
          {filteredlist.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
