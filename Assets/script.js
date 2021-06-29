// This variable is for all hours in the work day between 9am and 5pm.
var mySchedule = [
    {
        id: "0",
        hour: "9",
        time: "09",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "4",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "5",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "6",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "7",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "8",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    
]
// This displays the current date and time on the top of the page using moment.js.
var showTimeEl = $('#time-display');

function showTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    showTimeEl.text(rightNow);
}

setInterval(showTime, 1000);


// this creates the visuals for the day planner.
mySchedule.forEach(function(selectedHour) {
    // this creates the time blocks row in bootstrap
    var timeRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(timeRow);

    // this creates the time fields
    var timeField = $("<div>")
        .text(`${selectedHour.hour}${selectedHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    // this creates the data for the scheduler.
    var timePlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    timePlan.append(planData);
    planData.attr("id", selectedHour.id);

    // This else-if statement compares the acutal time to the hour on the planner
    // and changes the class depending on the time of day and the hour. Each closs is color coded.
    if (selectedHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (selectedHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else {
        planData.attr({
            "class": "future"
        })
    }

    // saves calendar event data to localStorage
    function saveEvents() {  
    localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
    }

    // this displays any event data to the view
    function showEvents() {  
    mySchedule.forEach(function (_selectedHour) {
        $(`#${_selectedHour.id}`).val(_selectedHour.reminder);
    })
    }

    // this creates the save button on each time slot.
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    timeRow.append(timeField, timePlan, savePlan);
})

// saves calendar event data to localStorage
function saveEvents() {  
    localStorage.setItem("mySchedule", JSON.stringify(mySchedule));
    }

// this displays any event data to the view
function showEvents() {  
    mySchedule.forEach(function (_selectedHour) {
        $(`#${_selectedHour.id}`).val(_selectedHour.reminder);
    })
    }
// this sets any localStorage data to the view if there is any data.
function localStorageData() {
    var storedDay = JSON.parse(localStorage.getItem("mySchedule"));

    if (storedDay) {
        mySchedule = storedDay;
    }

    saveEvents();
    showEvents();
}

localStorageData();


// Allows edits and saves future event data to be used in localStorage
// $(".saveBtn").on("click", function(event) {
//     event.preventDefault();
//     var saveIndex = $(this).siblings(".description").children(".past").attr("id");
//     mySchedule[saveIndex].reminder = $(this).siblings(".description").children(".past").val();
//     console.log(saveIndex);
//     saveEvents();
//     showEvents();
// })

// $(".saveBtn").on("click", function(event) {
//     event.preventDefault();
//     var saveIndex = $(this).siblings(".description").children(".present").attr("id");
//     mySchedule[saveIndex].reminder = $(this).siblings(".description").children(".present").val();
//     console.log(saveIndex);
//     saveEvents();
//     showEvents();
// })

$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    mySchedule[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveEvents();
    showEvents();
})



