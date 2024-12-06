import { FC } from "react";
import IStaff from "../../interfaces/staffMembers/Istaff";
import StaffMembersService from "../../services/StaffMembersService";
import { LuMail } from "react-icons/lu";

const StaffMemberItems: FC<IStaff> = ({
  name,
  image,
  description,
  title,
  email,
}) => {
  return (
    <section>
      {" "}
      <article className="flex justify-center p-4 ">
        <div className="flex flex-col  w-80 h-auto">
          <div className="flex-1 justify-center ">
            <img
              src={StaffMembersService.getImageEndpoint() + image}
              alt={name}
              className="object-contain w-full h-40"
            />
          </div>
          <div className="flex flex-col justify-center text-center rounded-sm bg-blue-950 bg-opacity-30 text-white font-bold m-2 h-36 shadow-lg">
            <h3 className="text-xl">{name}</h3>
            <p>{title}</p>
            <p>{description}</p>

            <p className="flex items-center justify-center text-sm">
              <LuMail className="mr-2" />
            </p>
            <p className="flex justify-center text-sm">{email}</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default StaffMemberItems;
