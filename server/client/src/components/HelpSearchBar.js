import React, { useContext } from "react";
import { HelpContext } from "../utils/helpContext";

const HelpSearchBar = ({ value, onChange, setSelectedFAQ }) => {
  // const { setSelectedFAQ } = useContext(HelpContext);
  const { faqs, setSelectedCategory } = useContext(HelpContext); // Assuming you have this context

  // Compute suggestions based on search term
  const suggestions = value.trim()
    ? faqs.filter(faq =>
        faq.question.toLowerCase().includes(value.trim().toLowerCase())
      )
    : [];

  const handleSuggestionClick = faq => {
    setSelectedFAQ(faq);
    onChange(""); // Optionally clear the search bar here
  };

  const handleInputChange = e => {
    onChange(e.target.value);
  };

  const handleInputFocus = () => {
    setSelectedFAQ(null); // Reset selected FAQ when input gains focus
    setSelectedCategory(null);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      onChange(""); // Clear search bar on enter key press
      if (e.target.value === "") {
        setSelectedFAQ(null); // Reset selected FAQ when search term is cleared
      }
    }
  };

  const handleInputBlur = () => {
    setSelectedFAQ(null); // Reset selected FAQ when input loses focus
  };

  // Rest of your code
  return (
    <div className="help-searchbar-container">
      <h1 className="help-main-header">Frequently Asked Questions</h1>
      <input
        type="text"
        placeholder="Search FAQs..."
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        onKeyPress={handleKeyPress}
      />{" "}
      {suggestions.length > 0 &&
        <div className="suggestions-dropdown">
          {suggestions.map(faq =>
            <div
              key={faq.id}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(faq)}
            >
              {faq.question}
            </div>
          )}
        </div>}
    </div>
  );
};

export default HelpSearchBar;
