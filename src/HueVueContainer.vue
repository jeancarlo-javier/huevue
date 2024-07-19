<template>
  <HueVue :value="color" :mode="mode" />
</template>

<script setup>
import HueVue from './HueVue.vue'
import { ref } from 'vue'

const color = ref('#7DF011')

const mode = ref('hex')
</script>
