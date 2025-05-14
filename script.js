const endDate = new Date("2025-05-28T16:30:00").getTime();
const startDate = new Date("2025-05-12T14:30:00").getTime();

const countdownText = document.getElementById("countdownText");
const messageElement = document.getElementById("message");
const ctx = document.getElementById('countdownCircle').getContext('2d');

const videoList = [
  "https://drive.google.com/uc?export=view&id=177SqNaJEoRHdB6e_e6mYu9aATTzczWfe",
  "https://drive.google.com/uc?export=view&id=1EQKGmktDtMMiFaKzJqaw1T1sjUrWTU3M",
  "https://drive.google.com/uc?export=view&id=1Jqgf4AJn8xH0opmf9OPdcB6z9_jQIeRA",
  "https://drive.google.com/uc?export=view&id=1LssaGZvB43Uy5ZDQkXhKOVKkZlA6gEDY",
  "https://drive.google.com/uc?export=view&id=1NdNkT2sRT5PVg1fGgAZoQF_g4IidLw2G",
  "https://drive.google.com/uc?export=view&id=1RZ61bYmmkq7OX_Vdl2_W5ec_oxgtzavC",
  "https://drive.google.com/uc?export=view&id=1aOFnZQJ2_yz9Rz6yFAYgh5_MH4DJVdmv",
  "https://drive.google.com/uc?export=view&id=1xJk-koEUsu_QSQU1RnEkfArvYVGwtXRJ"
];

function getRandomVideo() {
  const index = Math.floor(Math.random() * videoList.length);
  return videoList[index];
}

function drawCircle(percentage) {
  const centerX = 150;
  const centerY = 150;
  const radius = 120;
  const lineWidth = 20;

  ctx.clearRect(0, 0, 300, 300);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#444';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  const gradient = ctx.createLinearGradient(0, 0, 300, 300);
  gradient.addColorStop(0, '#00c6ff');
  gradient.addColorStop(1, '#0072ff');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, (2 * Math.PI * percentage) - Math.PI / 2);
  ctx.strokeStyle = gradient;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";
  ctx.stroke();
}

function updateCountdown() {
  const now = new Date().getTime();
  const totalDuration = endDate - startDate;
  const distance = endDate - now;

  if (distance <= 0) {
    countdownText.style.display = "none";
    messageElement.style.display = "block";
    const videoId = getRandomVideo().split("id=")[1];
    document.getElementById("congratsVideoFrame").src = `https://drive.google.com/file/d/${videoId}/preview`;
    clearInterval(timer);
    drawCircle(1);
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = `${days} Days`;
  document.getElementById("hours").textContent = `${hours} Hours`;
  document.getElementById("minutes").textContent = `${minutes} Minutes`;
  document.getElementById("seconds").textContent = `${seconds} Seconds`;

  const percentagePassed = 1 - (distance / totalDuration);
  drawCircle(percentagePassed);
}

const timer = setInterval(updateCountdown, 1000);
updateCountdown();
