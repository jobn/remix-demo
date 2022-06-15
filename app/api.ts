const apiKey = "95d8f686cfd96762d16661101019cbd7";

const baseUrl = "https://rebrickable.com/api/v3/lego/";

async function http<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `key ${apiKey}`,
    },
  });

  const body = await response.json();
  return body;
}

export type Theme = {
  id: number;
  parent_id: null | number;
  name: string;
};

export type NestedTheme = Theme & { children: NestedTheme[] | null };

const nest = (items: Theme[], id: null | number = null): NestedTheme[] =>
  items
    .filter((item) => item.parent_id === id)
    .map((item) => ({ ...item, children: nest(items, item.id) }));

type ThemeResponse = {
  results: Theme[];
};

export const getThemes = async (id?: number) => {
  const data = await http<ThemeResponse>(`${baseUrl}/themes?page_size=10000`);

  return nest(data.results, id);
};

export const getTheme = async (id: number) => {
  const data = await http<Theme>(`${baseUrl}/themes/${id}`);

  return data;
};

export type LegoSet = {
  set_num: string;
  name: string;
  year: number;
  theme_id: number;
  num_parts: number;
  set_img_url: string;
  set_url: string;
  last_modified_dt: string;
};

type SetResponse = {
  results: { set_num: LegoSet["set_num"]; name: LegoSet["name"] }[];
};

export const getSets = async (themeId: number) => {
  const data = await http<SetResponse>(`${baseUrl}/sets/?theme_id=${themeId}`);

  return data.results.map((set) => ({ set_num: set.set_num, name: set.name }));
};

export const getSet = async (setNum: string) => {
  const data = await http<LegoSet>(`${baseUrl}/sets/${setNum}`);

  return data;
};
