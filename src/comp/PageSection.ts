export interface Page {
  title: string;
  path: string;
}

export interface Section {
  title: string;
  pages: Page[];
}
