import merge from 'lodash/merge'
import objectPath from 'object-path'
import yaml from 'js-yaml'

export default function(dev, prod = dev) {
  const expand = properties => {
    const expanded = {}
    const expand = property => objectPath.set(expanded, property, properties[property])
    Object.keys(properties).forEach(expand)
    return expanded
  }

  const fetchStaticProperties = async (path = dev) => {
    const fileType = path.includes('.yml') ? 'yaml' : 'properties'

    if (fileType === 'yaml') {
      const text = await fetch(path).then(j => j.text())
      const properties = yaml.safeLoad(text)
      return properties
    } else {
      const text = await fetch(path).then(j => j.text())
      const properties = text
        .split('\n')
        .map(line => line.replace(/#.*/, '').trim())
        .filter(Boolean)
        .reduce((properties, line) => {
          const [key, value] = line.split('=')
          return { ...properties, [key]: value }
        }, {})
      const applicationProperties = expand(properties)
      return applicationProperties
    }
  }

  const fetchStaticProd = async () => {
    const staticProperties = await fetchStaticProperties(dev)
    const staticProd = await fetchStaticProperties(prod)
    merge(staticProperties, staticProd)
    return staticProperties
  }

  const fetchProperties = async (contextPathMethod = 'standard') => {
    let contextPath = ''
    if (contextPathMethod === 'standard') {
      const staticProperties = await fetchStaticProd()
      contextPath = staticProperties.server.servlet['context-path']
    } else if (contextPathMethod === 'static') {
      const staticProperties = await fetchStaticProperties(prod)
      contextPath = staticProperties.server.servlet['context-path']
    } else if (contextPathMethod === 'dynamic') {
      contextPath = '/' + window.location.pathname.split('/')[1]
    }

    const endpoint = contextPath + '/env'
    const env = await fetch(endpoint).then(j => j.json())
    const fetchProperty = key => fetch(endpoint + '/' + key).then(j => j.json())
    const propertiesKeys = {}

    env.propertySources
      .filter(x => x.name.startsWith('applicationConfig'))
      .forEach(x => Object.keys(x.properties).forEach(key => (propertiesKeys[key] = true)))

    const values = await Promise.all(Object.keys(propertiesKeys).map(fetchProperty))

    const properties = values
      .map(x => x.property.value)
      .reduce((properties, p, i) => {
        properties[Object.keys(propertiesKeys)[i]] = p
        return properties
      }, {})

    const applicationProperties = expand(properties)
    return applicationProperties
  }

  return { fetchProperties, fetchStaticProperties }
}
