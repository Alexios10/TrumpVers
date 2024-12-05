import { ChangeEvent, useContext, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";

const UpdateDeleteMerch = () => {
  const { getMerchByName, putMerch, deleteMerch } = useContext(
    MerchandiseContext
  ) as IMerchContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [currentImageName, setCurrentImageName] = useState<string | null>(null);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

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
    <section className="flex flex-col md:flex-row gap-6 p-4">
      <section className="bg-white w-full md:w-1/3 p-6 shadow-md rounded-lg">
        <header className="text-3xl mb-4 text-blue-950">
          Update or Delete Merch
        </header>
        <div className="space-y-4">
          <div className="mb-4">
            <label className="font-semibold text-sm">Get Merch by Name:</label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                aria-label="Merch Name"
              />
              <button
                className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-500 shadow-lg text-sm"
                onClick={getByNameFromContext}
              >
                Get By Name
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Merch Image"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm">Price:</label>
            <input
              type="number"
              name="price"
              value={price || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm">Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={quantity || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Quantity"
            />
          </div>
          <div className="mb-4">
            <label className="font-semibold text-sm">Description:</label>
            <input
              type="text"
              name="description"
              value={description || ""}
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
              aria-label="Description"
            />
          </div>

          {/* Category Input */}
          <div className="mb-2 flex flex-col">
            <label className="w-24 mr-2 text-[0.625rem]">Category</label>
            <select
              className="w-full text-zinc-700 bg-gray-200"
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
          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-lg text-sm"
              onClick={updateMerchWithContext}
            >
              Update
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 shadow-lg text-sm"
              onClick={deleteMerchWithContext}
            >
              Delete
            </button>
          </div>
        </div>
      </section>

      <div className="flex-1 p-6 bg-white shadow-md rounded-lg overflow-auto">
        {currentImageName && (
          <div className="grid gap-4 text-center">
            <div>
              <span className="font-bold">Name:</span> {name}
            </div>
            <div>
              <span className="font-bold">Price:</span> {price}
            </div>
            <div>
              <span className="font-bold">Quantity:</span> {quantity}
            </div>
            <div>
              <span className="font-bold">Description:</span> {description}
            </div>
            <div>
              <span className="font-bold">Category:</span> {category}
            </div>
            <img
              src={MerchService.getImageEndpoint() + currentImageName}
              alt={name}
              className="w-40 h-40 object-cover mx-auto border rounded-md"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default UpdateDeleteMerch;
