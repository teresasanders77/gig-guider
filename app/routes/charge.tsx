import { useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";

const Charge = () => {
  const [searchParams] = useSearchParams();
  const idealHourlyRate = searchParams.get("idealHourlyRate");
  const gigHours = searchParams.get("gigHours");
  const mileage = searchParams.get("mileage");
  const babysittingHours = searchParams.get("babysittingHours");
  const babysittingHourlyRate = searchParams.get("babysittingHourlyRate");

  const [total, setTotal] = useState(0);

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const gasCost = Number(Number(mileage) * 2) * 0.67;
    const babysittingCost =
      Number(babysittingHours) * Number(babysittingHourlyRate);
    const totalCost = gasCost + babysittingCost;
    const hopefulIncomePreExpense = Number(idealHourlyRate) * Number(gigHours);
    setTotal(hopefulIncomePreExpense + totalCost);
  }, [
    babysittingHourlyRate,
    babysittingHours,
    gigHours,
    idealHourlyRate,
    mileage,
  ]);

  return (
    <>
      <div className="h-screen">
        <h2 className="text-center mt-10 font-bold text-lg">
          We recommend you charge: ${total}
        </h2>
        <button
          onClick={() => {
            scrollToElement("details");
          }}
        >
          See Details
        </button>
      </div>
      <div className="h-screen text-center" id="details">
        <h1 className="font-bold text-xl">Details</h1>
        <h2>Here is what you entered:</h2>
        <p>
          Ideal Hourly Rate:
          <span className="font-bold"> ${idealHourlyRate}</span>
        </p>
        <p>
          Gig Hours:
          <span className="font-bold"> {gigHours} Hours</span>
        </p>
        <p>
          Mileage:
          <span className="font-bold"> {mileage} Miles</span>
        </p>
        <p>
          Babysitting Hours:
          <span className="font-bold"> {babysittingHours} Hours</span>
        </p>
        <p>
          Babysitting Hourly Rate:
          <span className="font-bold"> ${babysittingHourlyRate}</span>
        </p>

        <h2 className="mt-10">Here how we calculated:</h2>
        <p>
          Gas Cost (Mileage * 2 * 0.67 (IRS Mileage Rate)):
          <span className="font-bold">
            {" "}
            ${Number(Number(mileage) * 2) * 0.67}
          </span>
        </p>
        <p>
          Babysitting Cost (Babysitting Hours * Babysitting Hourly Rate):
          <span className="font-bold">
            {" "}
            ${Number(babysittingHours) * Number(babysittingHourlyRate)}
          </span>
        </p>
        <p>
          Total Cost (Gas Cost + Babysitting Cost):
          <span className="font-bold">
            {" "}
            $
            {Number(Number(mileage) * 2) * 0.67 +
              Number(babysittingHours) * Number(babysittingHourlyRate)}
          </span>
        </p>
        <p>
          Hopeful Income Pre Expense (Ideal Hourly Rate * Gig Hours):
          <span className="font-bold">
            {" "}
            ${Number(idealHourlyRate) * Number(gigHours)}
          </span>
        </p>
        <p>
          Hopeful Income Total (Hopeful Income Pre Expense + Total Cost):
          <span className="font-bold">
            {" "}
            $
            {Number(idealHourlyRate) * Number(gigHours) +
              (Number(Number(mileage) * 2) * 0.67 +
                Number(babysittingHours) * Number(babysittingHourlyRate))}
          </span>
        </p>
      </div>
    </>
  );
};

export default Charge;
