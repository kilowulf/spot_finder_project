import React, { useState, useEffect, useMemo } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { trackProject, untrackProject, fetchUser } from "../actions";
import { connect } from "react-redux";
import { RiStarSLine } from "react-icons/ri";

function ProjectDetailsCard() {
  const { projectId } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  let project = location.state?.project;
  // Initialize projectsTracked to an empty array if it's undefined
  const projectsTracked = useSelector(state => state.auth.projectsTracked) || [];

  // state for a handling toggle functionality
  const [issuesListVisible, setIssuesListVisible] = useState(false);

  // toggle handler
  const toggleIssuesList = () => {
    setIssuesListVisible(!issuesListVisible);
  };

  // Get the search results and projectsTracked from Redux store
  const searchResults = useSelector(state => state.searchResults);

  // Find the project from the search results based on the projectId
  if (!project) {
    project = searchResults.find(result => result.id === projectId);
  }
  
  console.log("project from projectDetailsCard: ", project);

  // Determine if project is already tracked
  // const isTracked = auth.projectsTracked
  //   ? auth.projectsTracked.some(p => p.id === projectId)
  //   : false;

  // Determine if project is already tracked
  const isTracked = useMemo(() => {
    return projectsTracked.some(p => p.id === projectId);
  }, [projectsTracked, projectId]);

  // local state tracking of project
  const [localIsTracked, setLocalIsTracked] = useState(false);

  useEffect(
    () => {
      setLocalIsTracked(isTracked);
    },
    [isTracked]
  );

  // handle tracking for project
  const handleTrackProject = () => {
    if (project) {
      if (localIsTracked) {
        dispatch(untrackProject(project.id)).then(() => {
          setLocalIsTracked(false);
          dispatch(fetchUser());
        });
      } else {
        dispatch(trackProject(project)).then(() => {
          setLocalIsTracked(true);
          dispatch(fetchUser());
        });
      }
    }
  };

  // handle if project doesnt exist
  if (!project) {
    return <div>Project not found!</div>;
  }

  return (
    <div className="project-details">
      <h2>
        {project.name}
      </h2>

      <div className="project-description">
        <p>
          <span className="describer-text">Description:</span>
          {project.description}
        </p>
      </div>

      <div className="project-url">
        <p>
          <span className="describer-text">URL:</span>
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.url}
          </a>
        </p>
      </div>

      <div className="project-created-at">
        <p>
          <span className="describer-text">Created: </span>
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="project-contributing-guidelines">
        <p>
          <span className="describer-text">Contributing Guidelines:</span>{" "}
          {project.contributingGuidelinesBody || "Not available"}
        </p>
      </div>

      <div className="project-mentionable-users">
        <p>
          <span className="describer-text">Mentionable Users Count: </span>
          {project.mentionableUsersCount}
        </p>
      </div>

      <div className="project-archived-status">
        <p>
          <span className="describer-text">Is Archived: </span>{" "}
          {project.isArchived ? "Yes" : "No"}
        </p>
      </div>

      <div className="project-star-count">
        <p>
          <span className="describer-text">
            <RiStarSLine className="project-star-icon" />Stars:{" "}
          </span>
          {project.starCount}
        </p>
      </div>

      <div className="project-owner">
        <p>
          <span className="describer-text">Owner: </span>
          <a href={project.owner.url} target="_blank" rel="noopener noreferrer">
            {project.owner.login}
          </a>
        </p>
      </div>

      <div className="project-assignable-users">
        <p>
          <span className="describer-text">Assignable Users Count: </span>
          {project.assignableUsersCount}
        </p>
      </div>

      <div className="project-license">
        <p>
          <span className="describer-text">License: </span>
          {project.licenseKey || "Not specified"}
        </p>
      </div>

      <div className="project-primary-language">
        <p>
          <span className="describer-text">Primary Language: </span>
          {project.primaryLanguage || "Not specified"}
        </p>
      </div>

      <div className="project-languages">
        <p>
          <span className="describer-text">Languages: </span>
          {project.languages.join(", ")}
        </p>
      </div>

      <div className="project-latest-merged-pr">
        <p>
          <span className="describer-text">Latest Merged PR Date: </span>
          {project.latestMergedPR
            ? new Date(project.latestMergedPR).toLocaleDateString()
            : "Not available"}
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

        {auth && (
        <button onClick={handleTrackProject} className={localIsTracked ? "untrack-button" : "track-button"}>
          {localIsTracked ? "Untrack Project" : "Track Project"}
        </button>
      )}

      {/* {auth &&
        (localIsTracked
          ? <button className="button-disabled" disabled>
              Project Tracked
            </button>
          : <button onClick={handleTrackProject}>Track Project</button>)} */}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProjectDetailsCard);
