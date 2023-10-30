import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

/*

  Stripe Test Card Numbers:
  Successful charge: 4242 4242 4242 4242
  Unsuccessful charge: 4000 0000 0000 9995
  Authentication Required: 4000 0027 6000 3184

  Expiration, CVC and Zip can be anything
*/

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const response = await fetch(
      "http://localhost:3001/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 1000 }),
      }
    );

    const data = await response.json();
    console.log(data);
    const clientSecret = data.clientSecret;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (paymentResult.error) {
      console.error(paymentResult.error.message);
    } else {
      console.log("Successful payment");
      console.log(paymentResult);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
