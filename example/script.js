angular.module('weekScheduleTest', ['cfWeekSchedule'])
.controller('weekScheduleTestCtrl', function ($scope) {
  $scope.events = [
    {
      start: moment().day(1).hour(8).minute(30).second(0).millisecond(0),
      end: moment().day(1).hour(9).minute(20).second(0).millisecond(0),
      title: 'Comp 1230'
    },
    {
      start: moment().day(1).hour(11).minute(30).second(0).millisecond(0),
      end: moment().day(1).hour(12).minute(20).second(0).millisecond(0),
      title: 'Math 1380'
    },
    {
      start: moment().day(1).hour(12).minute(0).second(0).millisecond(0),
      end: moment().day(1).hour(13).minute(30).second(0).millisecond(0),
      title: 'Math 1390'
    },
    {
      start: moment().day(1).hour(15).minute(30).second(0).millisecond(0),
      end: moment().day(1).hour(17).minute(0).second(0).millisecond(0),
      title: 'Comp 2230'
    },
    {
      start: moment().day(1).hour(11).minute(30).second(0).millisecond(0).add(1, 'day'),
      end: moment().day(1).hour(12).minute(20).second(0).millisecond(0).add(1, 'day'),
      title: 'Math 1380'
    },
    {
      start: moment().day(1).hour(15).minute(30).second(0).millisecond(0),
      end: moment().day(1).hour(16).minute(20).second(0).millisecond(0),
      title: 'Cmns 1290'
    },
    {
      start: moment().day(1).hour(16).minute(0).second(0).millisecond(0),
      end: moment().day(1).hour(16).minute(45).second(0).millisecond(0),
      title: 'Cmns 1290'
    },
    {
      start: moment().day(1).hour(8).minute(30).second(0).millisecond(0).add(1, 'day'),
      end: moment().day(1).hour(9).minute(20).second(0).millisecond(0).add(1, 'day'),
      title: 'Comp 1230'
    },
    {
      start: moment().day(1).hour(12).minute(0).second(0).millisecond(0).add(2, 'days'),
      end: moment().day(1).hour(13).minute(30).second(0).millisecond(0).add(2, 'days'),
      title: 'Math 1390'
    },
    {
      start: moment().day(1).hour(15).minute(30).second(0).millisecond(0).add(3, 'days'),
      end: moment().day(1).hour(17).minute(0).second(0).millisecond(0).add(3, 'days'),
      title: 'Comp 2230'
    },
    {
      start: moment().day(1).hour(15).minute(30).second(0).millisecond(0).add(4, 'days'),
      end: moment().day(1).hour(16).minute(20).second(0).millisecond(0).add(4, 'days'),
      title: 'Cmns 1290'
    },
    {
      start: moment().day(1).hour(16).minute(0).second(0).millisecond(0).add(4, 'days'),
      end: moment().day(1).hour(16).minute(45).second(0).millisecond(0).add(4, 'days'),
      title: 'Cmns 1290'
    }
  ]
})
