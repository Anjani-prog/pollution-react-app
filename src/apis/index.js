import axios from "axios";
import moment from "moment";

const baseURL = "https://api.openaq.org/v2/";
const limit = 500; // Maximum number of results per page

const validateResponse = (dataArray) => {
  return dataArray.map((dataItem) => ({
    value: dataItem.city,
    label: dataItem.city,
  }));
};

const fetchPaginatedData = async (url) => {
  let allData = [];
  let totalPages = 0;

  try {
    const response = await axios.get(url);
    const { meta, results } = response.data;
    totalPages = Math.ceil(meta.found / limit);

    allData = allData.concat(results);

    const remainingPages = Array.from(
      { length: totalPages - 1 },
      (_, index) => index + 2
    );
    const pageRequests = remainingPages.map((page) =>
      axios.get(`${url}&page=${page}`)
    );
    const responses = await Promise.all(pageRequests);

    responses.forEach((response) => {
      const { results } = response.data;
      allData = allData.concat(results);
    });

    return allData;
  } catch (error) {
    throw new Error("Error fetching paginated data:", error);
  }
};

const formatDataForChart = (data) => {
  return data.map((item) => ({
    x: new Date(item.date.utc),
    y: item.value,
    label: moment(new Date(item.date.utc)).format("MMMM Do YYYY"),
  }));
};

export async function fetchCities() {
  const url = `${baseURL}cities?limit=${limit}`;
  return fetchPaginatedData(url).then(validateResponse);
}

export async function fetchMeasurementData(dateFrom, dateTo, city) {
  const url = `${baseURL}measurements?limit=${limit}&date_from=${dateFrom}&date_to=${dateTo}&offset=0&sort=desc&radius=1000&city=${city}&order_by=datetime&parameter=pm25&parameter=pm10&parameter=pm1`;
  return fetchPaginatedData(url).then(formatDataForChart);
}
