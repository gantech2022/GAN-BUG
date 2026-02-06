const cards = [...document.querySelectorAll('.card')];
const nextBtn = document.querySelector('.next-btn');
const answerBtns = [...document.querySelectorAll('.answer-btn')];
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const restartBtn = document.getElementById('restartBtn');
const heartsLayer = document.querySelector('.hearts');

let currentStep = 0;

function showStep(step) {
  cards.forEach((card) => card.classList.remove('active'));
  const target = cards.find((card) => Number(card.dataset.step) === step);
  if (target) {
    target.classList.add('active');
    currentStep = step;
  }
}

function nextStep() {
  showStep(currentStep + 1);
}

nextBtn.addEventListener('click', nextStep);
answerBtns.forEach((btn) => btn.addEventListener('click', nextStep));

function randomPosition(max) {
  return Math.floor(Math.random() * max);
}

function dodgeNoButton() {
  const bounds = noBtn.parentElement.getBoundingClientRect();
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const x = randomPosition(Math.max(20, bounds.width - btnWidth));
  const y = randomPosition(Math.max(20, bounds.height - btnHeight));

  noBtn.style.position = 'absolute';
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

['mouseenter', 'touchstart', 'click'].forEach((eventName) => {
  noBtn.addEventListener(eventName, dodgeNoButton);
});

yesBtn.addEventListener('click', () => {
  showStep(5);
  burstHearts(40);
});

restartBtn.addEventListener('click', () => {
  noBtn.style.position = 'relative';
  noBtn.style.left = '0';
  noBtn.style.top = '0';
  showStep(0);
});

function createHeart() {
  const heart = document.createElement('span');
  heart.className = 'heart';
  heart.style.left = `${randomPosition(window.innerWidth)}px`;
  heart.style.animationDuration = `${4 + Math.random() * 4}s`;
  heart.style.opacity = `${0.3 + Math.random() * 0.7}`;
  heartsLayer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 8000);
}

function burstHearts(count) {
  for (let i = 0; i < count; i += 1) {
    setTimeout(createHeart, i * 120);
  }
}

setInterval(createHeart, 850);
