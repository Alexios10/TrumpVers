import { ChangeEvent, useContext, useEffect, useState } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffmemberList from "./StaffMemberList";
import UpdateDeleteMember from "./UpdateDeleteMember";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";

const RegisterMember = () => {
  const { members, postMember } = useContext(
    StaffMemberContext
  ) as IStaffContext;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [activePage, setActivePage] = useState<"register" | "admin">(
    () =>
      (localStorage.getItem("activePage") as "register" | "admin") || "register"
  );
  const [selectedMember, setSelectedMember] = useState<IStaff | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");

  useEffect(() => {
    // Save activePage to localStorage whenever it changes
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;

      case "image":
        const file = e.target.files ? e.target.files[0] : null;
        setImage(file);
        break;

      case "title":
        setTitle(e.target.value);
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
      email,
    };

    postMember(newMember, image);

    alert("Member registered successfully!");
    setName("");
    setImage(null);
    setTitle("");
    setEmail("");
  };

  const switchPage = (page: "register" | "admin") => {
    setActivePage(page);
  };

  const filteredTitle =
    filterCategory === "All"
      ? members
      : members.filter((member) => member.title === filterCategory);

  return (
    <section className="flex">
      <div
        className="bg-white h-screen flex flex-col border-r-2 border-slate-400"
        style={{ flex: "1 1 40%" }}
      >
        <div className="flex gap-4 mx-3 mb-5">
          <button
            onClick={() => switchPage("register")}
            className={`p-2 bg-blue-900 text-white rounded hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "register" ? "bg-blue-500" : ""
            }`}
          >
            Register New Member
          </button>

          <button
            onClick={() => switchPage("admin")}
            className={`p-2 bg-blue-900 text-white rounded hover:bg-blue-500 shadow-lg text-sm ${
              activePage === "admin" ? "bg-blue-500" : ""
            }`}
          >
            Members Admin
          </button>
        </div>
        {activePage === "admin" && <UpdateDeleteMember />}

        {activePage === "register" && (
          <div className="flex flex-col items-center">
            <h3 className="text-3xl mb-2 text-blue-950">Register new Member</h3>
            {/* Registration container */}
            <div className="flex-1 bg-white h-screen flex flex-col">
              <div className="flex-1/2 flex flex-col items-center">
                <div className="w-96 items-start">
                  {/* Name input */}
                  <div className="mb-4 flex flex-col">
                    <label className="w-24 mr-2 text-sm">Name</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Image input */}
                  <div className="mb-4 flex flex-col">
                    <label className="w-24 mr-2 text-sm">Image</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                      name="image"
                      type="file"
                      onChange={handleChange}
                    />
                  </div>
                  {/* Title input */}
                  <div className="mb-4 flex flex-col">
                    <label className="w-24 mr-2 text-sm">Title</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                      name="title"
                      value={title}
                      onChange={handleChange}
                    />
                  </div>
                  {/* Email input */}
                  <div className="mb-4 flex flex-col">
                    <label className="w-24 mr-2 text-sm">Email</label>
                    <input
                      className="w-full text-zinc-700 bg-gray-200 p-2 rounded-md"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                {/* Add Member button */}
                <button
                  onClick={registerMember}
                  className="mb-4 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                >
                  Add Member
                </button>
              </div>
            </div>

            <hr className="w-4/5 h-0.5 mx-auto rounded m-2 bg-slate-400" />
          </div>
        )}
      </div>

      {/* Right Container for Selected Member */}
      {activePage === "register" && (
        <>
          {" "}
          <div
            className="mx-8 flex-1 p-14 border-solid border-2 border-opacity-20 border-blue-950 rounded-sm shadow h-[42rem] overflow-x-hidden overflow-y-auto"
            style={{ flex: "1 1 60%" }}
          >
            <StaffmemberList />
          </div>
        </>
      )}
    </section>
  );
};

export default RegisterMember;
