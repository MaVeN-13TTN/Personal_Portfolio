import profilePic from "../assets/cloud-computing.svg";

function Card() {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-xl opacity-75"></div>
      <img
        className="relative w-96 h-96 rounded-2xl object-cover border-4 border-princeton-orange"
        src={profilePic}
        alt="Cloud Computing"
      />
    </div>
  );
}

export default Card;
