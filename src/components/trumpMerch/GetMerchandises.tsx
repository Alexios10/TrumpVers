import MerchList from "./MerchList";

const GetAllMerchandises = () => {
  return (
    <section className="flex">
      
      <div className="w-96 p-12 text-lg border-r-2 border-slate-400 text-blue-950 ">
        <h2 className="text-2xl font-bold">Trump Merchandise</h2>
        <hr className="w-full h-0.5 mx-auto rounded m-2 bg-slate-400" />

        <ul className="list-group space-y-4 font-semibold mt-8 cursor-pointer">
          <li className=" hover:text-red-600">All</li>
          <li className=" hover:text-red-600">T-shirts</li>
          <li className=" hover:text-red-600">Hoodies</li>
          <li className=" hover:text-red-600">Hats</li>
          <li className=" hover:text-red-600">Accessories</li>
        </ul>
      </div>

      <MerchList />
    </section>
  );
};

export default GetAllMerchandises;
