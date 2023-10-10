import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { trackProject } from "../actions";

function ProjectDetailsCard() {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  // Get the search results from Redux store
  const searchResults = useSelector(state => state.searchResults);

  // Find the project from the search results based on the projectId
  const project = searchResults.find(result => result.id === projectId);

  // handle tracking for project
  const handleTrackProject = () => {
    if (project) {
      dispatch(trackProject(project));
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
      <p>
        {project.description}
      </p>
      <p>
        URL: {project.url}
      </p>
      <p>
        Primary Language: {project.primaryLanguage}
      </p>
      {/* Add more granular details as required */}
      <button onClick={handleTrackProject}>Track Project</button>
    </div>
  );
}

export default ProjectDetailsCard;
