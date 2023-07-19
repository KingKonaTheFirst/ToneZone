var chest = $("#chest");
var back = $("#back");
var shoulders = $("#shoulders");
var arms = $("#arms");
var legs = $("#legs");
var abs = $("#abs");
var cardio = $("#cardio");
var input = "";
var muscle = "";

  $("#chest").click(function () {
    input = "chest workout";
    ytVid();

    muscle = "chest";
    exsDB();
  });

  $("#back").click(function () {
    input = "back workout";
    ytVid();

    muscle = "back";
    exsDB();
  });

  $("#shoulders").click(function () {
    input = "shoulder workout";
    ytVid();

    muscle = "shoulders"
    exsDB();
  });

  $("#arms").click(function () {
    input = "arm workout";
    ytVid();

    muscle = "upper arms";
    exsDB();
  });

  $("#legs").click(function () {
    input = "leg workout";
    ytVid();

    muscle = "upper legs";
    exsDB();
  });

  $("#abs").click(function () {
    input = "ab workout";
    ytVid();

    muscle = "waist";
    exsDB();
  });

  $("#cardio").click(function () {
    input = "cardio workout";
    ytVid();

    muscle = "cardio";
    exsDB();
  });

var apiKey = ['AIzaSyBYNhIlc9YdmoYHiCntxp--3Ij1vzAkMnQ', 'AIzaSyDn2CMSUh7Rhv-2Ds0l28llAB6hMCQSNL8', 'AIzaSyAhAVWVVoc1OCmuRgIKRAiXuL9uLRgSWg0', 'AIzaSyD-Lbr2HwwyUVkz1BrUtN-b_OMTVZ0KKFI'];
let currentIndex = 0;

function ytVid() {
//  youtube api keys
  var currentApiKey = apiKey[currentIndex];
  var apiUrl = "https://www.googleapis.com/youtube/v3/search";
  var videoSearch = "?part=snippet&q=" + input + "&type=video&maxResults=10&key=";
//  fetch command for youtube
  fetch(apiUrl + videoSearch + currentApiKey)
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
    currentIndex = (currentIndex + 1) % apiKey.length;
    ytVid();
    
  })};


function exsDB() {
  const settings = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '73e984e367msh9cc0deea9bcc832p1ef798jsn680812134482',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  

  fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPart/' + muscle, settings)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Request failed. Status code: " + response.status);
  })
  .then(function (data) {
    console.log(data);
    let array = data;
    var exsArray = [];
    for (let i = 0; i < 10; i++) {
      var exercise = array[Math.floor(Math.random() * array.length)]
      var exsName = exercise.name
      console.log(exsName);
      exsArray.push(exsName)
      var exsList = document.getElementById("exercises")
      let exsLI = document.createElement("li");
      exsLI.innerHTML = exsArray[i];
      exsList.appendChild(exsLI);
    }
    localStorage.setItem("history", exsArray);
  })
    .catch(error => console.error(error));
}