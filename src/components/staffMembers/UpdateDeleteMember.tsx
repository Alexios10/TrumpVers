import { ChangeEvent, useContext, useState } from "react";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";
import { LuMail } from "react-icons/lu";
import UpdateDeleteBtns from "../shared/UpdateDeleteBtns";

const UpdateDeleteMember = () => {
  const { getMemberById, getMemberByName, putMember, deleteMember } =
    useContext(StaffMemberContext) as IStaffContext;

  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [currentImageName, setCurrentImageName] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      case "description":
        setDescription(e.target.value);
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

  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter member ID");
      return;
    }
    try {
      const member = await getMemberById(id);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setTitle(member.title ?? "");
        setEmail(member.email ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null);
      } else {
        alert(`Member with ID "${id}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter member name");
      return;
    }

    try {
      const member = await getMemberByName(name);
      if (member) {
        setId(member.id ?? null);
        setName(member.name ?? "");
        setDescription(member.description ?? "");
        setTitle(member.title ?? "");
        setEmail(member.email ?? "");
        setCurrentImageName(member.image ?? null);
        setImage(null);
      } else {
        alert(`Member with name "${name}" not found.`);
      }
    } catch (error) {
      console.error("Error fetching member:", error);
    }
  };

  const updateMemberWithContext = async () => {
    if (!id) {
      alert("Cannot update. Member not found.");
      return;
    }

    const memberToUpdate: IStaff = {
      id: id,
      name: name,
      image: image ? image.name : currentImageName,
      description: description,
      title: title,
      email: email,
    };

    const result = await putMember(memberToUpdate, image);
    if (result) {
      alert("Member updated successfully.");
    }
  };

  const deleteMemberWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Member not found.");
      return;
    }

    deleteMember(id);
    alert(`Member with ID ${id} deleted.`);
  };

  const inputfields = [
    { label: "Title:", name: "title", value: title },
    { label: "Description:", name: "description", value: description },
    { label: "Email:", name: "email", value: email },
  ];

  return (
    <section className="flex flex-col md:flex-row">
      {/* form container */}
      <div className="flex flex-col items-center basis-[40%]">
        <h3 className=" text-3xl mb-2 text-blue-950">
          Update or Delete Member
        </h3>
        <div className="mb-5 flex flex-col">
          {/* get by name */}
          <div className="flex flex-col">
            <label className="w-40 mr-2 text-sm mb-2">Get Member by Name</label>
            <div className="flex gap-3">
              <input
                className="input"
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                aria-label="Member Name"
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow text-xs"
                onClick={getByNameFromContext}
              >
                GET BY NAME
              </button>
            </div>
          </div>

          {/* get by id */}
          <div className="flex flex-col">
            <label className="w-40 mr-2 text-sm ">Get Member by ID</label>
            <div className="flex gap-3 items-center">
              <input
                className="input"
                type="number"
                name="id"
                onChange={handleChange}
                aria-label="Member ID"
              />
              <button
                className="w-36 h-10 bg-blue-900 text-white p-2 rounded-sm hover:bg-blue-500 shadow-lg text-xs"
                onClick={getByIdFromContext}
              >
                GET BY ID
              </button>
            </div>
          </div>

          {/* input fields */}
          {inputfields.map(({ label, name, value }) => (
            <div key={name} className=" flex flex-col">
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

          {/* image input */}
          <div>
            <label className="text-sm">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="w-full text-zinc-700 bg-gray-200 p-2 rounded-sm border"
              aria-label="Member Image"
            />
          </div>

          {/* update & delete buttons */}
          <UpdateDeleteBtns
            update={updateMemberWithContext}
            onDelete={deleteMemberWithContext}
          />
        </div>
      </div>

      {/* result conatiner */}
      {currentImageName && (
        <section className="pl-[50%]">
          <div className="flex flex-col text-center bg-zinc-100 border-solid border-blue-500 rounded-xl overflow-hidden w-96 h-96 border mt-10 p-5">
            <img
              src={StaffMembersService.getImageEndpoint() + currentImageName}
              alt={name}
              className=" w-44 h-44 object-cover border-2 border-red-600  rounded-full shadow-md"
            />
            <h3 className="text-lg font-bold text-blue-700 mt-4">{name}</h3>
            <p className="text-sm font-medium text-red-500">{title}</p>
            <p className="text-xs italic text-gray-600 mt-2">{description}</p>
            <a
              href={`mailto:${email}`}
              className="w-full text-xs inline-flex items-center justify-center mt-4 font-medium text-blue-600 hover:text-red-600 hover:underline transition"
            >
              <LuMail className="mr-2" />
              {email}
            </a>
            <p className="text-start text-xs">ID: {id}</p>
          </div>
        </section>
      )}
    </section>
  );
};

export default UpdateDeleteMember;
