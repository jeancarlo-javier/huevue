function suggestHexColor (input) {
  // Validates and cleans the input
  let cleanedInput = input.replace('#', '').toLowerCase()

  // Verify if the input is a valid entry
  if (!/^([0-9a-f]{1,6})$/i.test(cleanedInput)) {
    return null // Return null if the input is not a valid entry
  }

  // Complete the entry to 6 characters
  while (cleanedInput.length < 6) {
    cleanedInput += cleanedInput
  }
  cleanedInput = cleanedInput.substring(0, 6)

  // Generates possible colors
  const possibilities = []
  possibilities.push(`#${cleanedInput}`)

  if (cleanedInput.length === 1) {
    possibilities.push(`#${cleanedInput.repeat(6)}`)
  } else if (cleanedInput.length === 2) {
    possibilities.push(`#${cleanedInput.repeat(3)}`)
  } else if (cleanedInput.length === 3) {
    possibilities.push(`#${cleanedInput[0].repeat(2)}${cleanedInput[1].repeat(2)}${cleanedInput[2].repeat(2)}`)
  }

  // Return the best option
  return possibilities[0]
}

export default suggestHexColor
