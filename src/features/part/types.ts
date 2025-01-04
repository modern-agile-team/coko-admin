export interface Part {
  id: number;
  sectionId: number;
  name: string;
  order: number;
}

export interface PartFilter {
  sectionId: Part['sectionId'];
}
