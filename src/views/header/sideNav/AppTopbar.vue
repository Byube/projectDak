<template>
  <div class="layout-topbar">
    <!-- <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>JeffKim</span>
    </router-link>
    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      v-styleclass="{
        selector: '@next',
        enterClass: 'hidden',
        enterActiveClass: 'scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>
    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-calendar"></i>
          <span>Events</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-cog"></i>
          <span>Settings</span>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
          <span>Profile</span>
        </button>
      </li>
    </ul> -->

    <div class="w-2">
      <div class="flex align-items-center justify-content-start">
        <span>
          <router-link to="/">
            <p class="font-bold text-2xl">Blockchain Frontend</p>
          </router-link>
        </span>
        <span>
          <button
            class="p-link layout-menu-button layout-topbar-button"
            @click="onMenuToggle"
          >
            <i class="pi pi-bars"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="flex w-10 align-items-center justify-content-center">
      <div class="grid w-full">
        <div class="col-4">
          <ul
            class="text-lg font-bold text-black-alpha-80"
            v-if="menuOnClickNow"
          >
            <li>{{ menuOnClickNow }}</li>
          </ul>
        </div>
        <div class="col-8">
          <Dropdown
            :options="mainNetList"
            :modelValue="mainNetIdx"
            optionLabel="name"
            optionValue="code"
            class="
              w-4
              text-center
              justify-content-center
              align-items-center
              p-inputtext-lg
              text-black-alpha-80
              font-bold
            "
            panelClass="text-xl"
          >
          </Dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { themesToggle } from "@/common/toggleTheme.js";
// import { menuOnClick } from "@/common/sideNavService.js";
// import router from "@/router";
export default {
  setup() {
    const op = ref();
    const display1 = ref(false);
    const { emit } = getCurrentInstance();
    const { dark } = themesToggle();
    const onMenuToggle = (event) => {
      emit("menu-toggle", event);
    };
    const topbarImage = () => {
      return dark.value ? "images/logo-dark.svg" : "images/logo-light.svg";
    };

    //제거 소스
    const mainNetIdx = ref("1");
    const menuOnClickNow = ref("");
    const mainNetList = ref([
      {
        name: "Ropsten",
        code: "1",
      },
    ]);
    return {
      onMenuToggle,
      op,
      display1,
      topbarImage,
      mainNetList,
      mainNetIdx,
      menuOnClickNow,
    };
  },
};
</script>

<style scoped>
.p-button:enabled:active {
  background: rgba(63, 81, 181, 0.68);
  color: unset;
  border-color: transparent;
}
.p-button:enabled:hover {
  background: rgba(63, 81, 181, 0.92);
  color: unset;
  border-color: transparent;
}
</style>