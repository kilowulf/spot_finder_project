import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h3>
        <Link to={`/project/${project.id}`}>
          {project.name}
        </Link>
      </h3>
      <div>
        {project.description}
      </div>
      {/* Add other brief project details you want to display in the search results */}
    </div>
  );
}

export default ProjectCard;
