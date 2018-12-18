
// YYYY-MM-DD HH:MM:SS
const formateDate = (date, formate) => {

  let _date = new Date();
  let _formate = 'YYYY-MM-DD HH:MM:SS';
  let dateStr = '';

  if (typeof date == 'number') {
    _date = new Date(date);
  }
  if (typeof date == 'string') {
    _formate = date;
  }

  if (typeof date == 'number' && date == 'string') {
    _date = new Date(date);
    _formate = formate;
  }

  if (_formate.includes(' ')) {

    _formate = _formate.split(' ');

    for (let i = 0; i < _formate.length; i++) {
      let _item = _formate[i];

      if (_item.includes('-')) {
        dateStr += formateYMD(_date, _item);
      };
      if (_item.includes(':')) {
        dateStr += formateHMS(_date, _item);
      };
    }
  }
  if (!_formate.includes(' ') && _formate.includes('-')) {

    dateStr += formateYMD(_date, _formate);

  }
  if (!_formate.includes(' ') && _formate.includes(':')) {

    dateStr += formateHMS(_date, _formate);

  }

  if (dateStr.lastIndexOf('-') + 1 == dateStr.length) {

    dateStr = dateStr.substring(0, dateStr.length - 1);

  }

  return dateStr;

}

function formateYMD(_date, str) {
  let _itemArray = str.split('-');
  let dateStr = '';
  for (let k = 0; k < _itemArray.length; k++) {
    if (_itemArray[k].includes('Y')) {
      dateStr += _date.getFullYear() + '-';
    }
    if (_itemArray[k].includes('M')) {
      dateStr += _date.getMonth() + '-';
    }
    if (_itemArray[k].includes('D')) {
      dateStr += _date.getDate() + '-';
    }
  };

  return dateStr;
}

function formateHMS(_date, str) {
  let _itemArray = str.split(':');
  let dateStr = '';
  for (let j = 0; j < _itemArray.length; j++) {
    if (_itemArray[j].includes('H')) {
      dateStr += _date.getHours() + '-';
    }
    if (_itemArray[j].includes('M')) {
      dateStr += _date.getMinutes() + '-';
    }
    if (_itemArray[j].includes('S')) {
      dateStr += _date.getSeconds() + '-' + _date.getMilliseconds();
    }
  };

  return dateStr;
}

export default {
  formateDate
}