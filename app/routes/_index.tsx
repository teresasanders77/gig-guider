import { type MetaFunction } from "@remix-run/node";
import ShouldITakeThisForm from "../modals/shouldITakeThisForm";
import WhatToChargeForm from "../modals/whatToChargeForm";
import { useEffect, useState } from "react";
import desktopImage from "../../public/img/GG_landingPage.png";
import mobileImage from "../../public/img/GG_mobile.png";
import answerImage from "../../public/img/GG_answer.jpg";
import { useFetchers } from "@remix-run/react";
import Answer from "../components/answer";
import Details from "../modals/details";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

export default function Index() {
  const [showButtons, toggleShowButtons] = useState(true);
  const [screenWidth, setScreenWidth] = useState(761);
  const [shouldITakeThisModal, setShouldITakeThisModal] = useState(false);
  const [whatToChargeModal, setWhatToChargeModal] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [showAnswer, toggleShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
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
    if (screenWidth > 760 && img !== desktopImage && !showAnswer) {
      setImg(desktopImage);
    } else if (screenWidth <= 760 && img !== mobileImage && !showAnswer) {
      setImg(mobileImage);
    } else if (showAnswer) {
      setImg(answerImage);
    }
  }, [img, screenWidth, showAnswer]);

  useEffect(() => {
    if (
      fetchers[0]?.state === "submitting" &&
      fetchers[0]?.formData &&
      data == null
    ) {
      console.log(fetchers[0].formData.get("idealHourlyRate"));
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
  }, [fetchers]);

  useEffect(() => {
    if (fetchers[0]?.state === "submitting") {
      setShouldITakeThisModal(false);
      setWhatToChargeModal(false);
      setLoading(true);
      setImg(answerImage);
      toggleShowButtons(false);

      setTimeout(() => {
        setLoading(false);
        toggleShowAnswer(true);
      }, 3000);
    }
  }, [fetchers]);

  return (
    <>
      <div>
        <div
          className="bg-cover bg-center bg-no-repeat overflow-hidden h-screen relative"
          style={{ backgroundImage: `url(${img})` }}
        >
          {loading && (
            <div className="flex justify-center items-center h-screen">
              <div className="rounded-full h-80 w-80 bg-gg-blue-900 animate-ping"></div>
            </div>
          )}
          <div className="my-0 mx-auto ">
            {showButtons && (
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
            {showAnswer && (
              <div className="flex flex-col items-center justify-center mt-8 lg:flex-row lg:mt-0 lg:justify-between lg:w-3/6  xl:w-1/4 my-0 mx-auto h-screen">
                <Answer data={data} setShowModal={setDetailsModal} />
              </div>
            )}
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
        <Details
          showModal={detailsModal}
          setShowModal={setDetailsModal}
          data={data}
        />
      </div>
    </>
  );
}
