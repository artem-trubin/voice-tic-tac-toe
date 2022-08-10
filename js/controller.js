export const getCoordsFromVoice = (voiceStr) => {
  const failedResult = [-1, -1];

  const parts = voiceStr.split(" ");
  if (parts.length !== 2) return failedResult

  const coords = parts.reduce((prev, curr) => {
    switch (curr) {
      case "first":
        return [...prev, 0]
      case "second":
        return [...prev, 1]
      case "third":
        return [...prev, 2]
      case "fourth":
        return [...prev, 3]
      case "fifth":
        return [...prev, 4]
      default:
        return failedResult
    }
  }, [])

  if (coords[0] === -1 || coords[1] === -1) return failedResult

  return coords
}
