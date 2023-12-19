import {
  redirect,
  type ActionFunction,
  type MetaFunction,
} from "@remix-run/node";
import ShouldITakeThisForm from "../modals/shouldITakeThisForm";
import WhatToChargeForm from "../modals/whatToChargeForm";
import { Fragment, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import desktopImage from "../../public/img/GG_landingPage.png";
import mobileImage from "../../public/img/GG_mobile.png";
import { Dialog, Transition } from "@headlessui/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

export default function Index() {
  const [shouldITakeThis, toggleShouldITakeThis] = useState(false);
  const [whatToCharge, toggleWhatToCharge] = useState(false);
  const [screenWidth, setScreenWidth] = useState(761);
  const [shouldITakeThisModal, setShouldITakeThisModal] = useState(false);
  const [whatToChargeModal, setWhatToChargeModal] = useState(false);

  const [img, setImg] = useState(desktopImage);
  const isClient = typeof window === "object";

  useEffect(() => {
    if (!isClient) {
      return; // Do nothing if not running on the client side
    }
    setScreenWidth(window.innerWidth);
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isClient]);

  useEffect(() => {
    if (screenWidth > 760 && img !== desktopImage) {
      setImg(desktopImage);
    } else if (screenWidth <= 760 && img !== mobileImage) {
      setImg(mobileImage);
    }
  }, [img, screenWidth]);

  return (
    <div>
      <div
        className="bg-cover bg-center bg-no-repeat overflow-hidden h-screen relative"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="my-0 mx-auto ">
          {!shouldITakeThis && !whatToCharge && (
            <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
              <button
                onClick={() => {
                  setShouldITakeThisModal(true);
                }}
                className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
              >
                Should I take this?
              </button>

              <button
                onClick={() => {
                  setWhatToChargeModal(true);
                }}
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
      </div>
      <ShouldITakeThisForm
        showModal={shouldITakeThisModal}
        setShowModal={setShouldITakeThisModal}
      />
      <WhatToChargeForm
        showModal={whatToChargeModal}
        setShowModal={setWhatToChargeModal}
      />
    </div>
  );
}
