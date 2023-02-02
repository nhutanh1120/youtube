const colors = ["#007790", "#009872", "#da534d"];
const colies = ["#69dbf1", "#69f2d0", "#faa39f"];

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
    "min-value": 1383292800000,
    shadow: 0,
    step: 3600000,
    transform: {
      type: "date",
      all: "%D, %d %M<br />%h:%i %A",
      item: {
        visible: false,
      },
    },
    label: {
      visible: false,
    },
    "minor-ticks": 0,
  },
  "scale-y": {
    "line-color": "#f6f7f8",
    shadow: 0,
    guide: {
      "line-style": "dashed",
    },
    label: {
      text: "Page Views",
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

var data = [
  {
    viewCount: "39307",
    subscriberCount: "1170",
    hiddenSubscriberCount: false,
    videoCount: "18",
    updatedAt: "2023-02-01T00:03:38+07:00",
  },
  {
    viewCount: "39322",
    subscriberCount: "1170",
    hiddenSubscriberCount: false,
    videoCount: "18",
    updatedAt: "2023-02-01T23:42:35+07:00",
  },
];
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
const datass = ["viewCount", "subscriberCount", "videoCount"];
function renderChart(title) {
  let seriesData = [];
  datass.map((element, index) => {
    const seriesClone = JSON.parse(JSON.stringify(series));
    seriesClone["text"] = element;
    seriesClone["values"] = getDataFromObject(element, data);
    seriesClone["line-color"] = colors[index];
    seriesClone["legend-item"]["background-color"] = colors[index];
    seriesClone.marker["background-color"] = colors[index];
    seriesClone.marker["border-color"] = colies[index];
    seriesClone["highlight-marker"]["background-color"] = colors[index];
    seriesData = [...seriesData, { ...seriesClone }];
  });
  myConfig.title.text = title;
  myConfig.series = seriesData;
  zingchart.render({
    id: "myChart",
    data: myConfig,
    height: "100%",
    width: "100%",
  });
}
renderChart();

//   zingchart.render({
//     id: 'myChart',
//     data: myConfig,
//     height: '100%',
//     width: '100%'
//   });
