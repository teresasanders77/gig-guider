import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { useEffect, useState } from "react";

interface Params {
  answer: string;
}

export const loader = async ({ params }: { params: Params }) => {
  const { answer } = params;
  const yesResponses = [
    "Finally, someone pays you what you're worth!",
    "Go give these people a hug, they respect you!",
    "Cha-ching! Your bank account is about to do the happy dance!",
    "Oh, honey, the only thing better than your talent is that paycheck!",
    "Without a doubt! The only thing hotter than the stage lights will be your bank balance.",
    "Hell yes! Your talent is like a fine wine — it only gets better with a generous paycheck.",
    "Yes, and the applause will be music to your ears, but the paycheck will be a symphony!",
  ];
  const noResponses = [
    "Wanna pay your insurance this onth? Better not take this gig...",
    "People don't value musicians, do they...",
    "If you want to do charity, then go for it!",
    "Oh, sweetie, even Cinderella had a better deal. I'll pass.",
    "Nope! I don't work for peanuts; I prefer cashews at the very least.",
    "Hard pass! My talent deserves a stage that pays its electricity bill.",
    "Sorry, but exposure doesn't pay the bills, darling.",
    "Not in a million years! I'd need a magnifying glass to see that paycheck.",
    "Absolutely not! I've got a reputation to uphold, and it's not in the discount aisle.",
    "Hell no! Even my shadow demands a higher rate than that.",
  ];
  // Get a random index
  const randomIndex =
    answer == "yes"
      ? Math.floor(Math.random() * yesResponses.length)
      : Math.floor(Math.random() * noResponses.length);
  const returnedResponse =
    answer == "yes" ? yesResponses[randomIndex] : noResponses[randomIndex];
  return json({ response: returnedResponse });
};

const Answer = () => {
  const { response } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const idealHourlyRate = searchParams.get("idealHourlyRate");
  console.log("idealHourlyRate", idealHourlyRate);
  const gigPayment = searchParams.get("gigPayment");
  // console.log("gigPayment", gigPayment);
  const gigHours = searchParams.get("gigHours");
  // console.log("gigHours", gigHours);
  const mileage = searchParams.get("mileage");
  // console.log("mileage", mileage);
  const babysittingHours = searchParams.get("babysittingHours");
  // console.log("babysittingHours", babysittingHours);
  const babysittingHourlyRate = searchParams.get("babysittingHourlyRate");
  // console.log("babysittingHourlyRate", babysittingHourlyRate);

  const [details, toggleDetails] = useState(false);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    details ? scrollToElement("details") : null;
  }, [details]);

  return (
    <>
      <div className="h-screen">
        <h2 className="text-center mt-10 font-bold text-lg">{response}</h2>
        <button
          onClick={() => {
            toggleDetails(true);
          }}
        >
          See Details
        </button>
      </div>
      {details && (
        <div className="h-screen text-center" id="details">
          <h1 className="font-bold text-xl">Details</h1>
          <h2>Here is what you entered:</h2>
          <p>
            Ideal Hourly Rate:
            <span className="font-bold">${idealHourlyRate}</span>
          </p>
          <p>
            Gig Payment:
            <span className="font-bold">${gigPayment}</span>
          </p>
          <p>
            Gig Hours:
            <span className="font-bold">{gigHours} Hours</span>
          </p>
          <p>
            Mileage:
            <span className="font-bold">{mileage} Miles</span>
          </p>
          <p>
            Babysitting Hours:
            <span className="font-bold">{babysittingHours} Hours</span>
          </p>
          <p>
            Babysitting Hourly Rate:
            <span className="font-bold">${babysittingHourlyRate}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default Answer;
