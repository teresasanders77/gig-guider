import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const Details = ({ showModal, setShowModal, data, type }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  let dataToDisplay = {
    idealHourlyRate: data?.idealHourlyRate ?? 0,
    gigPayment: data?.gigPayment ?? 0,
    gigHours: data?.gigHours ?? 0,
    mileage: data?.mileage ?? 0,
    babysittingHours: data?.babysittingHours ?? 0,
    babysittingHourlyRate: data?.babysittingHourlyRate ?? 0,
  };
  return (
    <Transition show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen ">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30 " />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-gray-100 rounded-lg  w-4/5 max-w-3xl p-16">
              <Dialog.Title className="text-xl font-bold mb-8 text-center">
                <h1>Should I Take This Gig?</h1>
              </Dialog.Title>
              <div className="h-screen text-center " id="details">
                <h2 className="mb-4 font-bold text-gg-blue-700">
                  Here is what you entered:
                </h2>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Ideal Hourly Rate:
                  <span className="font-bold">
                    {" "}
                    ${dataToDisplay.idealHourlyRate}
                  </span>
                </p>
                {type == "answer" && (
                  <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                    Gig Payment:
                    <span className="font-bold">
                      {" "}
                      ${dataToDisplay.gigPayment}
                    </span>
                  </p>
                )}
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Gig Hours:
                  <span className="font-bold">
                    {" "}
                    {dataToDisplay.gigHours} Hours
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Mileage:
                  <span className="font-bold">
                    {" "}
                    {dataToDisplay.mileage} Miles
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Babysitting Hours:
                  <span className="font-bold">
                    {" "}
                    {dataToDisplay.babysittingHours} Hours
                  </span>
                </p>
                <p className="bg-white flex justify-between p-2 rounded px-10 mb-2">
                  Babysitting Hourly Rate:
                  <span className="font-bold">
                    {" "}
                    ${dataToDisplay.babysittingHourlyRate}
                  </span>
                </p>

                <h2 className="mb-4 mt-10 font-bold text-gg-blue-700">
                  Here is how we calculated:
                </h2>
                <div className="mt-8 flow-root">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                      <table className="min-w-full divide-y divide-gray-300 bg-white">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="py-3.5 pl-4 pr-3 text-sm font-semibold text-gray-900 sm:pl-0 text-center"
                            >
                              $
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                              Calculation
                            </th>
                            <th
                              scope="col"
                              className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900"
                            >
                              Total
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Gas Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Mileage * 2 * 0.67 (IRS Mileage Rate)
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(Number(dataToDisplay.mileage) * 2) * 0.67}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Babysitting Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Babysitting Hours * Babysitting Hourly Rate
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(dataToDisplay.babysittingHours) *
                                Number(dataToDisplay.babysittingHourlyRate)}
                            </td>
                          </tr>
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Total Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Gas Cost + Babysitting Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(Number(dataToDisplay.mileage) * 2) *
                                0.67 +
                                Number(dataToDisplay.babysittingHours) *
                                  Number(dataToDisplay.babysittingHourlyRate)}
                            </td>
                          </tr>
                          {type == "charge" && (
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                Hopeful Income Pre Expense
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                Ideal Hourly Rate * Gig Hours
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                $
                                {Number(dataToDisplay.idealHourlyRate) *
                                  Number(dataToDisplay.gigHours)}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              Hopeful Income Total
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              Hopeful Income Pre Expense + Total Cost
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              $
                              {Number(dataToDisplay.idealHourlyRate) *
                                Number(dataToDisplay.gigHours) +
                                (Number(Number(dataToDisplay.mileage) * 2) *
                                  0.67 +
                                  Number(dataToDisplay.babysittingHours) *
                                    Number(
                                      dataToDisplay.babysittingHourlyRate
                                    ))}
                            </td>
                          </tr>
                          {type == "answer" && (
                            <tr>
                              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                Difference
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                Gig Payment - Hopeful Income Total
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                $
                                {Number(dataToDisplay.gigPayment) -
                                  (Number(dataToDisplay.idealHourlyRate) *
                                    Number(dataToDisplay.gigHours) +
                                    (Number(Number(dataToDisplay.mileage) * 2) *
                                      0.67 +
                                      Number(dataToDisplay.babysittingHours) *
                                        Number(
                                          dataToDisplay.babysittingHourlyRate
                                        )))}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <h2 className="my-10 font-bold text-black">
                  To make this gig worth it, we recommend you charge:{" "}
                  <span className="text-green-700">
                    $
                    {Number(dataToDisplay.idealHourlyRate) *
                      Number(dataToDisplay.gigHours) +
                      (Number(Number(dataToDisplay.mileage) * 2) * 0.67 +
                        Number(dataToDisplay.babysittingHours) *
                          Number(dataToDisplay.babysittingHourlyRate))}
                  </span>
                </h2>
                <button
                  className=" bg-[#001c50] hover:bg-[#00567a] text-white font-bold p-2 lg:py-2 lg:px-4 rounded hover:shadow-xl lg:mt-0 mr-4"
                  onClick={() => location.reload()}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Details;