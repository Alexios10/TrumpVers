interface IMerch {
  id?: number;
  name?: string;
  image?: string | null;
  description?: string;
  price?: number | string;
  quantity?: number | string;
  category?: string;
}

export default IMerch;
