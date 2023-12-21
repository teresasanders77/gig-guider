import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DataType } from "../globalTypes";

type ChargeProps = {
  data: DataType;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const Charge = ({ data, setShowModal }: ChargeProps) => {
  const idealHourlyRate = data?.idealHourlyRate ?? 0;
  const gigHours = data?.gigHours ?? 0;
  const mileage = data?.mileage ?? 0;
  const babysittingHours = data?.babysittingHours ?? 0;
  const babysittingHourlyRate = data?.babysittingHourlyRate ?? 0;

  const [total, setTotal] = useState(0);

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
      <section
        className="flex flex-col items-center justify-center h-screen"
        role="main"
      >
        <h1
          className="font-bold text-4xl text-center"
          aria-label="Recommendation Header"
        >
          We recommend you charge:
        </h1>
        <h2
          className="text-center mt-10 mb-10 font-bold text-6xl text-green-700"
          aria-label={`Recommended total amount is $${total}`}
        >
          ${total}
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl lg:mt-0"
          aria-label="Click to see more details"
        >
          See Details
        </button>
      </section>
    </>
  );
};

export default Charge;
