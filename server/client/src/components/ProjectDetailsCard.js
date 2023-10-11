import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { trackProject } from "../actions";

function ProjectDetailsCard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // Get the search results and projectsTracked from Redux store
  const searchResults = useSelector(state => state.searchResults);
  const projectsTracked = useSelector(state => state.projectsTracked); // Assuming you have a `currentUser` state
  console.log("projects tracked", projectsTracked);

  // Find the project from the search results based on the projectId
  const project = searchResults.find(result => result.id === projectId);

  // Determine if project is already tracked
  const isTracked = projectsTracked
    ? projectsTracked.some(p => p.id === projectId)
    : false;

  // handle tracking for project
  const handleTrackProject = () => {
    if (project && !isTracked) {
      dispatch(trackProject(project));
      // setIsTracked(true); // Update the state to reflect that the project is tracked
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
          Description: {project.description}
        </p>
      </div>

      <div className="project-url">
        <p>
          URL:{" "}
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.url}
          </a>
        </p>
      </div>

      <div className="project-created-at">
        <p>
          Created At: {new Date(project.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="project-contributing-guidelines">
        <p>
          Contributing Guidelines:{" "}
          {project.contributingGuidelinesBody || "Not available"}
        </p>
      </div>

      <div className="project-mentionable-users">
        <p>
          Mentionable Users Count: {project.mentionableUsersCount}
        </p>
      </div>

      <div className="project-archived-status">
        <p>
          Is Archived? {project.isArchived ? "Yes" : "No"}
        </p>
      </div>

      <div className="project-star-count">
        <p>
          Stars: {project.starCount}
        </p>
      </div>

      <div className="project-owner">
        <p>
          Owner:{" "}
          <a href={project.owner.url} target="_blank" rel="noopener noreferrer">
            {project.owner.login}
          </a>
        </p>
      </div>

      <div className="project-assignable-users">
        <p>
          Assignable Users Count: {project.assignableUsersCount}
        </p>
      </div>

      <div className="project-license">
        <p>
          License: {project.licenseKey || "Not specified"}
        </p>
      </div>

      <div className="project-primary-language">
        <p>
          Primary Language: {project.primaryLanguage || "Not specified"}
        </p>
      </div>

      <div className="project-languages">
        <p>
          Languages: {project.languages.join(", ")}
        </p>
      </div>

      <div className="project-issue-count">
        <p>
          Issue Count: {project.issueCount}
        </p>
      </div>

      <div className="project-latest-merged-pr">
        <p>
          Latest Merged PR Date:{" "}
          {project.latestMergedPR
            ? new Date(project.latestMergedPR).toLocaleDateString()
            : "Not available"}
        </p>
      </div>

      {isTracked
        ? <button disabled>Project Tracked</button>
        : <button onClick={handleTrackProject}>Track Project</button>}
    </div>
  );
}

export default ProjectDetailsCard;
