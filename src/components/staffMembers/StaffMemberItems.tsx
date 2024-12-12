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
    <section className="flex justify-center p-4">
      <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-auto p-4 bg-zinc-100 border border-solid border-blue-500 rounded-xl shadow-xl text-center overflow-hidden">
        <p className="text-start text-xs">ID: {id}</p>
        <img
          src={StaffMembersService.getImageEndpoint() + image}
          alt={name}
          className="w-32 h-32 border-2 border-red-600 rounded-full mx-auto shadow-md object-cover"
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
      </div>
    </section>
  );
};

export default StaffMemberItems;
