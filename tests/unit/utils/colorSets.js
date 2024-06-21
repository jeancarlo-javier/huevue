export const validRgbColors = [
  'rgba(0,0,255,0.5)',
  'rgb(255 0 0 / 39%)',
  'rgb(255,0,0)',
  'rgba(255,0,0,1)',
  'rgb(0,255,0)',
  'rgba(0,255,0,1)',
  'rgb(0,0,255)',
  'rgba(0,0,255,1)',
  'rgb(255,255,255)',
  'rgba(255,255,255,1)',
  'rgb(0,0,0)',
  'rgba(0,0,0,1)',
  'rgb(255,255,0)',
  'rgba(255,255,0,1)',
  'rgb(0,255,255)',
  'rgba(0,255,255,1)',
  'rgb(255,0,255)',
  'rgba(255,0,255,1)',
  'rgb(128,128,128)',
  'rgba(128,128,128,1)',
  'rgba(255,0,0,0.5)',
  'rgba(0,255,0,0.5)',
  'rgb(255 0 0 / 39)',
  'rgba(0,0,0,10)',
  'rgba(256,0,0,1.5)',
  'rgba(0,0,256,2)',
  'rgb(255,255,255,2)',
  'rgba(255,255,255,1.2)',
  'rgb(0,0,0,0)',
  'rgba(0,0,0)',
  'rgb(255,255,255,255)',
  'rgba(255,255,255,255)'
]

export const invalidRgbColors = [
  'rgba(0,0,0,-10)',
  'rgba(0,256,0,-1)',
  'rgb(-10,255,0)',
  'rgba(255,-10,0,1)',
  'rgba(0,0,0,1,1)',
  'rgb(0,0)',
  'rgb(a,b,c)',
  'rgba(a,b,c,d)',
  'rgb(0,0,0',
  'rgba(0,0,0,-10)',
  'rgba(0,256,0,-1)',
  'rgb(-10,255,0)'
]

export const validHslColors = [
  'hsl(0, 100%, 50%)',
  'hsl(30, 100%, 50%)',
  'hsl(60, 100%, 50%)',
  'hsl(120, 100%, 50%)',
  'hsl(180, 100%, 50%)',
  'hsl(240, 100%, 50%)',
  'hsl(300, 100%, 50%)',
  'hsl(360, 100%, 50%)',
  'hsl(0, 0%, 100%)',
  'hsl(0, 0%, 0%)',
  'hsl(0, 0%, 50%)',
  'hsl(240, 100%, 75%)',
  'hsl(120, 60%, 70%)',
  'hsl(60, 100%, 75%)',
  'hsl(300, 60%, 70%)',
  'hsl(0, 100%, 25%)',
  'hsl(30, 100%, 25%)',
  'hsl(60, 100%, 25%)',
  'hsl(120, 100%, 25%)',
  'hsl(180, 100%, 25%)',
  'hsl(240, 100%, 25%)',
  'hsl(300, 100%, 25%)',
  'hsl(200 40% 80%)',
  'hsl(120, 100%, 50%, 1)'
]

export const invalidHslColors = [
  'hsl(-50, 100%, 50%)',
  'hsl(240, -20%, 50%)',
  'hsl(180, 100%, -10%)',
  'hsl(120, 100%)',
  'hsl(120, 100, 50%)',
  'hsl(120, 100%, 50)',
  'hsl(100%, 50%, 50%)',
  'rgb(120, 100%, 50%)',
  'hsl(120, 100, 50)',
  'hsl(120deg 100 50)',
  'hsl()',
  'hsl(120)',
  'hsla(120, 100%, 50%)',
  'hsl(120, 150%, 50%)',
  'hsl(60, 100%, 120%)',
  'hsl(400, 100%, 50%)'
]

export const validHexColors = [
  '#FF5733', // Red-Orange
  '#33FF57', // Green
  '#3357FF', // Blue
  '#FF33A1', // Pink
  '#33FFF5', // Aqua
  '#F5FF33', // Yellow
  '#FF5733', // Coral
  '#5733FF', // Violet
  '#33FF83', // Light Green
  '#FF3380', // Deep Pink
  '#33FFAC', // Spring Green
  '#3380FF', // Sky Blue
  '#FFA733', // Orange
  '#A733FF', // Purple
  '#FF33C1', // Magenta
  '#33FFC1', // Turquoise
  '#FFC133', // Gold
  '#C133FF', // Plum
  '#FF33E0', // Fuchsia
  '#33FFE0' // Aquamarine
]

export const invalidHexColors = [
  '#GG5733', // Invalid Hex character
  '#33FF5Z', // Invalid Hex character
  '#3357FG', // Invalid Hex character
  'FF33A1', // Missing #
  '#33FF', // Incomplete Hex code
  '#FF57339', // Too many characters
  '#F5FF33G', // Invalid Hex character
  '5733FF', // Missing #
  '#33FG83', // Invalid Hex character
  '#FF338', // Incomplete Hex code
  '#33FFFG', // Invalid Hex character
  '#3380FFG', // Too many characters
  '#FFA7G3', // Invalid Hex character
  'A733FF', // Missing #
  '#FF33', // Incomplete Hex code
  '#33FFC1G', // Too many characters
  '#FF33E', // Incomplete Hex code
  '33FFE0', // Missing #
  '#33FFZ0', // Invalid Hex character
  '#FF573' // Incomplete Hex code
]

