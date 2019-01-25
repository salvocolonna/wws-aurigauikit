Chart.pluginService.register({
  afterDraw: function(instance) {
    const config = instance.config.options.elements.verticalLine
    if (config) {
      const {
        index,
        text,
        color = "red",
        textColor = "#000000",
        font = "Normal 15px Open Sans Light",
        overlayColor = "rgba(240, 240, 240, 0.2)"
      } = config

      const draw = DrawingContext(instance.chart, index)

      draw.rect(overlayColor)
      draw.line(color)
      draw.text(text, font, textColor)
    }
  }
})

const DrawingContext = (chart, index) => {
  const context = chart.ctx
  const xaxis = chart.scales["x-axis-0"]
  const yaxis = chart.scales["y-axis-0"]
  const position = xaxis.getPixelForTick(index)
  return {
    line: color => {
      context.beginPath()
      context.moveTo(position, chart.chartArea.top)
      context.strokeStyle = color
      context.lineTo(position, chart.chartArea.bottom)
      context.lineWidth = 1
      context.setLineDash([5, 15])
      context.stroke()
    },
    rect: color => {
      const gradient = context.createLinearGradient(0, 0, 800, 600)
      gradient.addColorStop(0, color)
      context.fillStyle = color
      context.fillRect(
        position,
        yaxis.top,
        xaxis.right - position,
        yaxis.bottom - yaxis.getPixelForTick(0)
      )
      context.save()
    },
    text: (text, font, color) => {
      context.font = font
      context.fillStyle = color
      context.fillText(
        text,
        position - context.measureText(text).width - 5,
        chart.chartArea.top + 5
      )
      context.restore()
    }
  }
}
