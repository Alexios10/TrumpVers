// Definerer et TypeScript-grensesnitt for "Merch" (varer)
interface IMerch {
  id?: number;
  name?: string;
  image?: string | null; // URL eller sti til bildematerialet for varen (valgfri, kan også være null)
  description?: string;
  price?: number | string; // Pris for varen (valgfri, kan være et tall eller en streng, f.eks. "Gratis")
  quantity?: number | string; // Antall tilgjengelige varer (valgfri, kan være et tall eller en streng)
  category?: string;
}

export default IMerch;
