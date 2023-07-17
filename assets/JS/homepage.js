var chest = $("#chest");
var chest = $("#back");
var shoulders = $("#shoulders");
var legs = $("#legs");
var abs = $("#abs");
var cardio = $("#cardio");

$(document).ready(function () {
  // Add click listener to the button
  $("#chest").click(function () {
    // Code to execute when the button is clicked
    alert("Button clicked!");
  });
  $("#back").click(function () {
    //   alert for testing delete later
    alert("Button clicked!");
  });
  $("#shoulders").click(function () {
    //   alert for testing delete later
    alert("Button clicked!");
  });
  $("#legs").click(function () {
    //   alert for testing delete later
    alert("Button clicked!");
  });
  $("#abs").click(function () {
    //   alert for testing delete later
    alert("Button clicked!");
  });
  $("#cardio").click(function () {
    //   alert for testing delete later
    alert("Button clicked!");
  });
});

var apiKey = "AIzaSyBAxCtGMC0LTqmTteYtwiNgPO_uQxXRexE";
var apiUrl = "https://www.googleapis.com/youtube/v3/search";
var input = "";
var videoSearch = "?part=snippet&q=" + input + "&type=video&maxResults=10&key=";

fetch(apiUrl + videoSearch + apiKey)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Request failed. Status code: " + response.status);
  })
  .then(function (data) {
    console.log(data);
    var videoId = data.items[0].id.videoId;
    var videoTitle = data.items[0].snippet.title;
    var videoThumbnail = data.items[0].snippet.thumbnails.default.url;

    // Create an iframe element for the video
    var iframe = document.createElement("iframe");
    iframe.src = "https://www.youtube.com/embed/" + videoId;
    iframe.title = videoTitle;

    // Create an image element for the video thumbnail
    var thumbnail = document.createElement("img");
    thumbnail.src = videoThumbnail;
    thumbnail.alt = videoTitle;

    // Create a container element for the video
    var videoContainer = document.createElement("div");
    videoContainer.classList.add("video-item");
    videoContainer.appendChild(iframe);

    // Append the video container to the main container in your HTML
    document.getElementById("videoContainer").appendChild(videoContainer);
  })
  .catch(function (error) {
    console.log("Error:", error.message);
  });
