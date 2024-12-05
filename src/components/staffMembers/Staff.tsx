import { useContext } from "react";
import StaffMemberItems from "./StaffMemberItems";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";

const Staff = () => {
  const { members } = useContext(StaffMemberContext) as IStaffContext;

  const createAndGetStaffJSX = () => {
    const staffMemberJSX = members.map((member) => {
      return (
        <StaffMemberItems
          key={member.id}
          name={member.name}
          image={member.image}
          description={member.description}
          title={member.title}
          email={member.email}
        />
      );
    });

    return staffMemberJSX;
  };

  return (
    <div className="grid sm:grid-cols-1 lg:grid-cols-4 gap-2">
      {createAndGetStaffJSX()}
    </div>
  );
};

export default Staff;
