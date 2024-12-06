import { ChangeEvent, useContext, useEffect, useState } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffmemberList from "./StaffMemberList";
import UpdateDeleteMember from "./UpdateDeleteMember";
import StaffMembersService from "../../services/StaffMembersService";

const RegisterMember = () => {
  const { postMember } = useContext(StaffMemberContext) as IStaffContext;

  const [currentImageName, setCurrentImageName] = useState<string | null>(null); // Stores current image
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activePage, setActivePage] = useState<"register" | "admin">(
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

  const switchPage = (page: "register" | "admin") => {
    setActivePage(page);
  };

  return (
    <section className="flex flex-wrap gap-6 p-4 lg:flex-nowrap">
      <div className="bg-white flex flex-col p-4 rounded-md shadow-md w-full lg:w-2/5">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => switchPage("register")}
            className={`p-2 text-white rounded-md shadow-md text-sm transition ${
              activePage === "register"
                ? "bg-blue-600"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            Register New Member
          </button>

          <button
            onClick={() => switchPage("admin")}
            className={`p-2 text-white rounded-md shadow-md text-sm transition ${
              activePage === "admin"
                ? "bg-blue-600"
                : "bg-blue-900 hover:bg-blue-700"
            }`}
          >
            Members Admin
          </button>
        </div>
        {activePage === "admin" && <UpdateDeleteMember />}

        {activePage === "register" && (
          <div className="flex flex-col">
            <h3 className="text-2xl font-semibold mb-4 text-blue-900">
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
                  <label className="text-sm font-medium">{label}</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md"
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
                  className="w-full text-zinc-700 bg-gray-100 p-2 rounded-md"
                  name="image"
                  type="file"
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              onClick={registerMember}
              className="mt-4 bg-blue-900 text-white p-2 rounded-md hover:bg-blue-700 shadow-md"
            >
              ADD MEMBER
            </button>
          </div>
        )}
      </div>
      <div className="flex-1 m-4 p-4 border border-opacity-20 border-blue-900 rounded-md shadow-md overflow-hidden">
        {activePage === "register" ? (
          <div className=" visible">
            <StaffmemberList />
          </div>
        ) : (
          ""
        )}
        {activePage === "admin" ? (
          <div className="space-y-2 flex flex-col w-80 border-2 border-cyan-400 p-5">
            <img
              src={StaffMembersService.getImageEndpoint() + image}
              alt={name}
              className="w-32 h-32 object-cover rounded-md"
            />
            <p>
              <strong>ID:</strong> {id}
            </p>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Description:</strong> {description}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Title:</strong> {title}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default RegisterMember;
