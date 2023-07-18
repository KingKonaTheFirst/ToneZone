var chest = $("#chest");
var back = $("#back");
var shoulders = $("#shoulders");
var legs = $("#legs");
var abs = $("#abs");
var cardio = $("#cardio");
var input = "";
var muscle = 'biceps';

$(document).ready(function () {
  $("#chest").click(function () {
    input = "chest workout";
    ytVid();
    
  });
  // Add click listener to the button
  $("#back").click(function () {
    input = "back and bicep workout";
    ytVid();
  });
  $("#shoulders").click(function () {

  });
  $("#legs").click(function () {

  });
  $("#abs").click(function () {

  });
  $("#cardio").click(function () {

  });
  $("#dialog-form").dialog(function () {
    ("open")});
});

function ytVid() {
  let apiKey = "AIzaSyBAxCtGMC0LTqmTteYtwiNgPO_uQxXRexE";
  let apiUrl = "https://www.googleapis.com/youtube/v3/search";
  let videoSearch = "?part=snippet&q=" + input + "&type=video&maxResults=10&key=";
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
  })};


function exsDB() {
  const settings = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '73e984e367msh9cc0deea9bcc832p1ef798jsn680812134482',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  
  fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', settings)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

exsDB();
