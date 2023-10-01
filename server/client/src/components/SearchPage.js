import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const SearchPage = ({ auth }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [frameworks, setFrameworks] = useState([]);
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendedProjects, setRecommendedProjects] = useState([]);

  const handleSearch = async () => {
    // Make a call to GitHub API with searchTerm, selectedLanguage, selectedFramework
    // and update searchResults.
    // This is just a placeholder and should be replaced with the actual API call.
    // const response = await axios.get("YOUR_GITHUB_API_ENDPOINT_HERE");
    // setSearchResults(response.data);
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
    setLanguages(["JavaScript", "Python", "Ruby"]);
    setFrameworks(["React", "Angular", "Vue"]);

    fetchRecommendedProjects();
  }, []);

  return (
    <div className="search-page">
      {/* Search Input */}
      <div>
        <input
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search Open Source Projects..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Search Parameters Section */}
      <div className="search-params">
        <div>
          <h4>Languages</h4>
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
        <div>
          <h4>Frameworks</h4>
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
      <div className="search-results">
        {searchResults.map(result =>
          <div key={result.id}>
            {result.name}
          </div>
        )}
      </div>
    </div>
  );
};

function mapStateToProps({ auth }) {
  // Grab the auth state
  return { auth };
}

export default connect(mapStateToProps)(SearchPage); // Connected to Redux
