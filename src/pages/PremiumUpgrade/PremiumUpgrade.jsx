import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const PremiumUpgrade = () => {
  const { dbUser } = useAuth();

  const handleUpgrade = async () => {
    try {
      const res = await api.post(
        "/create-checkout-session",
        {
          amount: 10, // $10 Premium Package
        }
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950 flex items-center justify-center p-6">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">

        <div className="text-6xl mb-4">
          👑
        </div>

        <h1 className="text-4xl font-bold text-slate-800">
          Premium Founder
        </h1>

        <p className="text-gray-500 mt-4">
          Upgrade your founder account and unlock
          unlimited opportunity postings.
        </p>

        <div className="mt-8 bg-indigo-50 rounded-2xl p-6">

          <h3 className="font-bold text-xl mb-4">
            Premium Benefits
          </h3>

          <ul className="space-y-3 text-left">
            <li>✅ Unlimited Opportunity Posts</li>
            <li>✅ Priority Visibility</li>
            <li>✅ Premium Founder Badge</li>
            <li>✅ Better Collaborator Reach</li>
          </ul>

        </div>

        <div className="mt-8">
          <h2 className="text-5xl font-bold text-indigo-600">
            $10
          </h2>

          <p className="text-gray-500">
            One-time payment
          </p>
        </div>

        <button
          onClick={handleUpgrade}
          className="mt-8 w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg hover:scale-105 transition"
        >
          Upgrade Now 🚀
        </button>

      </div>

    </div>
  );
};

export default PremiumUpgrade;