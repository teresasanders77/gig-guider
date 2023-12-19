import {
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import ShouldITakeThisForm from "../components/shouldITakeThisForm";
import WhatToChargeForm from "../components/whatToChargeForm";
import { useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import desktopImage from "../../public/img/GG_landingPage.png";
import mobileImage from "../../public/img/GG_mobile.png";

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

    const queryParams = new URLSearchParams(formData).toString();

    // console.log("answer: ", answer);
    return redirect("/answer/" + answer + "?" + queryParams);
  } else if (_action === "whatToCharge") {
    const queryParams = new URLSearchParams(formData).toString();
    console.log("queryParams: ", queryParams);
    return redirect("/charge/?" + queryParams);
  }
};

export default function Index() {
  const [shouldITakeThis, toggleShouldITakeThis] = useState(false);
  const [whatToCharge, toggleWhatToCharge] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [img, setImg] = useState(desktopImage);
  const isClient = typeof window === "object";
  const fetcher = useFetcher();

  useEffect(() => {
    if (!isClient) {
      return; // Do nothing if not running on the client side
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    screenWidth > 760 ? setImg(desktopImage) : setImg(mobileImage);
  }, [screenWidth]);

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden h-screen relative"
        style={{ backgroundImage: `url(${img})` }}
      >
        <fetcher.Form method="post" encType="multipart/form-data">
          <div className="my-0 mx-auto ">
            {!shouldITakeThis && !whatToCharge && (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <button
                  onClick={() => {
                    toggleShouldITakeThis(!shouldITakeThis);
                  }}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                >
                  Should I take this?
                </button>

                <button
                  onClick={() => toggleWhatToCharge(!whatToCharge)}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                >
                  How much should I charge?
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
        </fetcher.Form>
      </div>
    </div>
  );
}
