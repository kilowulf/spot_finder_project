import React, { useState } from "react";
import { connect } from "react-redux";
import { untrackProject } from "../actions";
import { RiDeleteBinLine } from "react-icons/ri";
const ProfileProjCard = ({
  project,
  untrackProject,
  sortCategory,
  sortOrder
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  // state for a handling toggle functionality
  const [issuesListVisible, setIssuesListVisible] = useState(false);

  // toggle handler
  const toggleIssuesList = () => {
    setIssuesListVisible(!issuesListVisible);
  };

  // untrack project handler
  const handleUntrackClick = event => {
    event.stopPropagation();
    untrackProject(project.id);
  };

  // Sort value displays in dynamic element
  const getSortValue = () => {
    if (sortCategory === "createdAt") {
      return new Date(project[sortCategory]).toLocaleDateString();
    } else if (sortCategory === "latestMergedPR") {
      return project.latestMergedPR
        ? new Date(project.latestMergedPR).toLocaleDateString()
        : "Not available";
    } else if (sortCategory === "mentionableUsersCount") {
      return project.mentionableUsersCount;
    } else if (sortCategory === "starCount") {
      return project.starCount;
    }
  };

  return (
    <div className="profile-project-card">
      <div className="profile-project-header" onClick={toggleCollapse}>
        <h3>
          {project.name}
        </h3>
        <p>
          <span className="describer-text">
            {sortCategory}:{" "}
          </span>
          {getSortValue()}
        </p>
        <button onClick={event => handleUntrackClick(event)}>
          <RiDeleteBinLine />
        </button>
      </div>

      {!isCollapsed &&
        <div className="profile-project-details">
          <p>
            <span className="describer-text">Latest Merged Pull Request: </span>
            {project.latestMergedPR
              ? new Date(project.latestMergedPR).toLocaleDateString()
              : "Not available"}
          </p>
          <div className="project-contributing-guidelines">
            <p>
              <span className="describer-text">
                Contributing Guidelines:
              </span>{" "}
              {project.contributingGuidelinesBody || "Not available"}
            </p>
          </div>
          <div>
            <span className="describer-text">Project URL: </span>
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              {project.url}
            </a>
          </div>
          <div className="project-issue-count">
            <p>
              {/* 4. Add an element to trigger the toggle function */}
              <span onClick={toggleIssuesList} style={{ cursor: "pointer" }}>
                <span className="describer-text">Issue Count: </span>
                {project.issueCount}
              </span>
            </p>
          </div>

          {issuesListVisible &&
            <div className="project-issues-list">
              <p>
                <span className="describer-text">Issues:</span>
              </p>
              <ul>
                {project.issues && project.issues.length > 0
                  ? project.issues.map((issue, index) =>
                      <li key={index}>
                        {issue.body}
                      </li>
                    )
                  : <li>No issues available</li>}
              </ul>
            </div>}
        </div>}
    </div>
  );
};

export default connect(null, { untrackProject })(ProfileProjCard);
