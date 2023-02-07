const key = "AIzaSyAFkAAtGtiSNXEmT4XqZQZ6qTVRZC0sh6w";
const googleapis = "https://youtube.googleapis.com/youtube/v3/";
export const channelId = "UCP1CBchAPHLqQWnZ23P4PrQ";
// export const channelId = "UCwRbNdY2ipKp9MU_BpbTjeQ";
export const channel = `${googleapis}channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${key}`;
export const activities = `${googleapis}activities?part=snippet,contentDetails&channelId=${channelId}&maxResults=25&key=${key}`;
export const commentThreads = `${googleapis}commentThreads?part=snippet,replies&maxResults=300&key=${key}`;
export const videos = `${googleapis}videos?key=${key}&part=snippet,contentDetails,statistics,status`;
export const pageChannel = "/pages/channel.html";
export const pageVideos = "/pages/video.html";
export const channelJson = "/data/channel.json";
export const videosJson = "/data/video.json";
export const colors = [
  "#007790",
  "#009872",
  "#da534d",
  "#9c27b0",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];
export const colies = [
  "#69dbf1",
  "#69f2d0",
  "#faa39f",
  "#9c27b0",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7",
  "#3F51B5",
  "#2196F3",
  "#03A9F4",
  "#00BCD4",
  "#009688",
  "#4CAF50",
  "#8BC34A",
  "#CDDC39",
  "#FFEB3B",
  "#FFC107",
  "#FF9800",
  "#FF5722",
];
export const keyOfChannel = ["viewCount", "subscriberCount", "videoCount"];
export const keyOfVideo = ["viewCount", "likeCount", "commentCount"];
