import React, { useState } from "react";

export default function New() {
  const [rows, setRows] = useState([{ deviceName: "", slaveId: "" }]);

  // 🔥 Get unique dropdown options dynamically
  const deviceOptions = [
    ...new Set(rows.map((r) => r.deviceName).filter(Boolean)),
  ];
  const slaveOptions = [...new Set(rows.map((r) => r.slaveId).filter(Boolean))];

  const handleAddRow = () => {
    setRows((prev) => [...prev, { deviceName: "", slaveId: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;

    // 🔥 If slaveId entered → auto-fill deviceName if exists
    if (field === "slaveId") {
      const match = rows.find((r) => r.slaveId === value);
      if (match?.deviceName) {
        updated[index].deviceName = match.deviceName;
      }
    }

    // 🔥 If deviceName entered → auto-fill slaveId if exists
    if (field === "deviceName") {
      const match = rows.find((r) => r.deviceName === value);
      if (match?.slaveId) {
        updated[index].slaveId = match.slaveId;
      }
    }

    setRows(updated);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Device - Slave Mapping</h3>

      <button onClick={handleAddRow}>Add Row</button>

      <table border="1" cellPadding="8" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Device Name</th>
            <th>Slave Id</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {/* DEVICE NAME */}
              <td>
                <input
                  list={`device-list-${index}`}
                  value={row.deviceName}
                  placeholder="Type or select device"
                  onChange={(e) =>
                    handleChange(index, "deviceName", e.target.value)
                  }
                />

                <datalist id={`device-list-${index}`}>
                  {deviceOptions.map((opt, i) => (
                    <option key={i} value={opt} />
                  ))}
                </datalist>
              </td>

              {/* SLAVE ID */}
              <td>
                <input
                  list={`slave-list-${index}`}
                  value={row.slaveId}
                  placeholder="Type or select slave id"
                  onChange={(e) =>
                    handleChange(index, "slaveId", e.target.value)
                  }
                />

                <datalist id={`slave-list-${index}`}>
                  {slaveOptions.map((opt, i) => (
                    <option key={i} value={opt} />
                  ))}
                </datalist>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
