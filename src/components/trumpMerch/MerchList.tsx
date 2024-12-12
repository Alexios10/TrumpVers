import { FC } from "react";
import MerchItem from "./MerchItems";
import IMerch from "../../interfaces/merchandise/IMerch";

interface MerchListProps {
  merchs: IMerch[];
}

const MerchList: FC<MerchListProps> = ({ merchs }) => {
  return (
    <section className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {merchs.map((merch) => (
          <MerchItem
            key={merch.id}
            id={merch.id}
            name={merch.name}
            image={merch.image}
            description={merch.description}
            price={merch.price}
            quantity={merch.quantity}
            category={merch.category}
          />
        ))}
      </div>
    </section>
  );
};

export default MerchList;
