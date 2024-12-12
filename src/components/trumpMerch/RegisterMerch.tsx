import { ChangeEvent, useContext, useEffect, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import UpdateDeleteMerch from "./UpdateDeleteMerch";
import MerchList from "./MerchList";
import SwitchPageButtons from "../shared/SwitchPageButtons";
import Container from "../shared/Container";

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

  const [activePage, setActivePage] = useState<string>(
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

  const choosenCategoriy = [
    "Select a category",
    "Hats",
    "T-shirts",
    "Hoodies",
    "Accessories",
  ];

  const pages = [
    { id: "register", label: "REGISTER MERCH" },
    { id: "admin", label: "MERCH ADMIN" },
  ];

  const inputfields = [
    { label: "Name:", name: "name", value: name, type: "text" },
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
    <>
      <div className="flex w-fit ml-[3rem]">
        <SwitchPageButtons
          pages={pages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      {activePage === "admin" && <UpdateDeleteMerch />}

      <section className="flex flex-col md:flex-row">
        <div className="flex flex-col h-fit items-center basis-[40%]">
          {activePage === "register" && (
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950 border-b-2">
                Register new Merch
              </h3>
              {/* Registration container */}
              <div className="flex flex-col">
                <div className="space-y-4">
                  {/* input fields */}
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

                  {/* category input */}
                  <div className="flex flex-col">
                    <label className="w-25 text-sm">Select Category:</label>
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

                {/* Add Merch button */}
                <button
                  onClick={registerMerch}
                  className="mt-4 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-700 shadow-md"
                >
                  ADD MERCH
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Container for Selected Member */}
        {activePage === "register" && (
          <>
            <Container>
              <MerchList merchs={merchandise} />
            </Container>
          </>
        )}
      </section>
    </>
  );
};

export default RegisterMerch;
