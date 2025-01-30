export default interface Mapper<I, O> {
  map(input: I): O | Promise<O>;
}
