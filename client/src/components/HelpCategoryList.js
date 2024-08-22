import React, { useContext } from "react";
import { HelpContext } from "../utils/helpContext";

const HelpCategoryList = () => {
  const { categories, setSelectedCategory, setSelectedFAQ } = useContext(
    HelpContext
  );

  const handleCategoryClick = category => {
    setSelectedFAQ(null); // Reset selected FAQ
    // Logic to display FAQs from the selected category
    setSelectedCategory(category);
  };

  return (
    <div className="help-category-list-container">
      {categories.map(category =>
        <button
          className="help-category-item"
          key={category}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      )}
    </div>
  );
};

export default HelpCategoryList;
