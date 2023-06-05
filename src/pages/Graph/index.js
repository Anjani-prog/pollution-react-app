import React, { useState, useEffect, useContext } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { fetchMeasurementData } from "../../apis";
import { MyContext } from "../../context";
import noData from "../../assets/noData.jpg";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Graph() {
  const { value } = useContext(MyContext);
  const [dataPoints, setDataPoints] = useState([]);
  const [Loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMeasurementData(
          value.dateFrom,
          value.dateTo,
          value.city
        );
        setDataPoints(data);
      } catch (error) {
        // Handle error
      } finally {
        setTimeout(() => {
          setLoader(false);
        }, 1000);
      }
    };

    fetchData();
  }, [value]);

  const options1 = {
    theme: "light2",
    title: {
      text: "Pollution Chart II",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: "Pollution Graph I",
    },
    axisY: {
      title: "Rate",
      suffix: "",
    },
    axisX: {
      title: "Date",
      prefix: "",
    },
    data: [
      {
        type: "line",
        toolTipContent: "Week {x}: {y}",
        dataPoints: dataPoints,
      },
    ],
  };
  return (
    <div className="container my-1">
      {Loader ? (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      ) : dataPoints.length > 0 ? (
        <div>
          <div>City:{value.city}</div>
          <div>
            Date:{value.dateFrom} to {value.dateTo}
          </div>
          <div className="my-5">
            <CanvasJSChart options={options} />
          </div>
          <div className="my-5">
            <CanvasJSChart options={options1} />
          </div>
        </div>
      ) : (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100 overflow-hidden">
          <img
            src={noData}
            className="img-fluid"
            style={{ maxHeight: "70%" }}
            alt="layout"
          />
        </div>
      )}
    </div>
  );
}

export default Graph;
