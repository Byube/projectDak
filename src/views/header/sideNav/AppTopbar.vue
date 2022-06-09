<template>
  <div class="layout-topbar">
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
            @change="changeMainNet(mainNetList, $event)"
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
    <!-- <button
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
    </button> -->

    <!-- top admin -->
    <!-- <ul class="layout-topbar-menu hidden lg:flex origin-top items-center">
      <Button
        label="Secondary"
        type="button"
        @click="toggleMyData"
        class="p-button-secondary font-bold text-2xl p-button-text mr-2 mb-2"
      >
        admin
        <i class="pi pi-angle-down pl-1" style="font-size: 1.3rem"></i>
      </Button>
      <OverlayPanel
        ref="op"
        appendTo="body"
        :dismissable="true"
        :showCloseIcon="true"
        id="overlay_panel"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '170px' }"
      >
        <Button
          type="button"
          label="비밀번호 변경"
          @click="changPwd"
          class="
            p-button-secondary p-button-text
            rounded-none
            w-full
            text-center
            px-3
            mt-2
          "
        />
        <Button
          type="button"
          label="로그아웃"
          @click="onLogout"
          class="
            p-button-text p-button-plain
            rounded-none
            w-full
            text-center
            px-3
            my-2
            font-bold
          "
        />
      </OverlayPanel>

      <Dialog
        header="비밀번호 변경"
        v-model:visible="display1"
        :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
        :style="{ width: '20vw', hight: '100vw' }"
        :modal="true"
        class="text-center"
        :dismissableMask="true"
      >
        <template #header>
          <div class="font-bold text-2xl pt-2">비밀번호 변경</div>
        </template>
        <div class="p-inputgroup mb-3">
          <InputText class="basis-full" placeholder="기존 비밀번호" />
        </div>
        <div class="p-inputgroup mb-3">
          <InputText class="basis-full" placeholder="신규 비밀번호" />
        </div>
        <div class="p-inputgroup">
          <InputText class="basis-full" placeholder="비밀번호 확인" />
        </div>
        <template #footer>
          <Button
            type="button"
            label="취소"
            @click="cancel"
            class="bg-indigolight mr-2"
          />
          <Button
            type="button"
            label="수정"
            class="bg-indigolight mr-0"
            @click="changePwd"
          />
        </template>
      </Dialog>
    </ul> -->
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, ref } from "vue";
import constant from "@/common/constant.js";
import { saveMenuList, menuOnClick } from "@/common/sideNavService.js";
import { mainNetData } from "@/common/getDataList.js";
import router from "@/router";
export default {
  setup() {
    const op = ref();
    const display1 = ref(false);
    const { getMenuList } = saveMenuList();

    onBeforeMount(() => {
      getMenuList(mainNetIdx.value);
    });
    //메인넷 변경
    const changeMainNet = async (mlist, e) => {
      let mainNm;
      for (let i = 0; i < mlist.length; i++) {
        if (mlist[i].code === e.value) {
          mainNm = mlist[i].id;
        }
      }
      resetStorage();
      await getMenuList(e.value);
      // changeMainNetIdx(String(e.value));
      await changeMainNetIdx(e.value);
      await changeMainNetName(mainNm);
      window.location.reload();
    };
    const {
      mainNetList,
      getMainNetList,
      mainNetIdx,
      changeMainNetIdx,
      changeMainNetName,
    } = mainNetData();
    getMainNetList();

    const { menuOnClickNow } = menuOnClick();
    const resetStorage = () => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    };

    const { emit } = getCurrentInstance();
    const onMenuToggle = (event) => {
      emit("menu-toggle", event);
    };

    //admin 정보 관련
    const toggleMyData = (event) => {
      op.value.toggle(event);
    };
    const changPwd = () => {};
    const onLogout = () => {
      resetStorage();
      router.push({ path: constant.url.LOGOUT });
    };
    return {
      onMenuToggle,
      mainNetList,
      mainNetIdx,
      changeMainNet,
      toggleMyData,
      changPwd,
      onLogout,
      op,
      display1,
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