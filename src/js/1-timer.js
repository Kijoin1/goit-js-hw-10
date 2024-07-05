import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css'
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let dataInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        color: 'red',
        title: 'Please choose a date in the future',
        image: '../img/cat.jpg',
        titleColor: 'black',
      });
      refs.button.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      refs.button.disabled = false;

      return userSelectedDate
    }
  },
};

flatpickr('#datetime-picker', options);

refs.button.addEventListener('click', startTimer)

function startTimer() {

const timeClick = Date.now()
refs.button.setAttribute('disabled', '');
refs.input.setAttribute('disabled', '');


dataInterval = userSelectedDate - timeClick
console.log(dataInterval)

let interval = setInterval(()=>{
const time = convertMs(dataInterval);
const str = getTime(time)

refs.days.textContent = str.dataDays
refs.hours.textContent = str.dataHours
refs.minutes.textContent = str.dataMinutes
refs.seconds.textContent = str.dataSeconds

  dataInterval -= 1000;
if (dataInterval <= 0) {
    clearInterval(interval);
  refs.input.removeAttribute('disabled');

  userSelectedDate = null;
  dataInterval = null;
}
}, 1000)}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function getTime({days, hours, minutes, seconds}) {
  const getTimeData = {
    dataDays: days.toString().padStart(2,'0'),
    dataHours: hours.toString().padStart(2,'0'),
    dataMinutes: minutes.toString().padStart(2,'0'),
    dataSeconds: seconds.toString().padStart(2,'0'),
  }
  return getTimeData;
}