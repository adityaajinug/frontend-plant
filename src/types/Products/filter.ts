interface Category {
  id?: number;
  name: string;
}
interface Size {
  id?: number;
  name: string;
}

export interface Filter {
  categories: Category[];
  sizes: Size[];
}
