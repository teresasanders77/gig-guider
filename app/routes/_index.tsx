import {
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import ShouldITakeThisForm from "../components/shouldITakeThisForm";
import WhatToChargeForm from "../components/whatToChargeForm";
import { useState } from "react";
import { Form } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action } = Object.fromEntries(formData);

  const idealHourlyRate = formData.get("idealHourlyRate");
  const gigPayment = formData.get("gigPayment");
  const gigHours = formData.get("gigHours");
  const mileage = formData.get("mileage");
  const babysittingHours = formData.get("babysittingHours");
  const babysittingHourlyRate = formData.get("babysittingHourlyRate");

  if (_action === "shouldITakeThis") {
    const gasCost = Number(Number(mileage) * 2) * 0.67;
    // console.log("gasCost: ", gasCost);

    const babysittingCost =
      Number(babysittingHours) * Number(babysittingHourlyRate);
    // console.log("babysittingCost: ", babysittingCost);

    const totalCost = gasCost + babysittingCost;
    // console.log("totalCost: ", totalCost);

    const hopefulIncomePreExpense = Number(idealHourlyRate) * Number(gigHours);
    // console.log("hopefulIncomePreExpense: ", hopefulIncomePreExpense);

    const hopefulIncomeTotal = hopefulIncomePreExpense + totalCost;
    // console.log("hopefulIncomeTotal: ", hopefulIncomeTotal);

    const difference = Number(gigPayment) - hopefulIncomeTotal;
    // console.log("difference: ", difference);

    let answer;
    if (difference > 0) {
      answer = "yes";
    } else {
      answer = "no";
    }
    // console.log("answer: ", answer);

    return redirect("/answer/" + answer);
  }
};

export default function Index() {
  const [shouldITakeThis, toggleShouldITakeThis] = useState(false);
  const [whatToCharge, toggleWhatToCharge] = useState(false);

  return (
    <div>
      <Form method="post" encType="multipart/form-data">
        <div className="mt-20">
          <h1 className="text-4xl text-center">Gig Guider</h1>
          {!shouldITakeThis && !whatToCharge && (
            <div className="flex items-center justify-between w-1/2 my-0 mx-auto h-screen">
              <button
                onClick={() => {
                  toggleShouldITakeThis(!shouldITakeThis);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Should I take this gig?
              </button>

              <button
                onClick={() => toggleWhatToCharge(!whatToCharge)}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                How much should I charge for this gig?
              </button>
            </div>
          )}
          {shouldITakeThis || whatToCharge ? (
            <button
              onClick={() => {
                toggleShouldITakeThis(false);
                toggleWhatToCharge(false);
              }}
              className="ml-10"
            >
              Back
            </button>
          ) : null}
        </div>
        {shouldITakeThis && (
          <div>
            <ShouldITakeThisForm />
          </div>
        )}
        {whatToCharge && (
          <div>
            <WhatToChargeForm />
          </div>
        )}
      </Form>
    </div>
  );
}
