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

export const getSets = async () => {
  const data = await http<SetResponse>(`${baseUrl}/sets/?theme_id=171`);

  return data.results
    .map((set) => ({ set_num: set.set_num, name: set.name }))
    .sort((a, b) => (a.name > b.name ? 1 : -1));
};

export const getSet = async (setNum?: string) => {
  if (!setNum) return Promise.resolve();

  const data = await http<LegoSet>(`${baseUrl}/sets/${setNum}`);

  if (data.hasOwnProperty("detail")) {
    return null;
  }

  return data;
};

export type LegoPart = {
  id: number;
  inv_part_id: number;
  part: {
    part_num: string;
    name: string;
    part_cat_id: number;
    part_url: string;
    part_img_url: string;
  };
  color: {
    id: number;
    name: string;
    rgb: string;
    is_trans: boolean;
  };
  set_num: string;
  quantity: number;
  is_spare: boolean;
  element_id: string;
  num_sets: number;
};

type PartsResponse = {
  results: LegoPart[];
};

export const getParts = async (setNum?: string) => {
  if (!setNum) return Promise.resolve();
  const data = await http<PartsResponse>(`${baseUrl}/sets/${setNum}/parts`);

  return data.results;
};
