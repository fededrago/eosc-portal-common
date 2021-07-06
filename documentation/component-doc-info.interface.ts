export interface ComponentDocInfo {
  name: string;
  htmlDescription: string;
  htmlTag: string;
  examples: {
    title: string;
    htmlDescription?: string;
    htmlTag: string;
  }[];
  parameters?: {
    name: string;
    htmlDescription: string;
  }[];
  functions?: {
    name: string;
    htmlDescription: string;
  }[];
};
