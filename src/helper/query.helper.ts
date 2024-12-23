import { Brackets } from 'typeorm';

export class QueryHelper {
  static bracketWhere(filter: object) {
    return new Brackets((query) => {
      query
        .where(`LOWER(todo.title) LIKE LOWER(:search)`, filter)
        .orWhere(`LOWER(todo.value) LIKE LOWER(:search)`, filter);
    });
  }
}
