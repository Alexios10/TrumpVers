import { ChangeEvent, useContext, useEffect, useState } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffmemberList from "./StaffMemberList";
import UpdateDeleteMember from "./UpdateDeleteMember";
import SwitchPageButtons from "../shared/SwitchPageButtons";
import Container from "../shared/Container";

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

  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

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

  const registerMember = () => {
    if (!name || !email || !image) {
      alert("Please fill in all fields.");
      return;
    }

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
    { id: "register", label: "Register New Member" },
    { id: "admin", label: "Member Admin" },
  ];

  return (
    <>
      <div className="flex w-fit ml-[6rem]">
        <SwitchPageButtons
          pages={pages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </div>
      <section className="flex flex-wrap gap-6 p-4 lg:flex-nowrap ">
        <div className="bg-white flex flex-col p-4  w-full lg:w-2/5">
          {/* <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => switchPage("register")}
            className={`p-2 text-white rounded-sm shadow-md text-sm transition ${
              activePage === "register"
                ? "bg-blue-600"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            REGISTER NEW MEMEBER
          </button>
          <button
            onClick={() => switchPage("admin")}
            className={`p-2 text-white rounded-sm shadow-md text-sm transition ${
              activePage === "admin"
                ? "bg-blue-600"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            MEMEBERS ADMIN
          </button>
        </div> */}
          {activePage === "admin" && <UpdateDeleteMember />}

          {activePage === "register" && (
            <div className="flex flex-col mx-20">
              <h3 className="text-3xl mb-2 text-blue-950 text-center">
                Register New Member
              </h3>
              <div className="space-y-4">
                {[
                  { label: "Name", name: "name", value: name },
                  { label: "Title", name: "title", value: title },
                  {
                    label: "Description",
                    name: "description",
                    value: description,
                  },
                  { label: "Email", name: "email", value: email },
                ].map(({ label, name, value }) => (
                  <div key={name} className="flex flex-col">
                    <label className="text-sm">{label}</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm"
                      type="text"
                      name={name}
                      value={value}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="flex flex-col">
                  <label className="text-sm font-medium">Image</label>
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
          )}
        </div>
        <Container>
          {activePage === "register" && <StaffmemberList />}
        </Container>
      </section>
    </>
  );
};

export default RegisterMember;
