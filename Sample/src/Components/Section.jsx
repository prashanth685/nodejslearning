import React, { useState } from "react";

const Section = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      question: "Who are You?",
      Answer: "Iam God! God is Great",
    },
    {
      question: "Are You Okay?",
      Answer: "Iam Damn Okay",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  return (
    <>
      <div>
        <h2>FAQS</h2>
        <div>
            {faqs.map((item,index)=>(
                <div key={index}>
                    
                </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Section;
