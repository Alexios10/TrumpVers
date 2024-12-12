import { useContext } from "react";
import StaffMemberItems from "./StaffMemberItems";
import { StaffMemberContext } from "../../contexts/StaffMembersContext";
import IStaffContext from "../../interfaces/staffMembers/IStaffContext";

const Staff = () => {
  const { members } = useContext(StaffMemberContext) as IStaffContext;

  // Funksjon for å lage JSX for ansatte
  const createAndGetStaffJSX = () => {
    const staffMemberJSX = members.map((member) => {
      return (
        <StaffMemberItems
          key={member.id}
          id={member.id}
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
    // Stilsetter Staff siden
    <section>
      <h2 className="text-center font-bold sm:text-2xl lg:text-4xl text-blue-950 mb-2">
        President & Staff:
      </h2>
      <h3 className="text-center font-bold sm:text-xl lg:text-3xl text-blue-950 mb-8">
        Building a Stronger Future Together
      </h3>
      {/* gjør siden responsiv utifra skjermstørrelse */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-28">
        {createAndGetStaffJSX()}
      </div>
    </section>
  );
};

export default Staff;
