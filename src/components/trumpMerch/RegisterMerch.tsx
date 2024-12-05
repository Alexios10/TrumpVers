import { ChangeEvent, useContext, useEffect, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import UpdateDeleteMerch from "./UpdateDeleteMerch";
import MerchList from "./MerchList";

const RegisterMerch = () => {
  const { merchandise, postMerch } = useContext(
    MerchandiseContext
  ) as IMerchContext;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const [activePage, setActivePage] = useState<"register" | "admin">(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "image":
        setImage(file);
        break;
      case "price":
        setPrice(e.target.value ?? parseFloat(e.target.value));
        break;
      case "quantity":
        setQuantity(e.target.value ?? parseInt(e.target.value));
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
    }
  }

  const registerMerch = () => {
    if (!name || !image || !price || !quantity) {
      alert("Please fill in all fields.");
      return;
    }

    const newMerch = {
      name,
      image: image.name,
      price,
      quantity,
      description,
      category,
    };

    postMerch(newMerch, image);

    alert("Merch registered successfully!");
    setName("");
    setImage(null);
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
  };

  const switchPage = (page: "register" | "admin") => {
    setActivePage(page);
  };

  const choosenCategoriy = [
    "Select a category",
    "Hats",
    "T-shirts",
    "Hoodies",
    "Accessories",
  ];

  return (
    <section className="flex">
      <div className="bg-white  flex flex-col " style={{ flex: "1 1 40%" }}>
        <div className="flex justify-center gap-4 mx-3 mb-5">
          <button
            onClick={() => switchPage("register")}
            className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "register" ? "bg-blue-500" : ""
            }`}
          >
            Register New Merch
          </button>

          <button
            onClick={() => switchPage("admin")}
            className={`p-2 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "admin" ? "bg-blue-500" : ""
            }`}
          >
            Merch Admin
          </button>
        </div>
        {activePage === "admin" && <UpdateDeleteMerch />}

        {activePage === "register" && (
          <div className="flex flex-col items-center">
            <h3 className="text-3xl mb-2 text-blue-950">Register new Merch</h3>
            {/* Registration container */}
            <div className="bg-white h-screen flex flex-col">
              <div className="w-96 items-start">
                {/* Name input */}
                <div className="mb-4 flex flex-col">
                  <label className="w-24 mr-2 text-sm">Name</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>
                {/* Image input */}
                <div className="mb-4 flex flex-col">
                  <label className="w-24 mr-2 text-sm">Image</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                    name="image"
                    type="file"
                    onChange={handleChange}
                  />
                </div>
                {/* Price input */}
                <div className="mb-4 flex flex-col">
                  <label className="w-24 mr-2 text-sm">Price:</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                    type="number"
                    name="price"
                    value={price}
                    onChange={handleChange}
                  />
                </div>
                {/* Quantity input */}
                <div className="mb-4 flex flex-col">
                  <label className="w-24 mr-2 text-sm">Quantity</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChange}
                  />
                </div>
                {/* Description input */}
                <div className="mb-4 flex flex-col">
                  <label className="w-24 mr-2 text-sm">Description</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                    name="description"
                    value={description}
                    onChange={handleChange}
                  />
                </div>
                {/* category input */}
                <div className="mb-2 flex flex-col">
                  <label className="w-24 mr-2 text-[0.625rem]">
                    Select Category
                  </label>
                  <select
                    className="w-full text-zinc-700 bg-gray-200"
                    name="category"
                    value={category}
                    onChange={handleChange}
                  >
                    {choosenCategoriy.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/* Add Member button */}
              <button
                onClick={registerMerch}
                className="mb-4 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
              >
                ADD Merch
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Right Container for Selected Member */}
      {activePage === "register" && (
        <>
          <div
            className="flex-1 m-4 p-4 border-solid border-2 border-opacity-20 border-blue-950 rounded-sm shadow h-auto overflow-x-hidden overflow-y-auto"
            style={{ flex: "1 1 60%" }}
          >
            <MerchList merchs={merchandise} />
          </div>
        </>
      )}
    </section>
  );
};

export default RegisterMerch;
