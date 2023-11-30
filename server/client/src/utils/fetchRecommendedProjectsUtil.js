// utils/fetchRecommendedProjectsUtil.js
import { constructSearchTerm } from "./constructSearchQuery";

export const fetchRecommendedProjectsUtil = async (
  user,
  searchRecommendedProjects
) => {
  const { experienceLevel, languages, frameworks } = user;

  if (!languages || !frameworks || !experienceLevel) {
    console.error("Missing user data for fetching recommended projects.");
    return;
  }

  const selectedLanguage =
    languages[Math.floor(Math.random() * languages.length)];
  const selectedFramework =
    frameworks[Math.floor(Math.random() * frameworks.length)];

  // set issueLabels by experience level
  let issueLabels = [];
  if (experienceLevel === "Beginner") {
    issueLabels = ["good first issue"];
  } else if (experienceLevel === "Experienced") {
    const labels = ["help wanted", "Bug", "Effort: Casual"];
    issueLabels = [labels[Math.ceil(Math.random() * labels.length)]];
  } else if (experienceLevel === "Professional") {
    const labels = [
      "Design Limitation",
      "Suggestion",
      "Possible Improvement",
      "Experimentation Needed"
    ];
    issueLabels = [labels[Math.ceil(Math.random() * labels.length)]];
  }
  // Construct search query
  console.log("issueLabels: ", issueLabels);
  console.log("selectedLanguage", selectedLanguage);
  console.log("selectedFramework", selectedFramework);
  // Construct the full search term using the selected language and framework
  const fullSearchTerm = constructSearchTerm({
    language: selectedLanguage,
    framework: selectedFramework
  });

  // Prepare parameters for the search
  const params = {
    searchTerm: fullSearchTerm,
    issueLabels: issueLabels
  };
  await searchRecommendedProjects(params);
};
