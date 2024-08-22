import React, { useState } from "react";

const HelpFAQItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="help-faq-item-container" onClick={toggleOpen}>
      <h3>{faq.question}</h3>
      {isOpen && (
        <>
          {faq.answer.map((ans, index) => (
            <p key={index}>{ans}</p>
          ))}
          {faq.details && <p><strong>Details:</strong> {faq.details}</p>}
        </>
      )}
    </div>
  );
};

export default HelpFAQItem;
