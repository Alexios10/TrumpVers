import MerchList from "./MerchList";

const GetAllMerchandises = () => {
  return (
    <section className="flex">
      <h3 className="text-3xl mb-2 text-blue-950"> Merchandises</h3>
      <MerchList />
    </section>
  );
};

export default GetAllMerchandises;
