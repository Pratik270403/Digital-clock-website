const clock = document.getElementById('clock');
const toggleMode = document.getElementById('toggleMode');
const toggleFormat = document.getElementById('toggleFormat');

let is24Hour = JSON.parse(localStorage.getItem('is24Hour')) ?? false;
let darkMode = JSON.parse(localStorage.getItem('darkMode')) ?? false;

const updateClock = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  let ampm = '';

  if (!is24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }

  const format = (val) => val.toString().padStart(2, '0');
  clock.innerHTML = `
    <span class="digit">${format(hours)}</span>:
    <span class="digit">${format(minutes)}</span>:
    <span class="digit">${format(seconds)}</span>
    ${!is24Hour ? `<span class="digit">${ampm}</span>` : ''}
  `;
};

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode');
  darkMode = !darkMode;
  localStorage.setItem('darkMode', JSON.stringify(darkMode));
};

const toggleHourFormat = () => {
  is24Hour = !is24Hour;
  toggleFormat.textContent = is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';
  localStorage.setItem('is24Hour', JSON.stringify(is24Hour));
};

toggleMode.addEventListener('click', toggleDarkMode);
toggleFormat.addEventListener('click', toggleHourFormat);

if (darkMode) document.body.classList.add('dark-mode');
toggleFormat.textContent = is24Hour ? 'Switch to 12-hour' : 'Switch to 24-hour';

updateClock();
setInterval(updateClock, 1000);
