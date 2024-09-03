import profilePic from "../assets/1324.jpg";

function Card() {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-purple-600 rounded-2xl blur-xl opacity-75"></div>
      <img
        className="relative w-80 h-80 rounded-2xl object-cover border-4 border-princeton-orange"
        src={profilePic}
        alt="Ndung'u Kinyanjui"
      />
    </div>
  );
}

export default Card;
