import React, { useState, useEffect } from "react";
import {
  BiSolidChevronUpSquare,
  BiSolidChevronDownSquare
} from "react-icons/bi";
import { connect } from "react-redux";
import { searchProjects } from "../actions";
import { constructSearchTerm } from "../utils/constructSearchQuery";
import ProjectCard from "./ProjectCard";

const SearchPage = ({ auth, searchProjects, searchResults }) => {
  const buttonColor = "#2ea44f";
  // state setting
  const [searchTerm, setSearchTerm] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [recommendedProjects, setRecommendedProjects] = useState([]);
  const [selectedIssueLabels, setSelectedIssueLabels] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10; // or any other number you desire

  // handle sorting of returned data
  const sortResults = results => {
    return [...results].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[sortField] > b[sortField] ? 1 : -1;
      } else {
        return a[sortField] < b[sortField] ? 1 : -1;
      }
    });
  };

  // pagination:
  // display subset of results based on current page
  const paginatedResults = searchResults.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleSearch = async () => {
    // Construct the full search term using the selected language and framework
    const fullSearchTerm = constructSearchTerm({
      language: selectedLanguage,
      framework: selectedFramework
    });

    // Prepare parameters for the search
    const params = {
      searchTerm: fullSearchTerm,
      issueLabels: selectedIssueLabels
    };

    // Use the searchProjects Redux action to fetch the results
    searchProjects(params);
    console.log("searchResults", searchResults);
  };

  const fetchRecommendedProjects = async () => {
    // Fetch projects based on user's profile or chosen technologies and frameworks
    // Update recommendedProjects.
    // This is just a placeholder.
    // const response = await axios.get("YOUR_RECOMMENDED_PROJECTS_ENDPOINT_HERE");
    // setRecommendedProjects(response.data);
  };

  useEffect(() => {
    // Assuming languages and frameworks would be static, else you can fetch them from an API
    setLanguages([
      "JavaScript",
      "Python",
      "Ruby",
      "C++",
      "C#",
      "Rust",
      "Swift",
      "Java"
    ]);
    setFrameworks([
      "React",
      "Angular",
      "Vue",
      "Laravel",
      "Spring",
      "Django",
      "Flask",
      "NextJs"
    ]);

    fetchRecommendedProjects();
  }, []);

  return (
    <div className="search-page">
      {/* Search Input */}
      <div className="search-container">
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Open Source Projects..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Search Parameters Section */}
      <div className="search-params-container">
        <h4>Languages</h4>
        <div className="search-params">
          {languages.map(lang =>
            <div key={lang}>
              <input
                type="radio"
                name="language"
                value={lang}
                onChange={() => setSelectedLanguage(lang)}
              />
              {lang}
            </div>
          )}
        </div>
        <h4>Frameworks</h4>
        <div className="search-params">
          {frameworks.map(framework =>
            <div key={framework}>
              <input
                type="radio"
                name="framework"
                value={framework}
                onChange={() => setSelectedFramework(framework)}
              />
              {framework}
            </div>
          )}
        </div>
        <h4>Issue Labels</h4>
        <div className="search-params">
          {[
            "good first issue",
            "help wanted",
            "Bug",
            "Design Limitation",
            "Effort: Casual",
            "Possible Improvement",
            "Suggestion",
            "Experimentation Needed"
          ].map(label =>
            <div key={label}>
              <input
                type="checkbox"
                name="issueLabel"
                value={label}
                onChange={() => {
                  if (selectedIssueLabels.includes(label)) {
                    setSelectedIssueLabels(prevLabels =>
                      prevLabels.filter(l => l !== label)
                    );
                  } else {
                    setSelectedIssueLabels(prevLabels => [
                      ...prevLabels,
                      label
                    ]);
                  }
                }}
              />
              {label}
            </div>
          )}
        </div>
      </div>

      {/* Recommended Projects Section */}
      {auth &&
        <div className="recommended-projects">
          <h3>Recommended Projects</h3>
          {recommendedProjects.map(project =>
            <div key={project.id}>
              {project.name}
            </div>
          )}
        </div>}

      {/* Search Results Section */}

      {/* Search Results Section */}

      <div className="search-results">
        <div className="search-sort">
          <h3>Search Results</h3>
          <select
            value={sortField}
            onChange={e => setSortField(e.target.value)}
          >
            <option value="" disabled>
              Choose a field
            </option>
            <option value="createdAt">Created At</option>
            <option value="latestMergedPR">Last Pull Request Date</option>
            <option value="mentionableUsersCount">
              Number of Contributors
            </option>
            <option value="starCount">Stargazer Total</option>
          </select>

          <button
            onClick={() => setSortOrder("asc")}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <BiSolidChevronUpSquare
              size="3.20em"
              color={buttonColor}
              onClick={() => setSortOrder("asc")}
            />
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            style={{ backgroundColor: "transparent", border: "none" }}
          >
            <BiSolidChevronDownSquare
              size="3.20em"
              color={buttonColor}
              onClick={() => setSortOrder("desc")}
            />
          </button>
        </div>

        {sortResults(paginatedResults).map(result =>
          <ProjectCard key={result.id} project={result} />
        )}
      </div>

      {/* Pagination Controls */}
      {searchResults.length > 0 &&
        <div className="search-pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * resultsPerPage >= searchResults.length}
          >
            Next
          </button>
        </div>}
    </div>
  );
};

function mapStateToProps({ auth, searchResults }) {
  // Grab the auth state
  return { auth, searchResults };
}

export default connect(mapStateToProps, { searchProjects })(SearchPage); // Connected to Redux
