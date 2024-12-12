import { ChangeEvent, useContext, useEffect, useState } from "react";
import { MerchandiseContext } from "../../contexts/MerchandiseContext";
import IMerchContext from "../../interfaces/merchandise/IMerchContexts";
import UpdateDeleteMerch from "./UpdateDeleteMerch";
import MerchList from "./MerchList";
import SwitchPageButtons from "../shared/SwitchPageButtons";
import Container from "../shared/Container";

const RegisterMerch = () => {
  // Henter konteksten for merchandise (varer) og funksjonen for å legge til nye varer
  const { merchandise, postMerch } = useContext(
    MerchandiseContext
  ) as IMerchContext;

  // State variabler for inputfeltene
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [price, setPrice] = useState<number | string>("");
  const [quantity, setQuantity] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  // Holder styr på hvilken side som er aktiv (registrering eller administrasjon)
  const [activePage, setActivePage] = useState<string>(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );

  // Oppdaterer aktiv side i lokal lagring når den endres
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Funksjon for å håndtere endringer i inputfeltene
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

  // Funksjon for å registrere en ny vare
  const registerMerch = () => {
    // Sjekker at alle nødvendige felter er fylt ut
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

    // Sender data til backend for å registrere varen
    postMerch(newMerch, image);

    alert("Merch registered successfully!");
    // Tilbakestiller inputfeltene etter registrering
    setName("");
    setImage(null);
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
  };

  // Kategorier som kan velges
  const choosenCategoriy = [
    "Select a category",
    "Hats",
    "T-shirts",
    "Hoodies",
    "Accessories",
  ];

  // Sider som kan velges
  const pages = [
    { id: "register", label: "REGISTER MERCH" },
    { id: "admin", label: "MERCH ADMIN" },
  ];

  // Definerer inputfeltene for registreringen
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
      {/* Knapp for å bytte mellom ulike sider (registrering eller admin) */}
      <SwitchPageButtons
        pages={pages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {activePage === "admin" && <UpdateDeleteMerch />}

      <section className="flex flex-col md:flex-row">
        <div className="flex flex-col h-fit items-center basis-[40%]">
          {activePage === "register" && (
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950">
                Register new Merch
              </h3>
              {/* Registreringsskjema */}
              <div className="space-y-4">
                {/* Løkke for å vise inputfeltene */}
                {inputfields.map(({ label, name, value, type }) => (
                  <div key={name} className="mb-4 flex flex-col space-y-1">
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

                {/* Kategorivalg */}
                <div className="flex flex-col space-y-1">
                  <label className="text-sm">Select Category:</label>
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

              {/* Knapp for å registrere vare */}
              <button onClick={registerMerch} className="add-btn">
                ADD MERCH
              </button>
            </div>
          )}
        </div>

        {/* Høyre seksjon for å vise varer */}
        {activePage === "register" && (
          <Container>
            <MerchList merchs={merchandise} />
          </Container>
        )}
      </section>
    </>
  );
};

export default RegisterMerch;
