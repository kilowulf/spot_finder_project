import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FAQS } from "../helpFaqQueries";
import { HelpContext } from "../utils/helpContext";
import HelpSearchBar from "./HelpSearchBar";
import HelpCategoryList from "./HelpCategoryList";
import HelpFAQList from "./HelpFAQList";

const HelpPage = () => {
  const { data, loading, error } = useQuery(GET_FAQS);
  const { setSelectedFAQ } = useContext(HelpContext);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(
    () => {
      // if (data) {
      //   setSelectedFAQ(null); // Reset selected FAQ when data changes or search term changes
      // }
    },
    [data, searchTerm, setSelectedFAQ]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <HelpSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        setSelectedFAQ={setSelectedFAQ}
      />
      <HelpCategoryList />
      <HelpFAQList />
    </div>
  );
};

export default HelpPage;
