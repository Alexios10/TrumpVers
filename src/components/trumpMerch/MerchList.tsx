import { useContext } from "react";
import MerchItem from "./MerchItems";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";

const MerchList = () => {
  const { merchandise } = useContext(MerchandiseContext) as IMerchContext;

  const createAndGetMerchJSX = () => {
    const merchJSX = merchandise.map((merchandise) => {
      return (
        <MerchItem
          key={merchandise.id}
          name={merchandise.name}
          image={merchandise.image}
          description={merchandise.description}
          price={merchandise.price}
          quantity={merchandise.quantity}
        />
      );
    });

    return merchJSX;
  };

  return <section>{createAndGetMerchJSX()}</section>;
};

export default MerchList;
