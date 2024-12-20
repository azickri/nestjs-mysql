export class ObjectHelper {
  static copy(value: object) {
    return JSON.parse(JSON.stringify(value));
  }
}
