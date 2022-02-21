import { ICreatedBy, IProductionCompanies } from "./../api";
export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

export const LangColors = [
  "#3498db",
  "#9b59b6",
  "#34495e",
  "#27ae60",
  "#e74c3c",
  "#8e44ad",
];

export const checkZeroLength = (data: any[]) => data.length !== 0;

export const checkNullAndLength = (data: IProductionCompanies[]) =>
  data.filter((m) => m.logo_path !== null).length !== 0;

export const checkCreatorNullAndLength = (data: ICreatedBy[]) =>
  data.filter((m) => m.profile_path !== null).length !== 0;
