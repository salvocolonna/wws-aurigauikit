Chart.pluginService.register({
  beforeDraw: function(instance) {
    const centerConfig = instance.config.options.elements.center
    if (centerConfig) draw(instance, centerConfig)
  },
})

const draw = (instance, centerConfig) => {
  const helpers = Chart.helpers
  const centerX =
    (instance.chartArea.left + instance.chartArea.right) / 2 + (centerConfig.offsetX || 0)
  const centerY =
    (instance.chartArea.top + instance.chartArea.bottom) / 2 + (centerConfig.offsetY || 0)
  const context = instance.chart.ctx

  const fontStyle = helpers.getValueOrDefault(
    centerConfig.fontStyle,
    Chart.defaults.global.defaultFontStyle
  )

  const fontFamily = helpers.getValueOrDefault(
    centerConfig.fontFamily,
    Chart.defaults.global.defaultFontFamily
  )

  const fontSize = helpers.getValueOrDefault(
    centerConfig.fontSize,
    Chart.defaults.global.defaultFontSize
  )

  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.font = helpers.fontString(fontSize, fontStyle, fontFamily)

  if (centerConfig.fillPercentage) {
    const sidePadding = -(centerConfig.fillPercentage - 100)
    const sidePaddingCalculated = (sidePadding / 100) * instance.innerRadius * 2
    context.font = helpers.fontString(30, fontStyle, fontFamily)
    const stringWidth = context.measureText(centerConfig.text).width
    const elementWidth = instance.innerRadius * 2 - sidePaddingCalculated
    const widthRatio = elementWidth / stringWidth
    const newFontSize = Math.floor(30 * widthRatio)
    const elementHeight = instance.innerRadius * 2
    const fontSizeToUse = Math.min(newFontSize, elementHeight)
    context.font = helpers.fontString(fontSizeToUse, fontStyle, fontFamily)
  }

  if (
    centerConfig.shadow ||
    centerConfig.shadowColor ||
    centerConfig.shadowX ||
    centerConfig.shadowY
  ) {
    context.fillStyle = centerConfig.shadowColor || '#999999'
    context.globalAlpha = centerConfig.shadowOpacity || 0.5
    context.fillText(
      centerConfig.text,
      centerX + (centerConfig.shadowX || centerConfig.shadowX === 0 ? centerConfig.shadowX : 1),
      centerY + (centerConfig.shadowY || centerConfig.shadowY === 0 ? centerConfig.shadowY : 1)
    )
  }

  context.globalAlpha = centerConfig.opacity || 1

  context.fillStyle = helpers.getValueOrDefault(
    centerConfig.color,
    Chart.defaults.global.defaultFontColor
  )

  context.fillText(centerConfig.text, centerX, centerY)
}
