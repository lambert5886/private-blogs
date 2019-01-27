import Vue from 'vue';

const times =  function(time){
	
	var reduceTime = time;

	var _startDate = new Date().getTime();
	 
	var _endDate = new Date(_startDate + reduceTime*1000);

	var t = new Date(_endDate.getTime() - _startDate);
	var m = t.getMinutes();
	var s = t.getSeconds();
	if(reduceTime > 0){
		reduceTime--;
	}
	var _minutes = checkTime(m);
	var _seconds = checkTime(s);


	return {minutes: _minutes, seconds: _seconds};
}

const articleId = (info) => {
	let date = new Date();
	let _year = date.getFullYear(),
		_month = date.getMonth(),
		_hours = date.getHours(),
		_minutes = date.getMinutes(),
		_seconds = date.getMilliseconds();
		console.log(_year, _month, _hours, _minutes, _seconds)
		if(info){
			return _year + info + _month +  info + _hours + ':' + _minutes + info + _seconds;
		}else{
			return   _year + '' + _month +  '' + _hours +  '' + _minutes +  '' + _seconds;
		}
	
}

const EventBus = new Vue();

export {times, EventBus, articleId} ;


function startTime(){
	var today=new Date()
	var h=today.getHours()
	var m=today.getMinutes()
	var s=today.getSeconds()
//小于10时,添加0;
		m=checkTime(m)
		s=checkTime(s);

		return (m + s );

	
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}

