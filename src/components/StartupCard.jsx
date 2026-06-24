const StartupCard = ({ startup }) => {
  return (
    <div className="border rounded-xl p-5 shadow-sm">

      <img
        src={startup.logo}
        alt={startup.startup_name}
        className="h-40 w-full object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-4">
        {startup.startup_name}
      </h2>

      <p className="text-gray-600 mt-2">
        Industry: {startup.industry}
      </p>

      <p className="text-gray-600">
        Founder: {startup.founderEmail}
      </p>
      <p className="text-gray-600">
        Founder: {startup.founderName}
      </p>

    </div>
  );
};

export default StartupCard;