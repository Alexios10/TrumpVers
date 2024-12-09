import ThoughtList from "./ThoughtList";

const Thoughts = () => {
  return (
    <div className="sm:mx-32 md:mx-40 lg:mx-52">
      <h2 className="text-center text-bold sm:text-3xl lg:text-5xl text-blue-950 mb-2">
        From the President's Desk:
      </h2>
      <h3 className="text-center text-bold sm:text-xl lg:text-4xl text-blue-950 mb-8">
        Thoughtful Dialogues on Our Country's Future
      </h3>
      <ThoughtList />
    </div>
  );
};

export default Thoughts;
