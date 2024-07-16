# HueVue Color Picker

HueVue is a color picker library developed with Vue.js. It provides an intuitive and customizable interface for users to select colors in web applications.

<img width="456" alt="Captura de pantalla 2024-07-16 a la(s) 3 27 11 a  m" src="https://github.com/user-attachments/assets/a97cd763-a484-4c17-8cb2-d36abe774f73">

## Features

- Intuitive design for easy use.
- Quick editing commands through input fields.
- Color selection in various formats (HSL, RGB, HEX), including transparency.
- Customizable color palette.
- Easy integration into Vue.js projects.
- Support for light and dark themes.
- Fully accessible and compatible with modern browsers.

## Installation

You can install HueVue using npm or yarn:

```bash
# using npm
npm install huevue

# using yarn
yarn add huevue
```

## Usage

First, import HueVue and its CSS file in your project:

```javascript
import HueVue from 'huevue'
```

Then, you can use the HueVue component in your Vue template as follows:

```html
<template>
  <div id="app">
    <HueVue
      :mode="mode"
      :value="color"
      @input="(value) => color = value"
    />
  </div>
</template>

<script>
  import HueVue from 'huevue'

  export default {
    name: 'App',
    components: {
      HueVue
    },
    data() {
      return {
        mode: 'hex', // or 'rgb', 'hsl'
        color: '#ff0000'
      }
    }
  }
</script>
```

## Links

- [npm page](https://www.npmjs.com/package/huevue)
- [GitHub repository](https://github.com/jeancarlo-javier/huevue)
