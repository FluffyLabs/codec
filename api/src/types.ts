import { kindNames } from "./kinds";

export const getTypes = async () => {
  return kindNames.map((kind) => ({ id: kind }));
};
