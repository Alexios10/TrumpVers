import ThoughtList from "./ThoughtList";

const Thoughts = () => {
  return (
    <div className="mx-60">
      <h2 className="text-center text-bold text-6xl text-blue-950 mb-2">
        From the President's Desk:
      </h2>
      <h3 className="text-center text-bold text-5xl text-blue-950 mb-8">
        Thoughtful Dialogues on Our Country's Future
      </h3>
      <ThoughtList />
    </div>
  );
};

export default Thoughts;
