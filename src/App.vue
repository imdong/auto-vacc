<template>
  <div :id="s.app">
    <el-button
      v-if="showBtnBack"
      :class="s['btn--back']"
      size="mini"
      icon="el-icon-back"
      circle
      @click="$router.back()" />
    <router-view />

    <!-- <el-button type="primary" @click="$router.push({ name: 'home' })">回首页</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    showBtnBack() {
      return this.$route?.meta?.showBackBtn
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" module="s">
#app {
  position: relative;

  .btn--back {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
