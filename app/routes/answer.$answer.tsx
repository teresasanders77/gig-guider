import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";

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
    "Oh, sweetie, even Cinderella had a better deal. You should pass.",
    "Nope! You don't work for peanuts; You prefer cashews at the very least.",
    "Hard pass! Your talent deserves a stage that pays its electricity bill.",
    "Sorry, but exposure doesn't pay the bills, darling.",
    "Not in a million years! I'd need a magnifying glass to see that paycheck.",
    "Absolutely not! You've got a reputation to uphold, and it's not in the discount aisle.",
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
  const [searchParams] = useSearchParams();
  const idealHourlyRate = searchParams.get("idealHourlyRate");
  const gigPayment = searchParams.get("gigPayment");
  const gigHours = searchParams.get("gigHours");
  const mileage = searchParams.get("mileage");
  const babysittingHours = searchParams.get("babysittingHours");
  const babysittingHourlyRate = searchParams.get("babysittingHourlyRate");

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="h-screen">
        <h2 className="text-center mt-10 font-bold text-lg">{response}</h2>
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
          Gig Payment:
          <span className="font-bold"> ${gigPayment}</span>
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
        <p>
          Difference (Gig Payment - Hopeful Income Total):
          <span className="font-bold">
            {" "}
            $
            {Number(gigPayment) -
              (Number(idealHourlyRate) * Number(gigHours) +
                (Number(Number(mileage) * 2) * 0.67 +
                  Number(babysittingHours) * Number(babysittingHourlyRate)))}
          </span>
        </p>
        <h2 className="mt-10">
          To make this gig worth it, we recommend you charge: $
          {Number(idealHourlyRate) * Number(gigHours) +
            (Number(Number(mileage) * 2) * 0.67 +
              Number(babysittingHours) * Number(babysittingHourlyRate))}
        </h2>
        <div className="mt-10">
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </>
  );
};

export default Answer;
