import { type MetaFunction } from "@remix-run/node";
import ShouldITakeThisForm from "../modals/shouldITakeThisForm";
import WhatToChargeForm from "../modals/whatToChargeForm";
import { useEffect, useState } from "react";
import desktopImage from "../../public/img/GG_landingPage.webp";
import mobileImage from "../../public/img/GG_mobile.webp";
import answerImage from "../../public/img/GG_answer.webp";
import { useFetchers } from "@remix-run/react";
import Answer from "../components/answer";
import Details from "../modals/details";
import Charge from "../components/charge";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

type Data = {
  idealHourlyRate: FormDataEntryValue | null;
  gigPayment: FormDataEntryValue | null;
  gigHours: FormDataEntryValue | null;
  mileage: FormDataEntryValue | null;
  babysittingHours: FormDataEntryValue | null;
  babysittingHourlyRate: FormDataEntryValue | null;
};

export default function Index() {
  const [showButtons, toggleShowButtons] = useState(true);
  const [screenWidth, setScreenWidth] = useState(761);
  const [shouldITakeThisModal, setShouldITakeThisModal] = useState(false);
  const [whatToChargeModal, setWhatToChargeModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [showAnswer, toggleShowAnswer] = useState(false);
  const [showCharge, toggleShowCharge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Data>({
    idealHourlyRate: null,
    gigPayment: null,
    gigHours: null,
    mileage: null,
    babysittingHours: null,
    babysittingHourlyRate: null,
  });
  const fetchers = useFetchers();

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
    if (
      screenWidth > 760 &&
      img !== desktopImage &&
      !showAnswer &&
      !showCharge
    ) {
      setImg(desktopImage);
    } else if (
      screenWidth <= 760 &&
      img !== mobileImage &&
      !showAnswer &&
      !showCharge
    ) {
      setImg(mobileImage);
    } else if (showAnswer) {
      setImg(answerImage);
    }
  }, [img, screenWidth, showAnswer, showCharge]);

  useEffect(() => {
    if (
      fetchers[0]?.state === "submitting" &&
      fetchers[0]?.formData &&
      data == null
    ) {
      setData({
        idealHourlyRate: fetchers[0].formData.get("idealHourlyRate"),
        gigPayment: fetchers[0].formData.get("gigPayment"),
        gigHours: fetchers[0].formData.get("gigHours"),
        mileage: fetchers[0].formData.get("mileage"),
        babysittingHours: fetchers[0].formData.get("babysittingHours"),
        babysittingHourlyRate: fetchers[0].formData.get(
          "babysittingHourlyRate"
        ),
      });
    }
    if (fetchers[0]?.state === "submitting") {
      setShouldITakeThisModal(false);
      setWhatToChargeModal(false);
      setLoading(true);
      setImg(answerImage);
      toggleShowButtons(false);

      setTimeout(() => {
        setLoading(false);
        if (fetchers[0]?.formData?.get("_action") == "shouldITakeThis") {
          toggleShowAnswer(true);
        } else {
          toggleShowCharge(true);
        }
      }, 3000);
    }
  }, [data, fetchers]);

  return (
    <>
      <div>
        <h1 className="sr-only">The Gig Guider</h1>
        <div
          className="bg-cover bg-center bg-no-repeat overflow-hidden h-screen relative"
          style={{ backgroundImage: `url(${img})` }}
          aria-label="Gig Guider main image, hands on a crystal ball."
        >
          {loading && (
            <div className="flex justify-center items-center h-screen">
              <div
                className="rounded-full h-80 w-80 bg-gg-blue-900 animate-ping"
                role="status"
                aria-label="Loading answer..."
              ></div>
            </div>
          )}
          <main className="my-0 mx-auto ">
            {showButtons && (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <button
                  onClick={() => {
                    setShouldITakeThisModal(true);
                  }}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                  aria-label="Open Should I take this modal"
                >
                  Should I take this?
                </button>
                <button
                  onClick={() => {
                    setWhatToChargeModal(true);
                  }}
                  className="bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl mt-2 lg:mt-0"
                  aria-label="Open How much should I charge modal"
                >
                  How much should I charge?
                </button>
              </div>
            )}
            {showAnswer && (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <Answer data={data} setShowModal={setDetailsModal} />
              </div>
            )}
            {showCharge && (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <Charge data={data} setShowModal={setDetailsModal} />
              </div>
            )}
          </main>
        </div>
        <ShouldITakeThisForm
          showModal={shouldITakeThisModal}
          setShowModal={setShouldITakeThisModal}
        />
        <WhatToChargeForm
          showModal={whatToChargeModal}
          setShowModal={setWhatToChargeModal}
        />
        <Details
          showModal={detailsModal}
          setShowModal={setDetailsModal}
          data={data}
          type={showAnswer ? "answer" : "charge"}
        />
      </div>
    </>
  );
}
