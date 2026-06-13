import React, { useState } from "react";

export default function Bill() {
  const [items, setItems] = useState([{ name: "", qty: 1, price: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = field === "name" ? value : Number(value);
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", qty: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  const getTotal = () => {
    return items.reduce((sum, item) => sum + item.qty * item.price, 0);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Billing Form</h2>

      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: 10 }}>
          <input
            placeholder="Item name"
            value={item.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
          />

          <input
            type="number"
            placeholder="Qty"
            value={item.qty}
            onChange={(e) => handleChange(index, "qty", e.target.value)}
            style={{ width: 60, marginLeft: 5 }}
          />

          <input
            type="number"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleChange(index, "price", e.target.value)}
            style={{ width: 80, marginLeft: 5 }}
          />

          <button onClick={() => removeItem(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addItem}>+ Add Item</button>

      <h3>Total: ₹{getTotal()}</h3>

      <button onClick={handlePrint}>Print Bill</button>
    </div>
  );
}
