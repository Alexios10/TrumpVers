interface IStaff {
  id?: number;
  name?: string;
  image?: string | null; // URL eller sti til et bilde av den ansatte (valgfri, kan også være null)
  description?: string;
  title?: string;
  email?: string;
}

export default IStaff;
