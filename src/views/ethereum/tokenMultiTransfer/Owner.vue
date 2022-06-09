<template>
  <div>
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">계약</span>
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
              v-model="contractSelected"
              :options="contractList"
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
        <!-- 1 -->
        <!-- 2 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">Owner</span>
          </div>
          <div class="flex justify-content-start align-items-center w-4">
            <div v-if="isloading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <p class="text-xl text-black-alpha-60 font-medium">
                {{ ownerAddress }}
                <i
                  @click="onRefresh"
                  class="pi pi-sync cursor-pointer ml-3"
                  v-show="isVisible"
                ></i>
              </p>
            </div>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>

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
                </div>
                <div class="err-msg-style">
                  <span v-show="isAddress">
                    {{ errorMessage }}
                  </span>
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
                </div>
                <div class="err-msg-style">
                  <span v-show="isPrivatekey">
                    {{ errorMessage }}
                  </span>
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
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>
<script>
import { ref } from "vue";
import { ethers } from "ethers";
import constant from "@/common/constant.js";
import { tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";

import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";

export default {
  components: {
    TransactionTransfer,
  },

  setup() {
    // 기능 호출 및 사전 설정
    const { showDialog1, closeDialog1 } = dialogToggleAction();

    // 토큰 및 Owner 정보 불러오기
    const isSeleted = ref(false);
    const isNoToken = ref(false);
    const contractSelected = ref("");
    const response = ref(null);
    const isloading = ref(false);
    const isVisible = ref(false);
    const ownerAddress = ref("");
    const errorMessage = ref("");
    const { getMultitransferOwner,getContractList, contractList } = tokenListData();
    //토큰 리스트 호출
    getContractList(1);
    const getOwnerAddress = async () => {
      isSeleted.value = false;
      isloading.value = true;
      isVisible.value = false;
      response.value = await getMultitransferOwner(contractSelected.value);
      ownerAddress.value = response.value.data;
      isloading.value = false;
      isVisible.value = true;
    };
    const onRefresh = async () => {
      if (ownerAddress.value !== "" || contractSelected.value !== "") {
        getOwnerAddress();
      }
    };

    // Owner 변경
    const address = ref("");
    const isAddress = ref(false);
    const privateKey = ref("");
    const isPrivatekey = ref(false);
    const sendDatas = ref({});
    const onSubmit = () => {
      if (contractSelected.value === "") {
        isSeleted.value = true;
        window.scrollTo(0, 0);
        return;
      } else if (
        !ethers.utils.isAddress(address.value) ||
        address.value === ""
      ) {
        isPrivatekey.value = false;
        isAddress.value = true;
        errorMessage.value = constant.errmsg.CHECKOWNER;
        return;
      } else if (privateKey.value.length !== 64 || privateKey.value === "") {
        isAddress.value = false;
        isPrivatekey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        return;
      } else {
        isAddress.value = false;
        isPrivatekey.value = false;
        sendDatas.value = {
          actionNm: constant.dialog.MULTITRANSFEROWNER,
          updateOwnerAddress: address.value,
          ownerPrivateKey: privateKey.value,
          contactAddress: contractSelected.value,
        };
        showDialog1("transferOwnership", sendDatas);
        resetAll();
      }
    };

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
      // address.value = "";
      // isAddress.value === "";
      // privateKey.value = "";
      isPrivatekey.value = false;
    };

    return {
      closed,
      isSeleted,
      isNoToken,
      contractSelected,
      isloading,
      isVisible,
      ownerAddress,
      getOwnerAddress,
      onRefresh,
      address,
      isAddress,
      privateKey,
      isPrivatekey,
      onSubmit,
      contractList,
      errorMessage,
    };
  },
};
</script>


<style>
</style>

<style scoped>
/* .inputwrapper-max-width {
  max-width: 850px;
} */
.custom-accordion::v-deep(.p-accordion-toggle-icon) {
  right: 1%;
  position: absolute;
}
</style>