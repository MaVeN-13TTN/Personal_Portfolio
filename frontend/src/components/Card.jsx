import profilePic from "../assets/me.jpeg";

function Card() {
  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 bg-purple-600 rounded-full blur-xl opacity-75"></div>
      <img
        className="relative w-64 h-64 rounded-full object-cover border-4 border-princeton-orange"
        src={profilePic}
        alt="Ndung'u Kinyanjui"
      />
    </div>
  );
}

export default Card;
