import { db } from "../../firebase";

const generateId = async (name) => {
  const querySnapshots = await db
    .collection("users")
    .where("name", "==", name)
    .get();

  const result = [];

  querySnapshots.forEach((doc) => {
    result.push(doc.data());
  });

  return `${name}#${result.length + 1}`;
};

export default generateId;
