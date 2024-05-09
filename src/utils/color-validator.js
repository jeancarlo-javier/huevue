export function validateHexColor (hexColor) {
  // Expresión regular que valida colores hexadecimales de 6 o 8 dígitos con o sin '#'
  const regex = /^#?([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/

  return regex.test(hexColor)
}
