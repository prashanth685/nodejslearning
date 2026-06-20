import React, { Activity, useState } from "react";

const NewActivity = () => {
  const [visible, setVisible] = useState(true);
  return (
    <>
      <Activity mode={visible ? "visible" : "hidden"}>
        <p>This is Activity</p>
      </Activity>
      <button onClick={() => setVisible(!visible)}>clik toggle</button>
      {visible && (
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad a
          suscipit voluptatum maiores quod? Atque consectetur repudiandae
          dignissimos! Architecto ipsam quod nihil aperiam inventore. Magnam
          voluptates iure facilis dolores odio?
        </div>
      )}
    </>
  );
};

export default NewActivity;
