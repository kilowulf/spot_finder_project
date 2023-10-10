export const constructSearchTerm = ({ language, framework }) => {
  let baseQuery = "is:public archived:false";

  if (language) {
    baseQuery += ` language:${language}`;
  }

  if (framework) {
    baseQuery += ` ${framework}`;
  }

  return baseQuery;
};
