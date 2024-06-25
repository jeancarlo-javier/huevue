export const rgbRegex =
  /^rgba?\(\s*(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})\s*(?:,\s*|\s+)(\d{1,3})(?:\s*\/\s*([\d.]+%?)|\s*,\s*([\d.]+%?))?\s*\)$/

export const hslRegex = /^hsl\(\s*(\d+)(deg)?\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*(\d+(?:\.\d+)?))?\s*\)$/i
export const hslPatternSpaceSeparated =
  /^hsl\(\s*(\d+)(deg)?\s+\s*(\d+)%\s+\s*(\d+)%\s*(?:\/\s*(\d+(?:\.\d+)?%?))?\s*\)$/i
export const hslaPattern = /^hsla\(\s*(\d+)(deg)?\s*,\s*(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+(?:\.\d+)?)\s*\)$/i
