<template>
  <!-- <AppTopbar @menu-toggle="onMenuToggle" /> -->
  <div class="layout-main">
    <router-view />
  </div>
</template>

<script>
// import AppTopbar from "@/views/header/sideNav/AppTopbar.vue";
// import { activeClassName } from "@/common/sideNavService";
export default {
  components: {
    // AppTopbar,
  },
  setup() {
    // const {
    //   changeMobileMenuState,
    //   changeStaticMenuInactive,
    //   layoutMode,
    //   mobileMenuActive,
    //   changeOverlayMenuState,
    //   changeOverMenuState,
    //   changeMobileState,
    //   changeMenuOnclick,
    // } = activeClassName();
    //메뉴바 숨김 기능
    // const onMenuToggle = (event) => {
    //   changeMenuOnclick(true);
    //   if (window.innerWidth >= 992) {
    //     if (layoutMode.value === "overlay") {
    //       if (mobileMenuActive.value === true) {
    //         changeOverMenuState(true);
    //       }
    //       changeOverlayMenuState();
    //       changeMobileState(false);
    //     } else if (layoutMode.value === "static") {
    //       changeStaticMenuInactive();
    //     }
    //   } else {
    //     changeMobileMenuState();
    //   }
    //   event.preventDefault();
    // };
    return {
      // onMenuToggle,
    };
  },
};
</script>

<style>
</style>