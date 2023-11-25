
document.addEventListener('DOMContentLoaded', function () {

  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  document.getElementById('currentDay').textContent = currentDate;

  $('.container-lg').empty();


  for (var i = 9; i <= 18; i++) {
    createNewTimeBlock(i);
  }

  $('.time-block').each(function () {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    var currentHour = dayjs().format('H');

    if (blockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (blockHour == currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });


  $('.time-block').each(function () {
    var timeBlockId = $(this).attr('id');
    var savedInput = localStorage.getItem(timeBlockId);

    if (savedInput) {
      $(this).find('textarea').val(savedInput);
    }
  });


  $('.saveBtn').on('click', function () {
    var timeBlock = $(this).closest('.time-block');
    var timeBlockId = timeBlock.attr('id');
    var userInput = timeBlock.find('textarea').val();
    localStorage.setItem(timeBlockId, userInput);
  });


  function createNewTimeBlock(hour) {
    var timeBlockId = 'hour-' + hour;

    var newTimeBlock = $('<div>').addClass('row time-block');
    newTimeBlock.attr('id', timeBlockId);

    var displayHour = hour % 12 || 12;
    var amPm = hour < 12 ? 'AM' : 'PM';

    var hourDiv = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(displayHour + amPm);
    var newTextarea = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveBtn = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save');
    saveBtn.html('<i class="fas fa-save" aria-hidden="true"></i>');

    newTimeBlock.append(hourDiv, newTextarea, saveBtn);
    $('.container-lg').append(newTimeBlock);
  }

});
