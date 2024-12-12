import { useContext, useState } from "react";
import MerchList from "./MerchList";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";

const Merchandises = () => {
  // Henter merchandise (varer) fra konteksten
  const { merchandise } = useContext(MerchandiseContext) as IMerchContext;

  // Setter opp en state for å filtrere varer basert på kategori
  const [filterCategory, setFilterCategory] = useState<string>("All");

  // Definerer tilgjengelige kategorier
  const categories = ["All", "Hats", "T-shirts", "Hoodies", "Accessories"];

  // Filtrerer varene basert på valgt kategori
  const filteredMerch =
    filterCategory === "All"
      ? merchandise
      : merchandise.filter(
          (merchandise) => merchandise.category === filterCategory
        );

  // Funksjon som håndterer når en kategori blir klikket
  const handleCategoryClick = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <section className="flex">
      {/* Venstre sidepanel med tittel */}
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-lg p-6 text-lg border-r-2 border-slate-400 text-blue-950 bg-white rounded-lg shadow-md">
        <h2 className="text-center font-bold text-xl sm:text-lg md:text-xl lg:text-xl text-blue-900">
          America First:
        </h2>
        <h3 className="text-center text-lg sm:text-md md:text-lg lg:text-lg text-gray-700">
          Official Trump Merchandise
        </h3>
        <hr className="w-full h-0.5 mx-auto rounded m-2 bg-slate-400" />

        {/* Kategorilisten */}
        <ul className="list-group space-y-4 font-semibold mt-6">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer transition-colors duration-200 ease-in-out hover:text-red-600 ${
                filterCategory === category
                  ? "text-red-600 font-bold"
                  : "text-gray-800"
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      {/* MerchList-komponenten som viser filtrerte varer */}
      <MerchList merchs={filteredMerch} />
    </section>
  );
};

export default Merchandises;
