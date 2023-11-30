import { Link } from "react-router-dom";

const RecommendedProjectCard = ({ project }) => {
  return (
    <div className="recommended-project-card">
      <h3>
        <Link to={{ pathname: `/project/${project.id}`, state: { project } }}>
          {project.name}
        </Link>
      </h3>
      <p className="recommended-project-description">
        {project.description}
      </p>
      {/* Other details */}
    </div>
  );
};

export default RecommendedProjectCard;
