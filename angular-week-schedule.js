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

  function getEventStyles (calEvent, index, count) {
    var styles = {
      top: getEventTop(calEvent),
      left: getEventLeft(index, count),
      width: getEventWidth(count),
      height: getEventHeight(calEvent)
    }

    return styles;
  }

  function getEventTop (calEvent) {
    var offsetPx = 30;
    var hourPx   = (calEvent.start.hours() - 7) * 60;
    var minPx    = (calEvent.start.minutes());

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

  function getEventHeight (calEvent) {
    var endPx   = calEvent.end.hours() * 60 + calEvent.end.minutes();
    var startPx = calEvent.start.hours() * 60 + calEvent.start.minutes();

    return endPx - startPx + 'px';
  }

  return ws;
}
