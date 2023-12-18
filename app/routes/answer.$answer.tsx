import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

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
  return <div>{response}</div>;
};

export default Answer;
