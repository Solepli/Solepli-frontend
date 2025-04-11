export type Category = {
  title: string;
  id: string;
};

export type Place = {
  title: string;
  address:string;
  latitude:number;
  longitude:number;
  category:Category;
  rating:number;
  tags:string[];
};
