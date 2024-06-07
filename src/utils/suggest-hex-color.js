function suggestHexColor (input) {
  if (typeof input !== 'string') {
    return null
  }

  // Remove '#' if present and convert to lowercase
  let cleanedInput = input.replace('#', '').toLowerCase()

  // Validate the input using a regular expression
  if (!/^[0-9a-f]{1,6}$/i.test(cleanedInput)) {
    return null
  }

  // Normalize to 6 characters
  if (cleanedInput.length < 6) {
    cleanedInput = cleanedInput.padEnd(6, cleanedInput)
  }

  cleanedInput = cleanedInput.substring(0, 6)

  // Generate possible colors based on input length
  const possibilities = [`#${cleanedInput}`]
  switch (cleanedInput.length) {
    case 1:
      possibilities.push(`#${cleanedInput.repeat(6)}`)
      break
    case 2:
      possibilities.push(`#${cleanedInput.repeat(3)}`)
      break
    case 3:
      possibilities.push(`#${cleanedInput[0].repeat(2)}${cleanedInput[1].repeat(2)}${cleanedInput[2].repeat(2)}`)
      break
  }

  // Return the most likely color
  return possibilities[0]
}

export default suggestHexColor
