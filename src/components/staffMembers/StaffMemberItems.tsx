import { FC } from "react";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";
import { LuMail } from "react-icons/lu";

const StaffMemberItems: FC<IStaff> = ({
  id,
  name,
  image,
  description,
  title,
  email,
}) => {
  return (
    // Stilsetter Staff kortene
    <section className="flex justify-center p-4">
      <div className="bg-zinc-100 border border-solid border-blue-500 rounded-xl shadow-xl px-16 py-4 text-center overflow-hidden">
        <img
          src={StaffMembersService.getImageEndpoint() + image}
          alt={name}
          className="w-44 h-44 border-2 border-red-600 rounded-full mx-auto shadow-md object-cover"
        />
        <h3 className="text-lg font-bold text-blue-700 mt-4">{name}</h3>
        <p className="text-sm font-medium text-red-500">{title}</p>
        <p className="text-xs italic text-gray-600 mt-2">{description}</p>
        <a
          href={`mailto:${email}`}
          className="w-full text-xs inline-flex items-center justify-center mt-4 font-medium text-blue-600 hover:text-red-600 transition"
        >
          {/* Epost ikon gjennom React icons */}
          <LuMail className="mr-2" />
          {email}
        </a>
        <p className="text-start text-xs">ID: {id}</p>
      </div>
    </section>
  );
};

export default StaffMemberItems;
