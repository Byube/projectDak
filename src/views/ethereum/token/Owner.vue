<template>
  <div>
    <!-- Token And Owner -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">토큰</span>
          </div>
          <div
            class="
              flex
              justify-content-center
              align-items-center
              w-4
              font-medium
              text-black-alpha-60
            "
          >
            <Dropdown
              v-model="tokenSelect"
              :options="tokenList"
              @change="getOwnerAddress"
              optionLabel="name"
              optionValue="code"
              placeholder="선택하세요"
              class="
                flex-1 flex
                w-3
                border-round
                text-blockchain
                font-medium
                text-black-alpha-60
              "
              :class="[{ 'p-invalid': isSeleted }]"
            />
          </div>
        </div>
        <!-- <Message v-show="isNoToken" severity="error">
          {{ errorMessage }}
        </Message> -->
        <!-- 1 -->
        <!-- 2 -->
        <div class="flex h-6rem">
          <div
            class="
              flex-initial flex
              w-1
              align-items-center
              justify-content-start
              ml-5
              h-6rem
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">Owner</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              py-1
            "
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium" v-else>
              {{ ownerAddress }}
              <i
                @click="onRefresh"
                class="pi pi-sync cursor-pointer ml-3"
                v-if="isVisible"
              />
            </p>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>
    <!-- Token And Owner -->

    <!-- Update Owner -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <Accordion
          expandIcon="pi-chevron-up"
          collapseIcon="pi-chevron-down"
          class="custom-accordion"
        >
          <AccordionTab>
            <template #header>
              <span class="text-xl text-black-alpha-80 font-bold">
                Owner 변경
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">변경할 주소</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <InputText
                    v-model="address"
                    class="w-full"
                    :class="[{ 'p-invalid': isAddress }]"
                    placeholder="Owner 권한을 인계받을 주소 입력"
                  >
                  </InputText>
                  <!-- <Message v-show="isAddressError" severity="error">
                    {{ errorMessage }}
                  </Message> -->
                </div>
              </div>
              <!-- 1 -->
              <!-- 2 -->
              <div
                class="field align-items-start justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  현재 Owner 비공개키
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <Password
                    v-model="privateKey"
                    class="w-full"
                    :class="[{ 'p-invalid': isPrivatekey }]"
                    :feedback="false"
                    placeholder="비공개키 입력할때는 보안에 주의하세요"
                    inputStyle="width: 100%"
                    toggleMask
                  >
                  </Password>
                  <!-- <Message v-show="isPrivatekeyError" severity="error">
                    {{ errorMessage }}
                  </Message> -->
                </div>
              </div>
              <!-- 2 -->
              <!-- 3 -->
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-center
                  m-2
                  px-5
                  py-3
                "
              >
                <Button label="변경" class="px-7" @click="onSubmit"></Button>
              </div>
              <!-- 3 -->
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Update Owner -->
    <Toast />
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>

<script>
import { ref } from "vue";

import { useToast } from "primevue/usetoast";
import { ethers } from "ethers";

//import constant from "@/common/constant.js";
import { tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";

import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";

export default {
  components: {
    TransactionTransfer,
  },

  setup() {
    // 기능 호출 및 사전 설정
    const toast = useToast();
    const { showDialog1, closeDialog1 } = dialogToggleAction();

    // 토큰 및 Owner 정보 불러오기
    const isSeleted = ref(false);
    const isNoToken = ref(false);
    const tokenSelect = ref("");
    const selectedToken = ref("");
    const response = ref(null);
    const isloading = ref(false);
    const isVisible = ref(false);
    const { tokenList, getTokenList, getOwnerAdd, ownerAddress, getTokenInfo } =
      tokenListData();
    //토큰 리스트 호출
    getTokenList(1);
    const getOwnerAddress = async () => {
      isSeleted.value = false;
      isloading.value = true;
      await getOwnerAdd(tokenSelect.value);
      response.value = await getTokenInfo(tokenSelect.value);
      selectedToken.value = response.value.data.name;
      setTimeout(() => {
        isloading.value = false;
      }, 500);
      isVisible.value = true;
    };
    const onRefresh = async () => {
      if (ownerAddress.value !== "") {
        isloading.value = true;
        await getOwnerAdd(tokenSelect.value);
        response.value = await getTokenInfo(tokenSelect.value);
        selectedToken.value = response.value.data.name;
        setTimeout(() => {
          isloading.value = false;
        }, 500);
        isVisible.value = true;
      } else {
        toast.add({
          severity: "error",
          summary: "응답 오류!",
          detail: "불러올 수 없습니다",
          life: 2000,
        });
      }
    };

    // Owner 변경
    const address = ref("");
    //const isAddressError = ref(false);
    const isAddress = ref(false);
    const privateKey = ref("");
    //const isPrivatekeyError = ref(false);
    const isPrivatekey = ref(false);
    //const errorMessage = ref("");
    const sendDatas = ref({});
    const onSubmit = () => {
      if (tokenSelect.value === "") {
        isSeleted.value = true;
        //errorMessage.value = constant.errmsg.NOTOKEN;
        //toggleErrMsg(2);
        window.scrollTo(0, 0);
        return;
      } else if (
        !ethers.utils.isAddress(address.value) ||
        address.value === ""
      ) {
        isPrivatekey.value = false;
        //errorMessage.value = constant.errmsg.CHECKCONTRACT;
        isAddress.value = true;
        //toggleErrMsg(0);
        return;
      } else if (privateKey.value.length !== 64 || privateKey.value === "") {
        isAddress.value = false;
        //errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        isPrivatekey.value = true;
        //toggleErrMsg(1);
        return;
      } else {
        isAddress.value = false;
        isPrivatekey.value = false;
        sendDatas.value = {
          tokenName: selectedToken.value,
          updateOwnerAddress: address.value,
          ownerPrivateKey: privateKey.value,
          contractAddress: tokenSelect.value,
        };
        console.log("sendDatas.value: ", sendDatas.value);
        showDialog1("Owner", sendDatas);
        resetAll();
      }
    };

    // 2초간 에러 메세지 보여주기
    // const showErrorTime = 2000;
    // const toggleErrMsg = (which) => {
    //   if (which === 0) {
    //     isAddressError.value = true;
    //     setTimeout(() => {
    //       isAddressError.value = false;
    //     }, showErrorTime);
    //   } else if (which === 1) {
    //     isPrivatekeyError.value = true;
    //     setTimeout(() => {
    //       isPrivatekeyError.value = false;
    //     }, showErrorTime);
    //   } else if (which === 2) {
    //     isNoToken.value = true;
    //     window.scrollTo(0, 0);
    //     setTimeout(() => {
    //       isNoToken.value = false;
    //     }, showErrorTime);
    //   }
    // };

    // 트랜잭션 모달 처리
    const closed = (status) => {
      closeDialog1();
      console.log(status);
      if (status.state) {
        resetAll();
      }
    };

    // 입력사항 클리어
    const resetAll = () => {
      isSeleted.value = false;
      address.value = "";
      isAddress.value === "";
      privateKey.value = "";
      isPrivatekey.value = false;
    };

    return {
      closed,
      isSeleted,
      isNoToken,
      tokenList,
      tokenSelect,
      isloading,
      isVisible,
      ownerAddress,
      getOwnerAddress,
      onRefresh,
      address,
      //isAddressError,
      isAddress,
      privateKey,
      //isPrivatekeyError,
      isPrivatekey,
      //errorMessage,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.inputwrapper-max-width {
  max-width: 850px;
}
.custom-accordion::v-deep(.p-accordion-toggle-icon) {
  right: 1%;
  position: absolute;
}
</style>