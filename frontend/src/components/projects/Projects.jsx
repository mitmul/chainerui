import React from 'react';
import PropTypes from 'prop-types';
import ProjectRow from './ProjectRow';


const createProjectsNotFoundElem = () => (
  <div className="my-5">
    <h4>There is no project yet.</h4>
    <p>You need to:</p>
    <ol>
      <li>
        set up a database<br />
        <code>chainerui db create</code><br />
        <code>chainerui db upgrade</code>
      </li>
      <li>
        create a project, for example,<br />
        <code>chainerui project create -d PROJECT_DIR [-n PROJECT_NAME]</code>
      </li>
    </ol>
  </div>
);

const createProjectRowElems = (projects, onProjectUpdate, onProjectDelete) => (
  Object.keys(projects).sort((a, b) => a - b).map((projectId) => (
    <ProjectRow
      project={projects[projectId]}
      onProjectUpdate={onProjectUpdate}
      onProjectDelete={onProjectDelete}
      key={projectId}
    />
  ))
);

const Projects = (props) => {
  const { projects, onProjectUpdate, onProjectDelete } = props;

  return (
    <div className="mt-4 border border-left-0 border-right-0 border-bottom-0">
      {(Object.keys(projects).length === 0) ?
        createProjectsNotFoundElem() :
        createProjectRowElems(projects, onProjectUpdate, onProjectDelete)}
    </div>
  );
};

Projects.propTypes = {
  projects: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      pathName: PropTypes.string
    })
  ),
  onProjectUpdate: PropTypes.func.isRequired,
  onProjectDelete: PropTypes.func.isRequired
};

Projects.defaultProps = {
  projects: {}
};

export default Projects;

