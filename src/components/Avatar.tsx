import CheckVerifiedIcon from "../assets/check-verified.svg";

export default function Avatar({ image, isVerified }) {
  return (
    <div className="relative">
      <img src={image} alt="" className="w-8 h-8 rounded-full md:w-8 md:h-8 lg:w-12 lg:h-12" />
      {isVerified && (
        <img
          src={CheckVerifiedIcon}
          alt=""
          className="w-3 h-3 absolute bottom-0 right-0 z-10 md:w-4 md:h-4 lg:w-5 lg:h-5"
        />
      )}
    </div>
  );
}
