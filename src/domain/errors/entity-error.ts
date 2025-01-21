export default class EntityError extends Error {
  constructor(
    message: string,
    readonly fields: Fields,
  ) {
    super(message);
    this.name = 'EntityError';
  }
}

type Fields = Record<string, string>;
