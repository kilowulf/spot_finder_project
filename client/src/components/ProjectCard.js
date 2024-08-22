import React from "react";
import { Link } from "react-router-dom";
import { RiStarSLine } from "react-icons/ri";
import { fetchUser, untrackProject } from "../actions";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch } from "react-redux";

const ProjectCard = React.memo(({ project, projectsTracked }) => {
  const dispatch = useDispatch();
  // check for project in projectsTracked user object
  const isTracked = projectsTracked
    ? projectsTracked.some(p => p.id === project.id)
    : false;

  // Handle untrack project
  const handleUntrackProject = () => {
    dispatch(untrackProject(project.id)).then(() => {
      dispatch(fetchUser()); // Update user data
    });
  };

  return (
    <div className="project-container">
      <h3>
        <Link to={`/project/${project.id}`}>
          {project.name}:
        </Link>
      </h3>
      <div className="project-description">
        <span className="describer-text">description: </span>
        {project.description}
      </div>
      <div className="project-createdAt">
        <span className="describer-text">created: </span>
        {project.createdAt}
      </div>
      <div className="project-latestPull">
        <span className="describer-text">last pull: </span>
        {project.latestMergedPR}
      </div>
      <div className="project-contributors">
        <span className="describer-text">no. contributors:</span>{" "}
        {project.mentionableUsersCount}
      </div>
      <div className="project-stars">
        <span className="describer-text">
          <RiStarSLine className="project-star-icon" />stars:{" "}
        </span>

        {project.starCount}
      </div>
      {isTracked && <div className="feedback">Project Tracked</div>}

      {/* Add your feedback element here */}
      {/* Add other brief project details you want to display in the search results */}
    </div>
  );
});
export default ProjectCard;
