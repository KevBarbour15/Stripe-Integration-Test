import React from "react";
import CheckoutForm from "../components/CheckoutForm";
import CheckoutButton from "../components/CheckoutButton";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51O5vqNFi2BcJnxILc59QiYGTRBsydIj1gxeg0u3F2CLIrExeQqHhcQFkiDiuJKcbmcX8nRHWqdl9IOG8HrsV7V0O00031E6PP9"
);



const StripeTest = () => {
  return (
    <div>
      <h1>Stripe Test</h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <h1>Checkout Button</h1>
      <CheckoutButton />
    </div>
  );
};

export default StripeTest;