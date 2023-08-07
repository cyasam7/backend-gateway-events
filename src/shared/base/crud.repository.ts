export interface IWriteRepository<T> {
  save(value: T): Promise<T | null>;
  updateOne(id: string, value: Partial<Omit<T, 'id'>>): Promise<void>;
  deleteOne(id: string): Promise<void>;
}

export interface IReadRepository<T, R> {
  findOne(values: Partial<T>): Promise<R | null>;
  find(values: Partial<T>): Promise<R[] | []>;
}
