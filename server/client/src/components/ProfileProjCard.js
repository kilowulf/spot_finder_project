// ProjectCard.js
import React, { useState } from "react";

const ProfileProjCard = ({ project }) => {
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

  return (
    <div className="profile-project-card">
      <div className="profile-project-header" onClick={toggleCollapse}>
        <h3>
          {project.name}
        </h3>
        <p>
          <span className="describer-text">Created: </span>
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
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

export default ProfileProjCard;
