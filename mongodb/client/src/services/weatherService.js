// mongodb/client/src/services/weatherService.js

export const getWeather = async (zipCode, unit = "metric") => {
  if (!zipCode) throw new Error("Zip code required");

  const res = await fetch("http://localhost:5000/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zipCode,
      tempMetric: unit,
    }),
  });

  if (!res.ok) {
    throw new Error("Backend weather API failed");
  }

  return await res.json();
};
