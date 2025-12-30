export type ClassInstance<T> = T extends { prototype: infer P } ? P : never;
