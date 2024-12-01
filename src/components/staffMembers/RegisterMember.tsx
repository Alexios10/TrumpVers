import { ChangeEvent, useContext, useState } from "react";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import StaffmemberList from "./StaffMemberList";

const RegisterMember = () => {
  const { postMember } = useContext(StaffMemberContext) as IStaffContext;

  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

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
      image: image.name, // You can adjust the backend handling of this value
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

  return (
    <section className="flex">
      <div
        className="bg-white h-screen flex flex-col border-r-2 border-slate-400"
        style={{ flex: "1 1 40%" }}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-3xl mb-2 text-blue-950">Register new Member</h3>
          <div className="flex-1 bg-white h-screen flex flex-col">
            <div className="flex-1/2 flex flex-col items-center">
              <div className="w-96 items-start">
                <div className="mb-2 flex flex-col">
                  <label className="w-24 mr-2 text-[0.625rem]">Name</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="w-24 mr-2 text-[0.625rem]">Image</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200"
                    name="image"
                    type="file"
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="w-24 mr-2 text-[0.625rem]">Title</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-2 flex flex-col">
                  <label className="w-24 mr-2 text-[0.625rem]">Email</label>
                  <input
                    className="w-full text-zinc-700 bg-gray-200"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                onClick={registerMember}
                className="mb-2 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
              >
                Add Member
              </button>
            </div>
          </div>

          <hr className="w-4/5 h-0.5 mx-auto rounded m-2 bg-slate-400" />

          <div className="h-96 overflow-x-hidden overflow-y-auto">
            <StaffmemberList />
          </div>
        </div>
      </div>

      <div
        className="m-8 flex-1 bg-green-100 h-screen"
        style={{ flex: "1 1 60%" }}
      ></div>
    </section>
  );
};

export default RegisterMember;
