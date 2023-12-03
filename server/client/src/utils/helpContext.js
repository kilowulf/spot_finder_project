import React, { createContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FAQS } from "../helpFaqQueries";

export const HelpContext = createContext();

export const HelpProvider = ({ children }) => {
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const { data, loading, error } = useQuery(GET_FAQS);
  const [faqs, setFaqs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(
    () => {
      if (data && data.faq) {
        setFaqs(data.faq);
        const uniqueCategories = [
          ...new Set(
            data.faq
              .map(faq => faq.category)
              .filter(category => category != null)
          )
        ];
        setCategories(uniqueCategories);
      }
    },
    [data]
  );

  // Handle loading and error states as needed

  return (
    <HelpContext.Provider
      value={{
        faqs,
        categories,
        selectedFAQ,
        setSelectedFAQ,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </HelpContext.Provider>
  );
};
