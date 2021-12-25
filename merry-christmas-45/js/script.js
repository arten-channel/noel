var stars = [];



for (i = 0; i <= 4; ++i) {

  let burst = new mojs.Burst({
    left: 0, top: 0,
    radius: { 0: Math.trunc(Math.random() * 1000) },
    count: Math.trunc(Math.random() * 8),
    children: {
      shape: 'circle',
      radius: 20,
      fill: ['white', 'cyan', 'yellow'],
      strokeWidth: 5,
      duration: 2000
    }
  });
  stars.push(burst);
}




document.addEventListener('click', function (e) {

  for (i = 0; i <= 4; ++i) {
    offsetx = i != 0 ? Math.trunc(Math.random() * window.innerWidth) : e.pageX;

    offsety = i != 0 ? Math.trunc(Math.random() * window.innerHeight) : e.pageY;
    stars[i]
      .tune({ x: offsetx, y: offsety })
      .setSpeed(3)
      .replay();
  }
});
Pop = document.querySelector('#Layer_1')
anime({
  targets: Pop,
  scale: 1.3,
  duration: 3000,
  elasticity: 500,
  delay: 1000,
  loop: true
});

svgFx1 = document.querySelector('#merry')

anime({
  targets: svgFx1,
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 4000,
  elasticity: 0,
  delay: 000,
  loop: true
});

christ = document.querySelector('#christ')

anime({
  targets: christ,
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 4000,
  elasticity: 0,
  delay: 000,
  loop: true
});

mas = document.querySelector('#mas')

anime({
  targets: mas,
  strokeDashoffset: [anime.setDashoffset, 0],
  duration: 4000,
  elasticity: 0,
  delay: 000,
  loop: true
});