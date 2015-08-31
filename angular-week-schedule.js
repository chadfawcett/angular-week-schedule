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



  ws.day = [ [ws.events[0]] ];

  for (var i = 1; i < ws.events.length; i++) {
    var prevRange = moment.range(ws.events[i - 1].start, ws.events[i - 1].end);
    var currRange = moment.range(ws.events[i].start, ws.events[i].end);

    if (prevRange.overlaps(currRange)) {
      ws.day[ws.day.length - 1].push(ws.events[i]);
    } else {
      ws.day.push([ws.events[i]]);
    }
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
