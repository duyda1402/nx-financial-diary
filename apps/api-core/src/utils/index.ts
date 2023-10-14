import * as uuid from "uuid";

export const generateUUID = (prefix?: string): string => {
  const id = uuid.v4();
  if (prefix) {
    return prefix + "_" + id;
  }
  return id;
};
