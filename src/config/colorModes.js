const modes = [
  {
    id: 'hex',
    text: 'HEX',
    allowsTransparency: true,
    defaultValue: '#FF0000'
  },
  {
    id: 'hsl',
    text: 'HSL',
    allowsTransparency: true,
    transparencyText: 'HSLA',
    defaultValue: 'hsl(0deg 100% 50%)'
  },
  {
    id: 'rgb',
    text: 'RGB',
    allowsTransparency: true,
    transparencyText: 'RGBA',
    defaultValue: 'rgb(255, 0, 0)'
  }
]

export default modes
