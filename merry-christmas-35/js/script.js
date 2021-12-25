$('text').each(function() {
  const el = $(this)
  const text = el.html().split('')
  el.html(`<tspan>${text.join('</tspan><tspan>')}</tspan>`)
})
