import * as constant from "./constants.js";

var myConfig = {
  type: "line",
  utc: true,
  title: {
    text: "",
    "font-size": "24px",
    "adjust-layout": true,
  },
  plotarea: {
    margin: "dynamic 45 60 dynamic",
  },
  legend: {
    layout: "float",
    "background-color": "none",
    "border-width": 0,
    shadow: 0,
    align: "center",
    "adjust-layout": true,
    "toggle-action": "remove",
    item: {
      padding: 7,
      marginRight: 17,
      cursor: "hand",
    },
  },
  "scale-x": {
    // "min-value": 1383292800000,
    shadow: 0,
    // step: 3600000,
    // transform: {
    //   type: "date",
    //   all: "%D, %d %M<br />%h:%i %A",
    //   item: {
    //     visible: false,
    //   },
    // },
    label: {
      visible: false,
    },
    labels: [
      "300",
      "301",
      "301",
      "",
      "",
      "",
      "580",
      "640",
      "700",
      "750",
      "",
      "850",
    ],
    "minor-ticks": 0,
  },
  "scale-y": {
    "line-color": "#f6f7f8",
    shadow: 0,
    guide: {
      "line-style": "dashed",
    },
    label: {
      text: "count",
    },
    "minor-ticks": 0,
    "thousands-separator": ",",
  },
  "crosshair-x": {
    "line-color": "#efefef",
    "plot-label": {
      "border-radius": "5px",
      "border-width": "1px",
      "border-color": "#f6f7f8",
      padding: "10px",
      "font-weight": "bold",
    },
    "scale-label": {
      "font-color": "#000",
      "background-color": "#f6f7f8",
      "border-radius": "5px",
    },
  },
  tooltip: {
    visible: false,
  },
  plot: {
    highlight: true,
    "tooltip-text": "%t views: %v<br>%k",
    shadow: 0,
    "line-width": "2px",
    marker: {
      type: "circle",
      size: 3,
    },
    "highlight-state": {
      "line-width": 3,
    },
    animation: {
      effect: 1,
      sequence: 2,
      speed: 100,
    },
  },
  series: [],
};

async function getData(url) {
  var statistics = [];
  const response = await fetch(url);
  const data = await response.json();
  statistics = data[0].statistics;
  return statistics;
}

var series = {
  values: [],
  text: "Pricing",
  "line-color": "",
  "legend-item": {
    "background-color": "",
    borderRadius: 5,
    "font-color": "white",
  },
  "legend-marker": {
    visible: false,
  },
  marker: {
    "background-color": "",
    "border-width": 1,
    shadow: 0,
    "border-color": "",
  },
  "highlight-marker": {
    size: 6,
    "background-color": "",
  },
};

function getDataFromObject(params, objData) {
  const result = objData.map((element) => {
    return element[params];
  });
  return result;
}

async function renderChart(title, url) {
  let seriesData = [];
  const statistics = await getData(url);
  const result = statistics.map((element) => {
    return moment(element.createdAt).format("YYYY-MM-DD h:mm:ss");
  });
  constant.keyOfChannel.map((element, index) => {
    const seriesClone = JSON.parse(JSON.stringify(series));
    seriesClone["text"] = element;
    seriesClone["values"] = getDataFromObject(element, statistics);
    seriesClone["line-color"] = constant.colors[index];
    seriesClone["legend-item"]["background-color"] = constant.colors[index];
    seriesClone.marker["background-color"] = constant.colors[index];
    seriesClone.marker["border-color"] = constant.colies[index];
    seriesClone["highlight-marker"]["background-color"] = constant.colors[index];
    seriesData = [...seriesData, { ...seriesClone }];
  });
  myConfig.title.text = title;
  myConfig["scale-x"].labels = result;
  myConfig.series = seriesData;
  zingchart.render({
    id: "myChart",
    data: myConfig,
    height: "100%",
    width: "100%",
  });
}

const channelElement = document.querySelector("#channel");
const closeChartElement = document.querySelector("#closeChart");
const myChartElements = document.querySelector(".chart");
channelElement.onclick = () => {
  myChartElements.classList.add("active");
  renderChart(constant.channelId, "./data/channel.json");
};

closeChartElement.onclick = () => {
  myChartElements.classList.remove("active");
};