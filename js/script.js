$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEzDnGTiMZXTF-j3XOVg5hnFZGAHUgYAM",
    authDomain: "homework-2d45a.firebaseapp.com",
    databaseURL: "https://homework-2d45a.firebaseio.com",
    projectId: "homework-2d45a",
    storageBucket: "",
    messagingSenderId: "848925413248"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = 0;
  var frequency = 0;
  

  var time = moment().format('llll');
  
  document.getElementById("time").innerHTML = time;

$("#submit").on("click", function(event) {

  event.preventDefault();

  var newName = $("#name-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newStartTime = $("#start-time-input").val();
  var newFrequency = parseInt($("#frequency-input").val());


  console.log(newStartTime);

  var firstTimeConverted = moment(newStartTime, "hh:mm").subtract(1,"years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("diff " + diffTime);

  var tRemainder = diffTime % newFrequency;
  console.log(tRemainder);

  var minAway = newFrequency - tRemainder;
  console.log("min away" + minAway);

  var nextArrival = moment(moment().add(minAway, "minutes")).format("H:mm");
  console.log("arrival time " + nextArrival);

  database.ref().push({
    name: newName,
    destination: newDestination,
    startTime: newStartTime,
    frequency: newFrequency,
    arrival: nextArrival,
    minAway: minAway,
    
  });

  $("#name-input").val("");
  $("#destination-input").val("");
  $("#start-time-input").val("");
  $("#frequency-input").val("");

  
});

database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot

  console.log("\n", childSnapshot.val());
  var newRow = $("<tr>");
  var nameCell = $("<td>").text(childSnapshot.val().name).addClass("name");
  var destinationCell = $("<td>").text(childSnapshot.val().destination).addClass("destination");
  var frequencyCell = $("<td>").text(childSnapshot.val().frequency);
  var nextArrivalCell;
  if ( childSnapshot.val().arrival < moment()) {
    nextArrivalCell = $("<td>").text(childSnapshot.val().arrival)
  } else {
    nextArrivalCell = $("<td>").text(childSnapshot.val().startTime)

  }

  // addClass()
  // css how to hide rows do not 
  // firebase and user input 

  var minAwayCell = $("<td>").text(childSnapshot.val().minAway);

  var min = childSnapshot.val().minAway;
  var train = childSnapshot.val().name;
  console.log(min)
  console.log(train)

  if (min == 5){
    $.notify(train + "is coming in 5 mins...", "info")
  }
  

  newRow.append(nameCell, destinationCell , frequencyCell, nextArrivalCell,minAwayCell);

  $("#table-body").append(newRow);

}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


});

$( function() {
  $("#plus").tooltip();
  $("#search-field").tooltip();
} )

$("#goon").hide();

$("#submit").click(function(){
  $("#goon").show();

  setTimeout(function(){
    window.location.href= './blog-single.html';
  },2000);
});



function myFunction() {
  // Declare variables 
  var input, filter, table, tr, td, i;
  input = document.getElementById("search-field");
  filter = input.value.toUpperCase();
  table = document.getElementById("table-body");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    } 
  }
}