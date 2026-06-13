import { useState } from "react";

export default function UseForm() {
  const [rows, setRows] = useState([
    {
      deviceName: "VM8000",
      parameter: "P1",
      unit: "m/s",
    },
  ]);

  const addParameter = () => {
    const lastRow = rows[rows.length - 1];

    const currentNo = parseInt(lastRow.parameter.replace("P", ""));

    setRows([
      ...rows,
      {
        deviceName: lastRow.deviceName,
        parameter: `P${currentNo + 1}`,
        unit: lastRow.unit,
      },
    ]);
  };

  return (
    <>
      {rows.map((row, index) => (
        <div key={index} className="border-2">
          <input value={row.deviceName} readOnly />
          <input value={row.parameter} readOnly />
          <input value={row.unit} readOnly />
        </div>
      ))}

      <button
        onClick={addParameter}
        className="px-2 bg-blue-500 py-2 rounded-2xl text-white cursor-pointer"
      >
        Add Parameter
      </button>
    </>
  );
}
