export default class ProjectNotFoundError extends Error {
    constructor() {
      super(`Project not found`);
      this.name = 'ProjectNotFoundError';
    }
  } 