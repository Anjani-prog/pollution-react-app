import React, { useState } from "react";
import Select from "react-select";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const dpOptions = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <div className="container my-1">
      <div>
        <div className="mb-3 text-primary fw-bold">Select City</div>
        <Select
          options={dpOptions}
          isSearchable={true}
          placeholder="Select City"
        />
        <div className="my-5">
          <div className="mb-3 text-primary fw-bold">Select Date Range</div>
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
        </div>
        <div className="d-flex justify-content-center my-1">
          {/* Button */}
          <button
            className="btn btn-primary w-100"
            onClick={() => navigate("/graph")}
          >
            View Pollution Graph
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
