import { ChangeEvent, useContext, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import IMerch from "../../interfaces/merchandise/IMerch";
import MerchService from "../../services/MerchService";
import Container from "../shared/Container";
import UpdateDeleteBtns from "../shared/UpdateDeleteBtns";

const UpdateDeleteMerch = () => {
  // Henter funksjoner fra MerchandiseContext for å håndtere varer
  const { getMerchById, getMerchByName, putMerch, deleteMerch } = useContext(
    MerchandiseContext
  ) as IMerchContext;

  // State variabler for inputfeltene
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Holder på det nåværende bilde-navnet hvis bildet ikke endres
  const [currentImageName, setCurrentImageName] = useState<string | null>(null);

  // Kategorier som kan velges for produktet
  const choosenCategories = [
    "Select a category",
    "Hats",
    "T-shirts",
    "Hoodies",
    "Accessories",
  ];

  // Funksjon for å håndtere endringer i inputfeltene
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

  // Funksjon for å hente en vare ved ID fra konteksten
  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter item id");
      return;
    }
    try {
      const merch = await getMerchById(id);
      if (merch) {
        // Fyller inputfeltene med informasjonen til varen som ble funnet
        setId(merch.id ?? null);
        setName(merch.name ?? "");
        setDescription(merch.description ?? "");
        setPrice(merch.price ?? "");
        setQuantity(merch.quantity ?? "");
        setCategory(merch.category ?? "");
        setCurrentImageName(merch.image ?? null);
        setImage(null);
      } else {
        alert(`Item with id "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // Funksjon for å hente en vare ved navn fra konteksten
  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter item name");
      return;
    }

    try {
      const member = await getMerchByName(name);
      if (member) {
        // Fyller inputfeltene med informasjonen til varen som ble funnet
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setPrice(member.price ?? "");
        setQuantity(member.quantity ?? "");
        setCategory(member.category ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null); // Nullstiller bildet etter henting
      } else {
        alert(`Item with name "${name}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };

  // Funksjon for å oppdatere varen med de nye verdiene
  const updateMerchWithContext = async () => {
    if (!id) {
      alert("Cannot update. Item not found.");
      return;
    }

    const merchToUpdate: IMerch = {
      id: id,
      name: name,
      image: image ? image.name : currentImageName, // Bruker nytt bilde hvis valgt, ellers beholder gammel
      description: description,
      category: category,
      price: parseInt(price.toString()),
      quantity: parseInt(quantity.toString()),
    };

    // Sender oppdaterte data til konteksten for å oppdatere varen
    const result = await putMerch(merchToUpdate, image);
    if (result) {
      alert("Item updated successfully.");
    }
  };

  // Funksjon for å slette varen
  const deleteMerchWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Item not found.");
      return;
    }

    // Sletter varen fra konteksten
    deleteMerch(id);
    alert(`Item with ID ${id} deleted.`);
  };

  // Inputfeltene for pris, kvantitet, beskrivelse, og bilde
  const inputfields = [
    { label: "Price:", name: "price", value: price, type: "number" },
    { label: "Quantity:", name: "quantity", value: quantity, type: "number" },
    {
      label: "Description:",
      name: "description",
      value: description,
      type: "text",
    },
    { label: "Image::", name: "image", type: "file" },
  ];

  return (
    <section className="flex flex-col md:flex-row">
      {/* Form for oppdatering og sletting av varer */}
      <div className="flex flex-col items-center basis-[40%]">
        <h3 className="text-3xl mb-5 text-blue-950 ">Update or Delete Merch</h3>
        <div className="space-y-3">
          {/* Get item by Name */}
          <div className="flex flex-col">
            <label className="text-sm">Get item by Name</label>
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

          {/* Get item by ID */}
          <div className=" flex flex-col">
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

          {/* Inputfelter for pris, kvantitet og beskrivelse */}
          {inputfields.map(({ label, name, value, type }) => (
            <div key={name} className="mb-4 flex flex-col">
              <label className="text-sm">{label}</label>
              <input
                className="input"
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
              />
            </div>
          ))}

          {/* Kategorivelger */}
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

        {/* Oppdater og slett knapper */}
        <UpdateDeleteBtns
          update={updateMerchWithContext}
          onDelete={deleteMerchWithContext}
        />
      </div>

      {/* Vist bilde og info om varen */}
      <Container>
        {currentImageName && (
          <div className="flex flex-col w-80 rounded-sm p-1 shadow-lg border-solid border-2 border-blue-800 border-opacity-20">
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
