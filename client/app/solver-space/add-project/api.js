// pages/api/getProjects.js

import projectsData from '../../../data/projects.json';

export default (req, res) => {
  res.status(200).json(projectsData);
};
