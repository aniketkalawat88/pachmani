export interface FilterObj {
  page?: number;
  limit?: number;
  username?: string;
  id?: string;
  endDate?: string;
  startDate?: string;
}

export const constructQueryString = (filterObj: FilterObj): string => {
  const queryString = Object.keys(filterObj)
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(
          filterObj[key as keyof FilterObj] as string
        )}`
    )
    .join("&");
  return queryString;
};
