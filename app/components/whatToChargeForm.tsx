import { Form } from "@remix-run/react";

const WhatToChargeForm = () => {
  return (
    <div className="w-full">
      <div className="text-center text-xl">What Should I Charge?</div>
      <div className="w-full max-w-lg my-0 mx-auto">
        <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="idealHourlyRate"
            >
              Ideal Hourly Rate
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="idealHourlyRate"
              name="idealHourlyRate"
              type="number"
              placeholder="$"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gigPayment"
            >
              Gig Payment
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="gigPayment"
              name="gigPayment"
              type="number"
              placeholder="$"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gigHours"
            >
              Gig Hours (not including driving)
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="gigHours"
              name="gigHours"
              type="number"
              placeholder=""
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gigDrivingTime"
            >
              Driving Time
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="gigDrivingTime"
              name="gigDrivingTime"
              type="number"
              placeholder=""
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="babysittingHours"
            >
              Babysitting Hours
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="babysittingHours"
              name="babysittingHours"
              type="number"
              placeholder=""
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="babysittingHourlyRate"
            >
              Babysitting Hourly Rate
            </label>
            <input
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="babysittingHourlyRate"
              name="babysittingHourlyRate"
              type="number"
              placeholder="$"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default WhatToChargeForm;