export const rgbStringMap = {
  'rgba(0,0,255,0.5)': { r: 0, g: 0, b: 255, a: 0.5 },
  'rgb(255 0 0 / 39%)': { r: 255, g: 0, b: 0, a: 0.39 },
  'rgb(255,0,0)': { r: 255, g: 0, b: 0, a: 1 },
  'rgba(255,0,0,1)': { r: 255, g: 0, b: 0, a: 1 },
  'rgb(0,255,0)': { r: 0, g: 255, b: 0, a: 1 },
  'rgba(0,255,0,1)': { r: 0, g: 255, b: 0, a: 1 },
  'rgb(0,0,255)': { r: 0, g: 0, b: 255, a: 1 },
  'rgba(0,0,255,1)': { r: 0, g: 0, b: 255, a: 1 },
  'rgb(255,255,255)': { r: 255, g: 255, b: 255, a: 1 },
  'rgba(255,255,255,1)': { r: 255, g: 255, b: 255, a: 1 },
  'rgb(0,0,0)': { r: 0, g: 0, b: 0, a: 1 },
  'rgba(0,0,0,1)': { r: 0, g: 0, b: 0, a: 1 },
  'rgb(255,255,0)': { r: 255, g: 255, b: 0, a: 1 },
  'rgba(255,255,0,1)': { r: 255, g: 255, b: 0, a: 1 },
  'rgb(0,255,255)': { r: 0, g: 255, b: 255, a: 1 },
  'rgba(0,255,255,1)': { r: 0, g: 255, b: 255, a: 1 },
  'rgb(255,0,255)': { r: 255, g: 0, b: 255, a: 1 },
  'rgba(255,0,255,1)': { r: 255, g: 0, b: 255, a: 1 },
  'rgb(128,128,128)': { r: 128, g: 128, b: 128, a: 1 },
  'rgba(128,128,128,1)': { r: 128, g: 128, b: 128, a: 1 },
  'rgba(255,0,0,0.5)': { r: 255, g: 0, b: 0, a: 0.5 },
  'rgba(0,255,0,0.5)': { r: 0, g: 255, b: 0, a: 0.5 },
  'rgba(0,0,0,0)': { r: 0, g: 0, b: 0, a: 0 }
}

export const hslStringMap = {
  'hsl(0, 100%, 50%)': { h: 0, s: 100, l: 50 },
  'hsl(30, 100%, 50%)': { h: 30, s: 100, l: 50 },
  'hsl(60, 100%, 50%)': { h: 60, s: 100, l: 50 },
  'hsl(120, 100%, 50%)': { h: 120, s: 100, l: 50 },
  'hsl(180, 100%, 50%)': { h: 180, s: 100, l: 50 },
  'hsl(240, 100%, 50%)': { h: 240, s: 100, l: 50 },
  'hsl(300, 100%, 50%)': { h: 300, s: 100, l: 50 },
  'hsl(360, 100%, 50%)': { h: 360, s: 100, l: 50 },
  'hsl(0, 0%, 100%)': { h: 0, s: 0, l: 100 },
  'hsl(0, 0%, 0%)': { h: 0, s: 0, l: 0 },
  'hsl(0, 0%, 50%)': { h: 0, s: 0, l: 50 },
  'hsl(240, 100%, 75%)': { h: 240, s: 100, l: 75 },
  'hsl(120, 60%, 70%)': { h: 120, s: 60, l: 70 },
  'hsl(60, 100%, 75%)': { h: 60, s: 100, l: 75 },
  'hsl(300, 60%, 70%)': { h: 300, s: 60, l: 70 },
  'hsl(0, 100%, 25%)': { h: 0, s: 100, l: 25 },
  'hsl(30, 100%, 25%)': { h: 30, s: 100, l: 25 },
  'hsl(60, 100%, 25%)': { h: 60, s: 100, l: 25 },
  'hsl(120, 100%, 25%)': { h: 120, s: 100, l: 25 },
  'hsl(180, 100%, 25%)': { h: 180, s: 100, l: 25 },
  'hsl(240, 100%, 25%)': { h: 240, s: 100, l: 25 },
  'hsl(300, 100%, 25%)': { h: 300, s: 100, l: 25 },
  'hsl(200 40% 80%)': { h: 200, s: 40, l: 80 },
  'hsl(120, 100%, 50%, 1)': { h: 120, s: 100, l: 50 },
  'hsla(120, 100%, 50%)': null,
  'hsl(0deg 100% 50%)': { h: 0, s: 100, l: 50 },
  'hsl(120deg 100% 50% / 42%)': { h: 120, s: 100, l: 50 }
}