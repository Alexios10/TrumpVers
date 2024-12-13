import { ChangeEvent, useContext, useEffect, useState } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffmemberList from "./StaffMemberList";
import UpdateDeleteMember from "./UpdateDeleteMember";
import SwitchPageButtons from "../shared/SwitchPageButtons";
import Container from "../shared/Container";

// Komponenter for å registrere et nytt Staff medlem
const RegisterMember = () => {
  const { postMember } = useContext(StaffMemberContext) as IStaffContext;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activePage, setActivePage] = useState<string>(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );

  // Lagre den aktive siden i lokal lagring.
  // For å beholde den nåværende siden ved "refresh" av nettsiden
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Håndterer endringer i inputfeltene
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "image":
        setImage(file);
        break;
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  // Funskjon for å registrere et nytt medlem
  const registerMember = () => {
    if (!name || !email || !image) {
      alert("Please fill in all fields.");
      return;
    }

    // Opprette et nytt medlem - objekt
    const newMember = {
      name,
      image: image.name,
      title,
      description,
      email,
    };

    postMember(newMember, image);

    alert("Member registered successfully!");
    setName("");
    setImage(null);
    setTitle("");
    setDescription("");
    setEmail("");
  };

  const pages = [
    { id: "register", label: "REGISTER NEW STAFF" },
    { id: "admin", label: "STAFF ADMIN" },
  ];

  // Array med konfigurasjoner for inputfelt
  const inputfields = [
    { label: "Name:", name: "name", value: name, type: "text" },
    { label: "Title:", name: "title", value: title, type: "text" },
    {
      label: "Description:",
      name: "description",
      value: description,
      type: "text",
    },
    { label: "Email:", name: "email", value: email, type: "text" },
    { label: "Image:", name: "image", type: "file" },
  ];

  return (
    <>
      {/* Navigerings knappene */}
      <SwitchPageButtons
        pages={pages}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {/* Navigere til oppdater/slett komponent */}
      {activePage === "admin" && <UpdateDeleteMember />}

      {/* Hoved kontainer */}
      <section className="flex flex-col md:flex-row">
        <div className="flex flex-col h-fit items-center basis-[40%]">
          {activePage === "register" && (
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950 border-b-2">
                Register New Member
              </h3>
              <div className="space-y-4">
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
              </div>

              <button onClick={registerMember} className="add-btn">
                ADD MEMBER
              </button>
            </div>
          )}
        </div>

        {/*  Høyre(resultat) kontainer kunn i registrerings side */}
        {activePage === "register" && (
          <Container>
            <StaffmemberList />
          </Container>
        )}
      </section>
    </>
  );
};

export default RegisterMember;
