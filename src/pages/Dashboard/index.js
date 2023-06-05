import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { fetchCities } from "../../apis";
import { MyContext } from "../../context";
import moment from "moment";

function Dashboard() {
  const { updateValue } = useContext(MyContext);

  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [Loader, setLoader] = useState(true);
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCities()
      .then((data) => {
        setCities(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      });
  }, []);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelectChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setError("");
  };

  const Submit = () => {
    if (selectedCity === "" || range === "") {
      setError("City is not selected");
    } else {
      const newValue = {
        city: selectedCity?.value,
        dateFrom: moment(range[0]?.startDate).format("YYYY-MM-DD"),
        dateTo: moment(range[0]?.endDate).format("YYYY-MM-DD"),
      };
      updateValue(newValue);

      navigate("/graph");
    }
  };
  return (
    <div className="container">
      {Loader && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}
      <div>
        <div className="mb-3 text-primary fw-bold">Select City</div>
        <Select
          options={cities}
          isSearchable={true}
          value={selectedCity}
          placeholder="Select City"
          onChange={handleSelectChange}
        />
        {error && <div className="text-danger  mb-1">{error}</div>}
        <div className="my-4">
          <div className="mb-3 text-primary fw-bold">Select Date Range</div>
          <DateRangePicker
            onChange={(item) => setRange([item.selection])}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={range}
            direction="horizontal"
          />
        </div>

        <div className="d-flex justify-content-center">
          {/* Button */}
          <button
            className="btn btn-primary w-100"
            disabled={Loader}
            onClick={() => Submit()}
          >
            View Pollution Graph
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
