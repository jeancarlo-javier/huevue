<template>
  <div @click.stop="" class="slider-thumb-container" :style="thumbStyle">
    <div ref="parentRef" class="slider-thumb" :style="visualThumbDefaultStyle" />
  </div>
</template>

<script>
export default {
  props: ['thumbStyle', 'visualThumbDefaultStyle', 'parentRef'],
  mounted() {
    this.$emit('setThumbRef', this.$refs.parentRef)
  }
}
</script>

<style scoped>
.slider-thumb-container {
  position: absolute;
  pointer-events: none;
}
.slider-thumb {
  pointer-events: all;
  cursor: pointer;
  width: 16px;
  height: 16px;
  background: hsl(0deg 0% 100% / 100%);
  border-radius: 50%;
  transition:
    background 0.3s,
    box-shadow 0.3s;
  box-shadow:
    0 0 0 0px white,
    0px 1.5px 1.5px 0px rgb(0 0 0 / 30%);
}
.slider-thumb:hover {
  background: hsl(0deg 0% 100% / 40%);
  box-shadow:
    0 0 0 3px white,
    0px 1px 2.5px 3.5px rgb(0 0 0 / 20%);
  /* box-shadow: 0 0 0 3px white, 0px 1px 2.5px 3.5px rgb(0 0 0 / 20%); */
}
</style>
