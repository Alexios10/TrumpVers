import { FC } from "react";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";

// MerchItem-komponenten tar inn en vare (IMerch) som prop
const MerchItem: FC<IMerch> = ({
  id,
  name,
  image,
  description,
  price,
  quantity,
}) => {
  return (
    <article className="flex justify-center my-4">
      {/* Container for hver vare, med bilde og detaljer */}
      <div className="min-w-52 min-h-42 cursor-pointer flex flex-col rounded-sm p-1 shadow-lg border-solid border-2 border-blue-800 border-opacity-20 hover:border-4">
        <p className="text-start text-xs">ID: {id}</p>
        <div className="flex-1 m-8">
          <img
            src={MerchService.getImageEndpoint() + image}
            alt={name}
            className="object-cover "
          />
        </div>

        <hr />

        <div className="p-2 bg-white flex flex-col justify-between">
          <h3 className="text-sm md:text-lg font-semibold text-gray-800">
            {name}
          </h3>{" "}
          <div className="flex justify-between">
            <p className="text-xs md:text-sm text-gray-600 line-clamp-3">
              {description}
            </p>{" "}
            <p className="text-md md:text-xl font-medium text-gray-900">
              {price} $
            </p>{" "}
          </div>
        </div>

        <button className="bg-blue-700 text-white font-semibold py-2 px-3 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Add to Cart
        </button>

        <div className="flex justify-between items-center text-xs">
          <p className="text-green-600">In stock</p>
          <p className="mt-2 text-gray-500 text-end">{quantity} left</p>{" "}
        </div>
      </div>
    </article>
  );
};

export default MerchItem;
