import { Form } from "@remix-run/react";

const ShouldITakeThisForm = () => {
  return (
    <div>
      ShouldITakeThisForm
      <Form>
        <div>
          <div>
            <label htmlFor="idealHourlyRate">Ideal Hourly Rate</label>
            <input id="idealHourlyRate" name="idealHourlyRate" />
          </div>
          <div>
            <label htmlFor="gigPayment">Gig Payment</label>
            <input id="gigPayment" name="gigPayment" />
          </div>
          <div>
            <label htmlFor="gigHours">Gig Hours (not including driving)</label>
            <input id="gigHours" name="gigHours" />
          </div>
          <div>
            <label htmlFor="gigDrivingTime">Driving </label>
            <input id="gigDrivingTime" name="gigDrivingTime" />
          </div>
          <div>
            <label htmlFor="babysittingHours">Babysitting Hours</label>
            <input id="babysittingHours" name="babysittingHours" />
          </div>
          <div>
            <label htmlFor="babysittingHourlyRate">
              Babysitting HourlyRate
            </label>
            <input id="babysittingHourlyRate" name="babysittingHourlyRate" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ShouldITakeThisForm;
