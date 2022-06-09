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
              </p>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <!-- 3 -->
        <div class="flex h-6rem">
          <div class="flex w-1 align-items-center justify-content-start ml-5">
            <span class="text-xl text-black-alpha-80 font-bold">잔액(ETH)</span>
          </div>
          <div class="flex justify-content-start align-items-center w-4">
            <div v-if="isloading">
              <i class="pi pi-spin pi-spinner"></i>
            </div>
            <div v-else>
              <p
                class="text-xl text-black-alpha-60 font-medium"
                v-show="isVisible"
              >
                {{ balanceData }}
                <i
                  @click="onRefresh"
                  class="pi pi-sync cursor-pointer ml-3"
                  v-show="isVisible"
                ></i>
              </p>
            </div>
          </div>
        </div>
        <!-- 3 -->
      </div>
    </div>

    <!-- Update Owner -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <Accordion
          :activeIndex="0"
          expandIcon="pi-chevron-up"
          collapseIcon="pi-chevron-down"
          class="custom-accordion"
        >
          <AccordionTab>
            <template #header>
              <span class="text-xl text-black-alpha-80 font-bold">
                메인넷 코인 충전
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">충전 수량</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <NumberInput
                    :id="'coinCharg'"
                    :modelValue="ethAmount"
                    :placeholderInfo="'락업 적용할 수량 입력 (소수점 포함)'"
                    @update:modelValue="ethAmount = $event"
                  />
                </div>
                <div class="err-msg-style">
                  <span v-show="isAmount">
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
                  Owner 비공개키
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
                <Button label="충전" class="px-7" @click="coinCharg"></Button>
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
import { tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import { ref } from "@vue/reactivity";
import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";
import { ethers } from "ethers";
import constant from "@/common/constant.js";
import NumberInput from "@/components/input/NumberInput.vue";
export default {
  components: {
    TransactionTransfer,
    NumberInput,
  },
  setup() {
    // 기능 호출 및 사전 설정
    const { showDialog1, closeDialog1 } = dialogToggleAction();
    const contractSelected = ref("");
    const ownerAddress = ref("");
    const isloading = ref(false);
    const isVisible = ref(false);
    const isSeleted = ref(false);
    const isAmount = ref(false);
    const isPrivatekey = ref(false);
    const balanceData = ref();
    const ethAmount = ref("");
    const sendDatas = ref({});
    const errorMessage = ref("");

    const privateKey = ref("");

    const {
      getContractList,
      contractList,
      getMultiOwner,
      getBalanceMultiSend,
    } = tokenListData();
    getContractList(0);
    const getOwnerAddress = async () => {
      isloading.value = true;
      let response = await getMultiOwner(contractSelected.value);
      ownerAddress.value = response.data;
      getbalance();
    };
    const getbalance = async () => {
      let response = await getBalanceMultiSend(contractSelected.value);
      balanceData.value = await ethers.utils.formatEther(response.data);
      isloading.value = false;
      isVisible.value = true;
    };
    const onRefresh = () => {
      if (contractSelected.value !== "") {
        isVisible.value = false;
        isloading.value = true;
        getbalance();
      }
    };

    //충전
    const coinCharg = () => {
      if (contractSelected.value === "" || contractSelected.value === null) {
        isSeleted.value = true;
        isAmount.value = false;
        return;
      } else if (ethAmount.value === 0 || ethAmount.value === null) {
        isSeleted.value = false;
        isAmount.value = true;
        errorMessage.value = constant.errmsg.CHECKAMOUNT;
        return;
      } else if (
        privateKey.value.length !== 64 ||
        privateKey.value === "" ||
        privateKey.value === null
      ) {
        isSeleted.value = false;
        isAmount.value = false;
        isPrivatekey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        return;
      }

      sendDatas.value = {
        actionNm: "코인충전",
        ownerAddress: ownerAddress.value,
        contractAddress: contractSelected.value,
        ownerPrivateKey: privateKey.value,
        amount: ethAmount.value * 10 ** 18,
      };
      showDialog1("charge", sendDatas);
    };
    const closed = (state) => {
      closeDialog1();
      if (state.state) {
        console.log(state);
      }
    };
    return {
      contractList,
      contractSelected,
      getOwnerAddress,
      ownerAddress,
      isloading,
      isVisible,
      balanceData,
      onRefresh,
      privateKey,
      coinCharg,
      isSeleted,
      ethAmount,
      isAmount,
      isPrivatekey,
      closed,
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