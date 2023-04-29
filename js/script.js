fetch('./data/timetable.json')
  .then(response => response.json())
  .then(data => {
    const timetableData = data.response.weeks;
    for (i in timetableData) {
      document.getElementById('select-week').innerHTML += `<div class="select-week__button" onclick='selectWeek(${i})'>${i} неделя</div>`;
    }
  })
  .catch(error => console.error(error));

async function clearWeeks() {
    for (let i = 0; i < 64; i++) {
      document.querySelectorAll('.timetable__lesson')[i].innerHTML = '';
      document.querySelectorAll('.timetable__lesson')[i].classList.remove('active');
    }
}

function selectWeek(value) {
  document.getElementById('timetable').style.display = 'flex';
  fetch('./data/timetable.json')
  .then(response => response.json())
  .then(data => {
    clearWeeks();
    let timetableDays = document.querySelectorAll('.timetable__day');
    const timetableData = data.response.weeks[value].days;
    for (let i = 0; i < timetableDays.length; i++) {
      for (let d = 0; d < 8; d++) {
        if (timetableData[i].lessons[d][0] != undefined) {
          timetableDays[i].querySelectorAll('.timetable__lesson')[d].innerHTML = `<div class="timetable__lession-name">${timetableData[i].lessons[d][0].nameOfLesson}</div>
          <div class="timetable__lession-teacher">${timetableData[i].lessons[d][0].teacher}</div>
          <div class="timetable__lession-room">${timetableData[i].lessons[d][0].room}</div>`;
          timetableDays[i].querySelectorAll('.timetable__lesson')[d].classList.add('active');
        }
      }
    }
  })
  .catch(error => console.error(error));
}


