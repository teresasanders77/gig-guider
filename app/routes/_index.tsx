import type { MetaFunction } from "@remix-run/node";
import ShouldITakeThisForm from "../components/shouldITakeThisForm";
import WhatToChargeForm from "../components/whatToChargeForm";
import { useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Gig-Guider" },
    { name: "description", content: "Welcome to the Gig Guider!" },
  ];
};

export default function Index() {
  const [shouldITakeThis, toggleShouldITakeThis] = useState(false);
  const [whatToCharge, toggleWhatToCharge] = useState(false);

  return (
    <div>
      <h1>Gig Guider</h1>
      <div>
        {!shouldITakeThis && !whatToCharge && (
          <>
            <button
              onClick={() => {
                toggleShouldITakeThis(!shouldITakeThis);
              }}
            >
              Should I take this gig?
            </button>

            <button onClick={() => toggleWhatToCharge(!whatToCharge)}>
              How much should I charge for this gig?
            </button>
          </>
        )}
        {shouldITakeThis || whatToCharge ? (
          <button
            onClick={() => {
              toggleShouldITakeThis(false);
              toggleWhatToCharge(false);
            }}
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
    </div>
  );
}
