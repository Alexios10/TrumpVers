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
    <article className="flex justify-center my-4">
      <div className="w-[19.44rem] h-[31.25rem] cursor-pointer flex flex-col rounded-sm p-1 shadow-lg border-solid border-2 border-blue-950 border-opacity-20 hover:border-4">
        <div className="flex-1 m-8">
          <img
            src={MerchService.getImageEndpoint() + image}
            alt={name}
            className="object-contain w-full h-full"
          />
        </div>

        <div className="h-[10.25rem] bg-white p-4 flex flex-col justify-between">
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium text-gray-900">{price} $</p>
            <p className="text-sm text-gray-500">{quantity} left</p>
          </div>
        </div>
        <button>Buy</button>
      </div>
    </article>
  );
};

export default MerchItem;
