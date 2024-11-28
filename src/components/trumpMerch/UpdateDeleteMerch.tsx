// import { useContext, useState } from "react";
// import { MerchandiseContext } from "../../contexts/MerchandiseContext";
// import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
// import IMerch from "../../interfaces/merchandise/IMerch";

// const UpdateDeleteMerch = () => {
//   const { putMerch, deleteMerch } = useContext(
//     MerchandiseContext
//   ) as IMerchContext;

//   const [id, setId] = useState<number | null>(null);
//   const [quantity, setQuantity] = useState<number | null>(null);

//   function handleChange() {}

//   // user can change quantity in cart
//   const updateMerchWithContext = async () => {};

//   const MerchToUpdate: IMerch = {
//     quantity: quantity,
//   };

//   const result = await putmerch(merchToUpdate);
//   if (result) {
//     alert("Thought updated");
//   }

//   // user can delete a murchandise in cart
//   const deleteMerchWithContext = async () => {};

//   return (
//     <section className="ml-5">
//       <header>Merchandises</header>
//     </section>
//   );
// };

// export default UpdateDeleteMerch;
