<template>
  <div class="layout-menu-container">
    <!-- <div class="flex flex-row rounded-t-none">
       <router-link to="/">
        <div class="mt-2 pt-2 flex flex-row">
          <p class="font-bold text-2xl mx-2">Blockchain Frontend</p>
        </div>
      </router-link> 
    </div> -->
    <AppSubmenu
      :items="model"
      class="layout-menu"
      :root="true"
      @menuitem-click="onMenuItemClick"
    />
  </div>
</template>

<script>
import AppSubmenu from "@/views/header/sideNav/AppSubmenu.vue";
import { getCurrentInstance } from "vue";
export default {
  props: {
    model: Array,
  },
  components: {
    AppSubmenu,
  },
  setup() {
    const { emit } = getCurrentInstance();
    const onMenuItemClick = (event) => {
      emit("menuitem-click", event);
    };
    return {
      onMenuItemClick,
    };
  },
  computed: {
    darkTheme() {
      return this.$appState.darkTheme;
    },
  },
};
</script>