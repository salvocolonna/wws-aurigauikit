Chart.pluginService.register({
  beforeDraw: function(instance) {
    const centerConfig = instance.config.options.elements.center
    if (centerConfig) {
      /*	if (!instance.firstDraw) {
				instance.config.options.animation = {
					...instance.config.options.animation,
					onComplete() {
						if (!instance.firstDraw) {
							draw(instance, centerConfig)
							instance.firstDraw = true
						} else delete instance.config.options.animation.onComplete
					}
				}
			} else*/ draw(
        instance,
        centerConfig
      )
    }
  }
})

const draw = (instance, centerConfig) => {
  const helpers = Chart.helpers
  const centerX = (instance.chartArea.left + instance.chartArea.right) / 2
  const centerY = (instance.chartArea.top + instance.chartArea.bottom) / 2
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

  context.fillStyle = helpers.getValueOrDefault(
    centerConfig.color,
    Chart.defaults.global.defaultFontColor
  )
  context.textAlign = "center"
  context.textBaseline = "middle"
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

  context.fillText(centerConfig.text, centerX, centerY)
}
