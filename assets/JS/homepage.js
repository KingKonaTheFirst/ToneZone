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

$.ajax({
  method: 'GET',
  url: 'https://api.api-ninjas.com/v1/exercises?muscle=' + muscle,
  headers: { 'X-Api-Key': 'ltB+8GWY7JDnP5O/RlWgGA==E7lmmwFNWUvlNhpp'},
  contentType: 'application/json',
  success: function(result) {
      console.log(result);
  },
  error: function ajaxError(jqXHR) {
      console.error('Error: ', jqXHR.responseText);
  }
});

function exsDB() {
  let url = "https://api.api-ninjas.com/v1/exercises?muscle=" + muscle;
  let options = {
    method: "GET",
    headers: {
      "X-API-Key": "ltB+8GWY7JDnP5O/RlWgGA==E7lmmwFNWUvlNhpp"
    }
  }
  fetch(url + options)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    }
    throw new Error("Request failed. Status code: " + response.status);
  })
}

exsDB();

$( function() {
  var dialog, form,

    answer = $("#answer"),
    allFields = $( [] ).add(answer),
    tips = $(".validateTips");

  function updateTips(t) {
    tips
      .text(t)
      .addClass("ui-state-highlight");
    setTimeout(function() {
      tips.removeClass("ui-state-highlight", 1500);
    }, 500);
  }

  function checkAnswer(o) {
    if (o.val() === "yes" || o.val() === "no") {
      return true;
    } else {
      o.addClass("ui-state-error");
      updateTips("Answer must be Yes or No");
      return false;
    }
  }

  function saveAnswer() {
    var valid = true;
    allFields.removeClass( "ui-state-error" );

    valid = valid && checkAnswer(answer);

    if ( valid ) {
      localStorage.setItem("answer", answer.val());
      dialog.dialog( "close" );
    }
    return valid;
  }

  dialog = $( "#dialog-form" ).dialog({
    autoOpen: false,
    height: 400,
    width: 350,
    modal: true,
    buttons: {
      "Submit": saveAnswer,
      Cancel: function() {
        dialog.dialog( "close" );
      }
    },
    close: function() {
      form[ 0 ].reset();
      allFields.removeClass( "ui-state-error" );
    }
  });

  form = dialog.find("form").on("submit", function(event) {
    event.preventDefault();
    saveAnswer();
  });

});
