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

  // State for inputfeltene og aktiv side
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activePage, setActivePage] = useState<string>(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );

  // useEffect for å lagre den aktive siden i lokal lagring
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // Håndterer endringer i inputfeltene
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "image":
        setImage(file);
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
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

  // Array med konfigurasjoner for imputfelt
  const inputfields = [
    { label: "Name:", name: "name", value: name },
    { label: "Title:", name: "title", value: title },
    {
      label: "Description:",
      name: "description",
      value: description,
    },
    { label: "Email:", name: "email", value: email },
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
      {activePage === "admin" && <UpdateDeleteMember />}

      <section className="flex flex-col md:flex-row">
        <div className="flex flex-col h-fit items-center basis-[40%]">
          {activePage === "register" && (
            <div className="flex flex-col items-center">
              <h3 className="text-3xl mb-2 text-blue-950 border-b-2">
                Register New Member
              </h3>
              <div className="flex flex-col">
                <div className="space-y-4">
                  {inputfields.map(({ label, name, value }) => (
                    <div key={name} className="mb-4 flex flex-col">
                      <label className="text-sm">{label}</label>
                      <input
                        className="input"
                        type="text"
                        name={name}
                        value={value}
                        onChange={handleChange}
                      />
                    </div>
                  ))}

                  <div className="flex flex-col">
                    <label className="text-sm">Image:</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                      name="image"
                      type="file"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  onClick={registerMember}
                  className="mt-4 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-700 shadow-md"
                >
                  ADD MEMBER
                </button>
              </div>
            </div>
          )}

          {/*  Vil at "Container" skal kun vise i register siden */}
        </div>
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
