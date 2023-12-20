import { ActionFunction, json, redirect } from "@remix-run/node";

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
    return json({ answer: answer });
  } else if (_action === "whatToCharge") {
    return new Response("ok");
  }
};
