const flags = []
process.argv.forEach((flag, i) => i > 1 && flags.push(flag))

export default (...names) => {
  const flag = flags.find(flag => {
    let found = false
    names.forEach(name => {
      const match = flag.split("--" + name).length > 1 || flag.split("-" + name).length > 1
      if (match) found = true
    })
    return found
  })
  if (flag) {
    let equalParts = flag.split("=")
    let spaceParts = flag.split(" ")
    if (equalParts.length > 1) return equalParts[1]
    if (spaceParts.length > 1) return spaceParts[1]
    return true
  }
  return false
}
