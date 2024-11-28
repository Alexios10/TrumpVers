import { FC } from "react";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";

const MerchItem: FC<IMerch> = ({
  name,
  image,
  description,
  price,
  quantity,
}) => {
  return (
    <article className="mx-5 my-4 rounded-sm p-4 shadow-lg min-h-40 min-w-96 border-solid border-2 border-blue-950 border-opacity-20">
      <div className="m-2">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold truncate">{name}</h3>
          <img
            src={MerchService.getImageEndpoint() + image}
            alt={name}
            className="h-16 w-16 object-cover rounded"
          />
        </div>
        <p className="text-xs line-clamp-3">{description}</p>
        <p className="mt-2 text-base font-medium">{price}$</p>
        <p className="mt-1 text-sm text-gray-700">Quantity: {quantity}</p>
        <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold hover:bg-blue-700">
          Buy
        </button>
      </div>
    </article>
  );
};

export default MerchItem;
