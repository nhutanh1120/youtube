import * as constant from "./constants.js";
import { handleChart } from "./chart.js";

moment.lang("vi");

async function getChannel() {
  const response = await fetch(constant.channel);
  const data = await response.json();

  renderChannelHtml(data.items[0].snippet, data.items[0].statistics);
}
getChannel();

async function getActivities() {
  const response = await fetch(constant.activities);
  const data = await response.json();
  
  let hashMap = []; 
  for await (const obj of data.items) {
    await getVideo(obj);
    const temp = {
      id: obj.contentDetails.upload.videoId,
      title: obj.snippet.title
    };
    hashMap.push(temp);
  }
  document.cookie = "hashMap=" + JSON.stringify(hashMap);
}

async function getVideo(obj) {
  const response = await fetch(
    `${constant.videos}&id=${obj.contentDetails.upload?.videoId}`
  );
  const data = await response.json();
  if (data.items[0]?.id) {
    renderVideoHtml(
      data?.items[0]?.id,
      data?.items[0]?.snippet,
      data?.items[0]?.statistics
    );
  }
}
getActivities();

const formatNumber = (string) => {
  return string.split(/(?=(?:\d{3})+(?:\.|$))/g).join(".");
};

const renderChannelHtml = (snippet, statistics) => {
  const channelElm = document.querySelector(".channel");

  const html = `<div class="card">
      <div class="card-header">Channel: ${snippet.title}</div>
      <div class="card-description">${snippet.description}</div>
      <div class="card-body">
          <ul>
              <li>publishedAt: ${moment(snippet.publishedAt).format(
                "dddd YYYY-MM-DD h:mm:ss a"
              )}</li>
              <li>customUrl: ${snippet.customUrl}</li>
              <li>custcountryomUrl: ${snippet.country}</li>
              <li>viewCount: ${statistics.viewCount}</li>
              <li>subscriberCount: ${statistics.subscriberCount}</li>
              <li>hiddenSubscriberCount: ${
                statistics.hiddenSubscriberCount
              }</li>
              <li>videoCount: ${statistics.videoCount}</li>
          </ul>
      </div>
    </div>`;
  channelElm.innerHTML = html;
};

const renderVideoHtml = (id, snippet, statistics) => {
  const html = `<div class="card">
      <div class="card-header">Video: ${snippet?.title}</div>
      <div class="card-description">${snippet?.description}</div>
      <div class="card-body">
          <ul>
              <li>publishedAt: ${moment(snippet?.publishedAt).format(
                "dddd YYYY-MM-DD h:mm:ss a"
              )}</li>
              <li class="card-chart" data-id="${id}">viewCount: ${formatNumber(
    statistics?.viewCount
  )}</li>
              <li>likeCount: ${formatNumber(statistics?.likeCount)}</li>
              <li>favoriteCount: ${statistics?.favoriteCount}</li>
              <li class="card-comment" data-id="${id}">
                commentCount: ${statistics.commentCount}
              </li>
          </ul>
      </div>
    </div>`;
  $(".video").append(html);
};

const commentsElements = document.querySelector("#video");
commentsElements.onclick = (event) => {
  switch (event.srcElement.className) {
    case "card-comment":
      handleComment(event.srcElement.dataset.id);
      break;

    case "card-chart":
      handleChart(event.srcElement.dataset.id);
      break;

    default:
      break;
  }
};

const commentElement = document.querySelector("#comment");
const contentCommentElement = document.querySelector("#comment-content"); 
const closeCommentElement = document.querySelector("#comment-close"); 
async function handleComment(videoId) {
  const response = await fetch(`${constant.commentThreads}&videoId=${videoId}`);
  const data = await response.json();

  commentElement.classList.add("active");
  contentCommentElement.innerHTML = "";
  for await (const obj of data.items) {
    renderComment(obj.snippet.topLevelComment.snippet, false);
    if (obj.snippet.totalReplyCount > 0) {
      for await (const comment of obj.replies.comments) {
        renderComment(comment.snippet, true);
      }
    }
  }
}

closeCommentElement.onclick = () => {
  commentElement.classList.remove("active");
};

