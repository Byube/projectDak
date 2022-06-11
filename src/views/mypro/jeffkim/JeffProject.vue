<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex align-items-center justify-content-center">
            <router-link to="/mypro/project/project1">
          <img :src="project(1)" alt="project1" />
          </router-link>
        </div>
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-center">
          <img :src="project(3)" alt="project1" />
        </div>
      </div>
    </div>
    <div class="col-12 md:col-6">
      <div class="card">
        <div class="flex align-items-center justify-content-center">
          <img :src="project(2)" alt="project1" />
        </div>
      </div>
      <div class="card">
        <div class="flex align-items-center justify-content-center">
          <img :src="project(4)" alt="project1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { themesToggle } from "@/common/toggleTheme.js";
export default {
  setup() {
    const { dark } = themesToggle();
    const project = (no) => {
      return dark.value
        ? `images/project/${no}_dark.png`
        : `images/project/${no}.png`;
    };
    return {
      project,
    };
  },
};
</script>

<style>
</style>