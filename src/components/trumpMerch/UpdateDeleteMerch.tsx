import { ChangeEvent, useContext, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";
import Container from "../shared/Container";

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
    <section className="flex">
      {/* Left container */}
      <div className="flex flex-col items-center mx-10 basis-[40%]">
        <h3 className="text-3xl mb-2 text-blue-950 ">Shop Admin</h3>
        <div className="w-96 items-start">
          {/* Get Thought by Name */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">
              Get item by Name
            </label>
            <div className="flex gap-3">
              <input
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
          </div>

          {/* Get Thought by ID */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm ">Get item by ID</label>
            <div className="flex gap-3">
              <input
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                type="number"
                name="id"
                onChange={handleChange}
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">Image</label>
            <input
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              type="file"
              name="image"
              onChange={handleChange}
              aria-label="Merch Image"
            />
          </div>

          {/* Price Input */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">Price</label>
            <input
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              type="number"
              name="price"
              value={price || ""}
              onChange={handleChange}
            />
          </div>

          {/* Quantity Input */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">Quantity</label>
            <input
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              type="number"
              name="quantity"
              value={quantity || ""}
              onChange={handleChange}
              aria-label="Quantity"
            />
          </div>

          {/* Description Input */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">Description</label>
            <input
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
              type="text"
              name="description"
              value={description || ""}
              onChange={handleChange}
              aria-label="Description"
            />
          </div>

          {/* Category Input */}
          <div className="mb-4 flex flex-col">
            <label className="w-40 mr-2 text-sm">Category</label>
            <select
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
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
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 p-2">
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

      <Container>
        {currentImageName && (
          <div className="flex flex-col w-80 rounded-sm p-1 shadow-lg border-solid border-2 border-blue-800 border-opacity-20  ">
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
                <p className="mt-2 text-gray-800">Category: {category}</p>
                <p className="mt-2 text-gray-800">{quantity} left</p>
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default UpdateDeleteMerch;