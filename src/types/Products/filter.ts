interface Category {
  id?: string;
  category_name: string;
}
interface Size {
  id?: string;
  size: string;
}

export interface Filter {
  categories: Category[];
  sizes: Size[];
}
