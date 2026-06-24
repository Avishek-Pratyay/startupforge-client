import { useEffect } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";

const PaymentSuccess = () => {
  const { dbUser } = useAuth();

  useEffect(() => {
  const savePayment = async () => {
    try {
      const alreadySaved =
        sessionStorage.getItem("premiumPaymentSaved");

      if (alreadySaved) return;

      await api.post("/payments", {
        user_email: dbUser.email,
        amount: 10,
      });

      sessionStorage.setItem(
        "premiumPaymentSaved",
        "true"
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (dbUser?.email) {
    savePayment();
  }
}, [dbUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">

        <div className="text-6xl mb-4">
          🎉
        </div>

        <h1 className="text-4xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="text-gray-500 mt-4">
          You are now a Premium Founder.
        </p>

      </div>

    </div>
  );
};

export default PaymentSuccess;