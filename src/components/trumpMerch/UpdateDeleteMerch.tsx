import { ChangeEvent, useContext, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";

const UpdateDeleteMerch = () => {
  const { getMerchById, getMerchByName, putMerch, deleteMerch } = useContext(
    MerchandiseContext
  ) as IMerchContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  // state for å beholder den eksisterende bilde hvis den ikke blir enderet
  const [currentImageName, setCurrentImageName] = useState<string | null>(null);
  const choosenCategories = [
    "Select a category",
    "Hats",
    "T-shirts",
    "Hoodies",
    "Accessories",
  ];

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    switch (e.target.name) {
      case "id":
        setId(Number(e.target.value));
        break;
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

  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter merch id");
      return;
    }
    try {
      const merch = await getMerchById(id);
      if (merch) {
        setId(merch.id ?? null);
        setName(merch.name ?? "");
        setDescription(merch.description ?? "");
        setPrice(merch.price ?? "");
        setQuantity(merch.quantity ?? "");
        setCategory(merch.category ?? "");
        setCurrentImageName(merch.image ?? null);
        setImage(null);
      } else {
        alert(`Merch with id "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching merch:", error);
    }
  };

  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter members name");
      return;
    }

    try {
      const member = await getMerchByName(name);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setPrice(member.price ?? "");
        setQuantity(member.quantity ?? "");
        setCategory(member.category ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null);
      } else {
        alert(`Merch with name "${name}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching merch:", error);
    }
  };

  const updateMerchWithContext = async () => {
    if (!id) {
      alert("Cannot update. Merch not found.");
      return;
    }

    const merchToUpdate: IMerch = {
      id: id,
      name: name,
      image: image ? image.name : currentImageName,
      description: description,
      category: category,
      price: parseInt(price.toString()),
      quantity: parseInt(quantity.toString()),
    };

    const result = await putMerch(merchToUpdate, image);
    if (result) {
      alert("Merch updated successfully.");
    }
  };

  const deleteMerchWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Merch not found.");
      return;
    }

    deleteMerch(id);
    alert(`Merch with ID ${id} deleted.`);
  };

  return (
    <section className="flex -ml-10 flex-col lg:flex-row gap-6">
      <section
        className="flex flex-col justify-center items-center bg-white rounded-lg p-2 flex-1"
        style={{ flex: "1 1 40%" }}
      >
        <header className="text-3xl mb-2 text-blue-950">
          Update or Delete Merch
        </header>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="text-sm">Get Merch by Name</label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-200 p-2 rounded-sm border"
                aria-label="Merch Name"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm">Get Merch by ID</label>
            <div className="flex gap-4 items-center">
              <input
                type="number"
                name="id"
                onChange={handleChange}
                className="flex-grow text-zinc-700 bg-gray-200 p-2 rounded-sm border"
                aria-label="Member Name"
              />
              <button
                className="w-28 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              aria-label="Merch Image"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm">Price</label>
            <input
              type="number"
              name="price"
              value={price || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              aria-label="Quantity"
            />
          </div>
          <div className="mb-4">
            <label className="text-sm">Description</label>
            <input
              type="text"
              name="description"
              value={description || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              aria-label="Description"
            />
          </div>

          {/* Category Input */}
          <div className="mb-2 flex flex-col">
            <label className="w-24 mr-2 text-sm">Category</label>
            <select
              className="w-full h-8 text-zinc-700 bg-gray-200"
              name="category"
              value={category}
              onChange={handleChange}
            >
              {choosenCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-sm hover:bg-green-600 shadow-lg text-sm"
              onClick={updateMerchWithContext}
            >
              UPDATE
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600 shadow-lg text-sm"
              onClick={deleteMerchWithContext}
            >
              DELETE
            </button>
          </div>
        </div>
      </section>

      <div
        className="flex justify-center items-center m-4 p-4 border-solid border-2 border-opacity-20 border-blue-950 rounded-sm shadow h-auto overflow-x-hidden overflow-y-auto"
        style={{ flex: "1 1 60%" }}
      >
        {currentImageName && (
          <div className="flex flex-col w-80 rounded-sm p-1 shadow-lg border-solid border-2 border-blue-800 border-opacity-20 ">
            <div className="flex-1 m-8">
              <img
                src={MerchService.getImageEndpoint() + currentImageName}
                alt={name}
                className="object-contain w-full"
              />
            </div>
            <hr />

            <div className="grid m-2">
              <div className=" bg-white flex flex-col text-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">{name}</h3>

                <p className="text-sm text-center text-gray-800">
                  {description}
                </p>
                <p className="text-2xl text-gray-900 text-start">{price} $</p>
              </div>

              <div className="text-xs">
                <p className="mt-2  text-gray-800">Category: {category}</p>
                <p className="mt-2  text-gray-800">{quantity} left</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteMerch;
