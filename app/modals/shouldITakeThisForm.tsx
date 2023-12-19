import { Dialog, Transition } from "@headlessui/react";
import { useFetcher } from "@remix-run/react";
import { Fragment } from "react";

const ShouldITakeThisForm = ({ showModal, setShowModal }) => {
  const fetcher = useFetcher();
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded-lg overflow-hidden w-3/4 max-w-2xl p-6">
              <Dialog.Title className="text-xl font-bold mb-4">
                Should I Take This?
              </Dialog.Title>
              <fetcher.Form
                action="/action"
                method="post"
                encType="multipart/form-data"
              >
                <div className="mb-6">
                  <div>
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="idealHourlyRate"
                    >
                      Ideal Hourly Rate (after expenses)
                    </label>
                    <input
                      className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="idealHourlyRate"
                      name="idealHourlyRate"
                      type="number"
                      placeholder="$"
                    />
                  </div>
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
                    htmlFor="mileage"
                  >
                    Mileage (One way)
                  </label>
                  <input
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="mileage"
                    name="mileage"
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
                    type="submit"
                    name="_action"
                    value="shouldITakeThis"
                  >
                    Submit
                  </button>
                </div>
              </fetcher.Form>

              <div className="mt-6">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ShouldITakeThisForm;
