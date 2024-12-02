import MerchList from "./MerchList";

const GetAllMerchandises = () => {
  return (
    <section className="flex">
      
      <div className="w-96 p-12 text-lg border-r-2 border-slate-400">
        <h2 className="text-2xl font-bold">Trump Merchandise</h2>
        <hr className="w-full h-0.5 mx-auto rounded m-2 bg-slate-400" />

        <ul className="list-group space-y-4 font-semibold mt-8">
          <li>All</li>
          <li>T-shirts</li>
          <li>Hoodies</li>
          <li>Hats</li>
          <li>Accessories</li>
        </ul>
      </div>

      <MerchList />
    </section>
  );
};

export default GetAllMerchandises;
