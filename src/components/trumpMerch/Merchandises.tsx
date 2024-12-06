import { useContext, useState } from "react";
import MerchList from "./MerchList";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";

const Merchandises = () => {
  const { merchandise } = useContext(MerchandiseContext) as IMerchContext;

  const [filterCategory, setFilterCategory] = useState<string>("All");

  const categories = ["All", "Hats", "T-shirts", "Hoodies", "Accessories"];
  const filteredMerch =
    filterCategory === "All"
      ? merchandise
      : merchandise.filter(
          (merchandise) => merchandise.category === filterCategory
        );

  const handleCategoryClick = (category: string) => {
    setFilterCategory(category);
  };

  return (
    <section className="flex">
      <div className="w-96 p-12 text-lg border-r-2 border-slate-400 text-blue-950 ">
        <h2 className="text-2xl font-bold">Trump Merchandise</h2>
        <hr className="w-full h-0.5 mx-auto rounded m-2 bg-slate-400" />

        <ul className="list-group space-y-4 font-semibold mt-8">
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer hover:text-red-600 ${
                filterCategory === category ? "text-red-600" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <MerchList merchs={filteredMerch} />
    </section>
  );
};

export default Merchandises;
