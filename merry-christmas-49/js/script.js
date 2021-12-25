

const width = window.innerWidth - 10
const height = window.innerHeight - 10

const canvas = SVG()
  .addTo('body')
  .size(width, height)
  .viewbox(0, 0, 1000, 500)


const blurFilter = canvas.filter()
blurFilter.gaussianBlur(1)
blurFilter.move(-5, -5).size(11, 11)

const skyGradient = canvas.gradient('linear', (gradient) => {
  gradient.stop(0, '#36383f')
  gradient.stop(1, '#151154')
  gradient.rotate(90)
})


const sky = canvas.rect(1000, 300)
  .fill(skyGradient)
  .filterWith(blurFilter)

const snowGradient = canvas.gradient('linear', (gradient) => {
  gradient.stop(0, '#bbd')
  gradient.stop(1, '#fff')
  gradient.rotate(90)
})

const snow = canvas.rect(1000, 200).move(0, 300)
  .fill(snowGradient)
  .filterWith(blurFilter)


const template = canvas.path('M200 300A300 250 0 0 1 800 300')
  .stroke('black')
  .fill('none')
  .hide()


const arcPath = canvas.path('M200 300A300 250 0 0 1 200 300')
  .stroke({ color: 'yellow', width: 20 })
  .fill('none')
  .filterWith((filter) => {
    filter.gaussianBlur(10)
    filter.move(-5, -5).size(11, 11)
  })


const pathLength = template.length()

// This circle is the sparcling effect
const circle = canvas.circle(25)
  .center(200, 300)
  .fill('yellow')
  .filterWith((filter) => {
    // Create blur filter
    const blur = filter.gaussianBlur(10)

    // Turbulence and color filter
    var temp = filter.turbulence(0.15, 3)
      .colorMatrix('hueRotate', 0)

    // We animate the hueRotate value
    temp.animate(500)
      .ease('-')
      .attr('values', 360)
      .loop()

    // Use the created bump map to pixelate the blur
    filter.displacementMap(blur, temp, 10, 'R', 'G')

    // Values are factors to 100%. So 1.4 is 140%
    filter.move(-5, -5).size(11, 11)
    filter._animation = temp.timeline()
  })

const animateArc = () => {
  circle.animate(3000).during((pos) => {
    // Calculate point on path
    const { x, y } = template.pointAt(pos * pathLength)
    // Move circle and update path
    circle.center(x, y)
    arcPath.attr('d', `M200 300A300 250 0 0 1 ${x} ${y}`)
  }).after(() => {
    circle.animate().opacity(0).after(() => {
      // Stop the animation so we dont end up with
      // detached elements
      const filter = circle.reference('filter')
      filter._animation.stop()
      filter.remove()
      circle.remove()
    })
  })
}

// Create Merry Christmas text
const merryChristmasText = canvas.text('Merry Christmas')
  .filterWith((filter) => {
    const blur = filter.gaussianBlur(10)
    filter.blend(filter.source, blur)
    filter.move(-5, -5).size(11, 11)
  })
  .fill('white')
  .font({ size: 40 })
  .center(500, 230)
  .opacity(0)

// Displays Merry Christmas text
const merryChristmas = () => {
  merryChristmasText
    .animate(5000)
    .opacity(1)
}

// Polygon for a house
const house = [
  [0, 0],
  [0, 10],
  [5, 20],
  [10, 10],
  [10, 0],
  [0, 10],
  [10, 10],
  [0, 0],
  [10, 0]
]

// Create basic dropShadow
const dropShadow = canvas.filter()
const blur = dropShadow.gaussianBlur(1)
dropShadow.blend(dropShadow.source, blur)
dropShadow.move(-5, -5).size(11, 11)

// initial polygon for house
const houseTemplate = new SVG.Polyline().plot([
  [0, 0],
  [0, 0],
  [5, 0],
  [10, 0],
  [10, 0],
  [0, 0],
  [10, 0],
  [0, 0],
  [10, 0]
]).fill('none')

// Set x positions for houses
const xPositions = [250, 600, 370, 700, 450, 520, 640, 220, 300, 780, 400]
let numHouses = 0
// Function to spawn one house
const spawnHouse = () => {
  if (numHouses > 8) return merryChristmas()

  const x = xPositions[numHouses]
  const y = numHouses / 10 * 100 + 340
  const scale = (y - 300) / 200 * 10

  houseTemplate.clone().addTo(canvas).stroke({
    color: SVG.Color.random(),
    linejoin: 'round',
    linecap: 'round',
    width: 1
  }).transform({
    rotate: 180,
    scale: scale,
    origin: [0, Math.random() * 3],
    translate: [x, y]
  }).animate(new SVG.Spring(500, 20)).plot(house)

  SVG.Animator.timeout(spawnHouse, 300)
  numHouses++
}


// Creates a circle of random size and fades it in
const createStar = () => {
  const x = Math.random() * 1000
  const y = Math.random() * 250

  const size = Math.random() * 15
  canvas.circle({ r: size / 2 })
    .fill('yellow')
    .center(x, y)
    .opacity(0)
    .animate(2000)
    .opacity(1)
    .delay(500)
    // After fading in and delay
    // we twinkle the star away
    .after(function () {
      SVG.Animator.immediate(() => {
        twinkle(x, y, size)
        this.element().remove()
      })
    })
}

// Template for a star
const twinkleTemplate = new SVG.Polygon().plot([-12, 0, -2, 2, 0, 12, 2, 2, 12, 0, 2, -2, 0, -12, -2, -2])
  .fill('#f3eccf')
  .filterWith(dropShadow)

// Creates a polygon and animates its scale
// while fading out
const twinkle = (x, y, size) => {
  const clone = twinkleTemplate.clone()
    .addTo(canvas)
    .transform({
      scale: size / 10,
      origin: [0, 0],
      translate: [x, y]
    })

  clone.animate(1000)
    .during((pos) => { clone.transform({ scale: size / 10 + size / 3 * pos, origin: [0, 0], translate: [x, y] }) })
    .opacity(0)
    .after(function () {
      this.element().remove()
    })
}



// Give a bit time before starting the animation
SVG.Animator.timeout(() => {
  animateArc()
  spawnHouse()

  // Every 100ms we decide if we want to create
  // a new star and after which time
  setInterval(() => {
    if (Math.random() < 0.7) {
      SVG.Animator.timeout(() => {
        createStar()
      }, Math.random() * 1000)
    }
  }, 300)
}, 1000)