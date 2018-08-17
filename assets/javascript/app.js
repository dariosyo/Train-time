

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAwXli8PvpaUOJUO72lUSsg7iAea21v9y8",
    authDomain: "database2-da8ef.firebaseapp.com",
    databaseURL: "https://database2-da8ef.firebaseio.com",
    projectId: "database2-da8ef",
    storageBucket: "database2-da8ef.appspot.com",
    messagingSenderId: "952124571769"
  };
  firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Trains
$("#add-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "LT").format("X");
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  //  the train time standard
  var trainTimeStandard = moment.unix(trainTime).format("hh:mm");
    console.log(trainTimeStandard);
  var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(trainTimeConverted);
 
    // Current Time
 var currentTime = moment("hh:mm");
 console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

 // Difference between the times
 var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
 console.log("DIFFERENCE IN TIME: " + diffTime);

 // Time apart (remainder)
 var tRemainder = diffTime % trainFreq;
 console.log(tRemainder);

 // Minute Until Train
 var tMinutesTillTrain = trainFreq - tRemainder;
 console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tRemainder),
    
  );

  // Append the new row to the table
  $("#schedule-table > tbody").append(newRow);
});

