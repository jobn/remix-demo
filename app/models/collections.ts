export type Collection = {
  id: number;
  name: string;
};

let collections: Collection[] = [
  { id: 0, name: "My Collection" },
  { id: 1, name: "Shopping list" },
];

export const getCollections = async () => Promise.resolve(collections);

export const addCollection = async (collection: Collection) => {
  collections = [...collections, collection];
  return Promise.resolve();
};

export const getCollection = async (id: number) => {
  const collection = collections.find((col) => col.id === id);
  return Promise.resolve(collection);
};