const renderComment = (snippet, replies) => {
  const html = `<div class="comment" style="${replies && "margin-left: 100px"}">
                  <div class="comment-inner">
                      <div class="comment-avatar">
                          <span class="avatar avatar-circle avatar-image">
                            <img src="${snippet.authorProfileImageUrl}" alt="${
    snippet.authorDisplayName
  }">
                          </span>
                      </div>
                      <div class="comment-content">
                          <div class="comment-content-author">
                              <span class="comment-content-author-name">
                                  <a>${snippet.authorDisplayName}</a>
                              </span>
                              <span class="comment-content-author-time">
                                  <span>${moment(snippet?.publishedAt).format(
                                    "dddd YYYY-MM-DD h:mm:ss a"
                                  )}</span>
                              </span>
                          </div>
                          <div class="comment-content-detail">
                              <p>${snippet.textDisplay}</p>
                          </div>
                          <ul class="comment-actions">
                              <li>
                                  <span>
                                      <span role="img" aria-label="like" class="anticon anticon-like">
                                          <svg viewBox="64 64 896 896" focusable="false" data-icon="like" width="1em"
                                              height="1em" fill="currentColor" aria-hidden="true">
                                              <path
                                                  d="M885.9 533.7c16.8-22.2 26.1-49.4 26.1-77.7 0-44.9-25.1-87.4-65.5-111.1a67.67 67.67 0 00-34.3-9.3H572.4l6-122.9c1.4-29.7-9.1-57.9-29.5-79.4A106.62 106.62 0 00471 99.9c-52 0-98 35-111.8 85.1l-85.9 311h-.3v428h472.3c9.2 0 18.2-1.8 26.5-5.4 47.6-20.3 78.3-66.8 78.3-118.4 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7 0-12.6-1.8-25-5.4-37 16.8-22.2 26.1-49.4 26.1-77.7-.2-12.6-2-25.1-5.6-37.1zM112 528v364c0 17.7 14.3 32 32 32h65V496h-65c-17.7 0-32 14.3-32 32z">
                                              </path>
                                          </svg>
                                      </span>
                                      <span class="comment-action">1</span>
                                  </span>
                              </li>
                              <li>
                                  <span>
                                      <span role="img" aria-label="dislike" class="anticon anticon-dislike">
                                          <svg viewBox="64 64 896 896" focusable="false" data-icon="dislike" width="1em"
                                              height="1em" fill="currentColor" aria-hidden="true">
                                              <path
                                                  d="M885.9 490.3c3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-28.3-9.3-55.5-26.1-77.7 3.6-12 5.4-24.4 5.4-37 0-51.6-30.7-98.1-78.3-118.4a66.1 66.1 0 00-26.5-5.4H144c-17.7 0-32 14.3-32 32v364c0 17.7 14.3 32 32 32h129.3l85.8 310.8C372.9 889 418.9 924 470.9 924c29.7 0 57.4-11.8 77.9-33.4 20.5-21.5 31-49.7 29.5-79.4l-6-122.9h239.9c12.1 0 23.9-3.2 34.3-9.3 40.4-23.5 65.5-66.1 65.5-111 0-28.3-9.3-55.5-26.1-77.7zM184 456V172h81v284h-81zm627.2 160.4H496.8l9.6 198.4c.6 11.9-4.7 23.1-14.6 30.5-6.1 4.5-13.6 6.8-21.1 6.7a44.28 44.28 0 01-42.2-32.3L329 459.2V172h415.4a56.85 56.85 0 0133.6 51.8c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-13.9 25.4 21.9 19a56.76 56.76 0 0119.6 43c0 9.7-2.3 18.9-6.9 27.3l-14 25.5 21.9 19a56.76 56.76 0 0119.6 43c0 19.1-11 37.5-28.8 48.4z">
                                              </path>
                                          </svg>
                                      </span>
                                      <span class="comment-action">0</span>
                                  </span>
                              </li>
                              <li><span>Reply to</span></li>
                          </ul>
                      </div>
                  </div>
                </div>`;
  $("#comment-content").append(html);
};

const channelJson = document.querySelector("#channelJson");
channelJson.onclick = () => {
  window.open(`${constant.pageChannel}?id=${constant.channelId}`, "_blank");
};

const videoJson = document.querySelector("#videoJson");
videoJson.onclick = () => {
  window.open(`${constant.pageVideos}?id=${constant.channelId}`, "_blank");
};
