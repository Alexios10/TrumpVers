import { FC } from "react";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";

const StaffMemberItems: FC<IStaff> = ({
  name,
  image,
  description,
  title,
  email,
}) => {
  return (
    <article className="mx-5 my-4 rounded-sm p-1 shadow-lg h-40 w-96 border-solid border-2 border-blue-950 border-opacity-20 overflow-x-hidden overflow-y-auto">
      <div className="m-2">
        <div className="flex justify-between items-center ">
          <h3 className="text-sm align-text-top">{name}</h3>
          <p>{title}</p>
          <img
            src={StaffMembersService.getImageEndpoint() + image}
            alt={name}
            className="object-contain w-28 h-full "
          />
        </div>
        <p className="text-xs">{description}</p>
        <p className="mt-2 text-base">{email}</p>
        <button className="text-black font-bold text-xs">... Read more</button>
      </div>
    </article>
  );
};

export default StaffMemberItems;
