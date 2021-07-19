$(document).ready(function() {
    // This listens for clicks on the save buttons for any hour.
    $('.saveBtn').on('click', function () {
      // Get the id and description values and convert to variables. 
      // The hour variable is set to the id in the index, which is the parent attribute.
      // The description variable is set to the description class, which is a sibling of the id attribute.
      var hour = $(this).parent().attr('id');
      var description = $(this).siblings('.description').val();
  
      // This will save the data in the description for the appropriate hour to localStorage.
      localStorage.setItem(hour, description);  
    });

    // This function shows the current day at the top of the planner.        
    function currentDatetime() {
      // This variable puts the time in the time-display class
      var showTimeEl = $('#time-display');
      // This variable calls on momemt.js and sets the date/time format.
      var dateTimenow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');

      showTimeEl.text(dateTimenow);
      // This sets the function to update every second.
      setInterval(currentDatetime, 1000);
    }
  
    // This function compares the current hour to the hours in the planner and color codes the hours accordingly.
    function plannerHour() {
      // This will get the current number of hours.
      var presentHour = moment().hours();
  
      // This takes the time-block class in all planner hours and converts them into a function.
      $('.time-block').each(function () {
        // This variable parses the numbers in the id section and splits the class after the hyphen. 
        // Then, it takes the number before the hyphen for comparison, which explains the 0 in brackets.. ex. 9-am, 10-am.
        var TimeSection = parseInt($(this).attr('id').split('-')[0]);
        console.log(TimeSection)
  
        // This else-if statement will add or remove past, present, and future classes to the parent class according 
        // to the time of day. The class that's added will determine the color background of the text blocks.
        if (TimeSection < presentHour) {
          $(this).addClass('past');
        } else if (TimeSection === presentHour) {
          $(this).removeClass('past');
          $(this).addClass('present');
        } else {
          $(this).removeClass('past');
          $(this).removeClass('present');
          $(this).addClass('future');
        }
      });
    }
  
    // Calling our functions to show the current date/time and to color code the planner hours.
    currentDatetime();
    plannerHour();

    // this will load any saved data from localStorage if the page is refreshed.
    $('#9-am .description').val(localStorage.getItem('9-am'));
    $('#10-am .description').val(localStorage.getItem('10-am'));
    $('#11-am .description').val(localStorage.getItem('11-am'));
    $('#12-pm .description').val(localStorage.getItem('12-pm'));
    $('#13-pm .description').val(localStorage.getItem('13-pm'));
    $('#14-pm .description').val(localStorage.getItem('14-pm'));
    $('#15-pm .description').val(localStorage.getItem('15-pm'));
    $('#16-pm .description').val(localStorage.getItem('16-pm'));
    $('#17-pm .description').val(localStorage.getItem('17-pm'));
});
  