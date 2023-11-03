import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../AxiosConfig";

const stripePromise = loadStripe(
  "pk_test_51O5vqNFi2BcJnxILc59QiYGTRBsydIj1gxeg0u3F2CLIrExeQqHhcQFkiDiuJKcbmcX8nRHWqdl9IOG8HrsV7V0O00031E6PP9"
);

/*
  Stripe Test Card Numbers:
  Successful charge: 4242 4242 4242 4242
  Unsuccessful charge: 4000 0000 0000 9995
  Authentication Required: 4000 0027 6000 3184

  Expiration, CVC and Zip can be anything
*/

const CheckoutButton = ({ eventId }) => {
  const handleClick = async () => {
    try {
      const { data: session } = await axios.post(
        "/checkout/create-checkout-session",
        { eventId }
      );
      console.log(session.id);
      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      // Handle errors here
      console.error('Error during checkout:', error);
      alert('There was an error redirecting to Stripe checkout.');
    }
  };

  return (
    <button role="link" onClick={handleClick}>
      Purchase Ticket
    </button>
  );
};

export default CheckoutButton;