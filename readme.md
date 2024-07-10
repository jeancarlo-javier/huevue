# HueVue

<img width="546" alt="HueVue Preview Img" src="https://github.com/jeancarlo-javier/huevue/assets/55925131/dce6519c-7606-4e87-b809-d62d9700d0ab">

HueVue is a color picker library developed with Vue.js. It provides an intuitive and customizable interface for users to select colors in web applications.

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
    <HueVue :mode="mode" :value="color" @input="(value) => color = value" />
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
