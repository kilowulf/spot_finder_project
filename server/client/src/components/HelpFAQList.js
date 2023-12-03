import React, { useContext } from "react";
import { HelpContext } from "../utils/helpContext";
import HelpFAQItem from "./HelpFAQItem";

const HelpFAQList = () => {
  const { faqs, selectedFAQ, selectedCategory } = useContext(HelpContext);
  let faqsToDisplay = [];

  if (selectedFAQ) {
    faqsToDisplay = [selectedFAQ];
  } else if (selectedCategory) {
    faqsToDisplay = faqs.filter(faq => faq.category === selectedCategory);
  }

  return (
    <div className="help-faq-list-container">
      {faqsToDisplay.map(faq => <HelpFAQItem key={faq.id} faq={faq} />)}
    </div>
  );
};

export default HelpFAQList;
