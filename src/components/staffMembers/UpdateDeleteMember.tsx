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

  // Tilstander for medlemsinformasjon
  const [id, setId] = useState<number | null>(null);
  const [name, setName] = useState<string>("");
  const [image, setImage] = useState<null | File>(null);
  const [currentImageName, setCurrentImageName] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Håndterer endringer i input-feltene
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const { name, value } = e.target;
    switch (name) {
      case "id":
        setId(Number(value));
        break;
      case "name":
        setName(value);
        break;
      case "image":
        setImage(file);
        break;
      case "description":
        setDescription(value);
        break;
      case "title":
        setTitle(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  // Henter medlem basert på ID fra Context
  const getByIdFromContext = async () => {
    if (!id) {
      alert("Please enter member ID");
      return;
    }
    try {
      const member = await getMemberById(id);
      if (member) {
        // Setter medlemsinformasjon i tilstandene
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

  // Henter medlem basert på navn fra Context
  const getByNameFromContext = async () => {
    if (!name) {
      alert("Please enter member name");
      return;
    }

    try {
      const member = await getMemberByName(name);
      if (member) {
        // Setter medlemsinformasjon i tilstandene
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

  // Oppdaterer medlem med informasjon fra tilstandene
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

    const result = await putMember(memberToUpdate, image || undefined);
    if (result) {
      alert("Member updated successfully.");
    }
  };

  // Sletter medlemmet
  const deleteMemberWithContext = async () => {
    if (id === null) {
      alert("Cannot delete. Member not found.");
      return;
    }

    deleteMember(id);
    alert(`Member with ID ${id} deleted.`);
  };

  // Definerer inputfeltene
  const inputfields = [
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
    <section className="flex flex-col md:flex-row">
      <div className="flex flex-col items-center basis-[40%]">
        <h3 className=" text-3xl mb-2 text-blue-950">
          Update or Delete Member
        </h3>
        <div className="mb-5 flex flex-col space-y-3">
          {/* Stylingen til Get member by Name */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm">Get Member by Name</label>
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

          {/* Stylingen til Get Member by ID */}
          <div className="flex flex-col space-y-1">
            <label className="text-sm ">Get Member by ID</label>
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

          {/* Input feltene */}
          {inputfields.map(({ label, name, value, type }) => (
            <div key={name} className=" flex flex-col space-y-1">
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

          {/* Update og delete knapp */}
          <UpdateDeleteBtns
            update={updateMemberWithContext}
            onDelete={deleteMemberWithContext}
          />
        </div>
      </div>

      {/* Seksjon som vise medlemmene */}
      {currentImageName && (
        <section className="flex justify-center p-4">
          <div className="relative flex flex-col items-center text-center bg-zinc-100 border border-blue-500 rounded-xl overflow-hidden w-80 p-5">
            <p className="absolute top-2 left-2 text-start text-xs">ID: {id}</p>
            <img
              src={StaffMembersService.getImageEndpoint() + currentImageName}
              alt={name}
              className="w-44 h-44 object-cover border-2 border-red-600 rounded-full shadow-md"
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
          </div>
        </section>
      )}
    </section>
  );
};

export default UpdateDeleteMember;
