angular.module('cfWeekSchedule', [])
  .directive('cfWeekSchedule', cfWeekScheduleDirective);

function cfWeekScheduleDirective () {
  return {
    restrict: 'E',
    templateUrl: '/angular-week-schedule.html',
    scope: {
      events: '='
    },
    controller: cfWeekScheduleCtrl,
    controllerAs: 'ws',
    bindToController: true
  }
}

function cfWeekScheduleCtrl () {
  var ws = this;

  ws.getEventStyles = getEventStyles;
  ws.events         = _.sortBy(ws.events, 'start');
  ws.daysOfWeek     = 'Monday Tuesday Wednesday Thursday Friday'.split(' ');
  ws.week           = [[],[],[],[],[]];

  //  Determine starting index of week based on day of first event
  var firstIndex = ws.events[0].start.day() - 1;

  var day = ws.week[firstIndex];
  day.push([ws.events[0]]);

  //  Each day is a multi dimmensional array with events in the same array
  //  if their times overlap
  for (var eventIndex = 1; eventIndex < ws.events.length; eventIndex++) {
    if (eventsOverlap(ws.events[eventIndex - 1], ws.events[eventIndex])) {
      day[day.length - 1].push(ws.events[eventIndex]);
    } else {
      day.push([ws.events[eventIndex]]);
    }

    //  If there is a next event, get the day of week for that event
    if (eventIndex + 1 < ws.events.length) {
      day = ws.week[ws.events[eventIndex + 1].start.day() - 1];
    }
  }

  function eventsOverlap (event1, event2) {
    var range1 = moment.range(event1.start, event1.end);
    var range2 = moment.range(event2.start, event2.end);

    return range1.overlaps(range2);
  }

  function getEventStyles (event, index, count) {
    var styles = {
      top: getEventTop(event),
      left: getEventLeft(index, count),
      width: getEventWidth(count),
      height: getEventHeight(event)
    }

    return styles;
  }

  function getEventTop (event) {
    var offsetPx = 30;
    var hourPx   = (event.start.hours() - 7) * 60;
    var minPx    = (event.start.minutes());

    return offsetPx + hourPx + minPx + 'px';
  }

  function getEventLeft (index, count) {
    var leftPc = 1 / count * 100 * index;

    return leftPc + '%';
  }

  function getEventWidth (count) {
    var widthPc = 1 / count * 100;

    return widthPc + '%';
  }

  function getEventHeight (event) {
    var endPx   = event.end.hours() * 60 + event.end.minutes();
    var startPx = event.start.hours() * 60 + event.start.minutes();

    return endPx - startPx + 'px';
  }

  return ws;
}
