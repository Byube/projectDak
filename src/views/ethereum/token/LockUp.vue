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
            "
          >
            <p class="text-xl text-black-alpha-80 font-bold">Owner</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-start
              m-2
              px-3
              py-1
            "
            :class="[{ 'border-1': isNotOwner }]"
          >
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium" v-else>
              {{ ownerAddress }}
            </p>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>
    <!-- Token And Owner -->

    <!-- Watch Lock -->
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
                Lock 조회
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div
                class="
                  field
                  align-items-center
                  justify-content-start
                  ml-2
                  py-3
                  h-9rem
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">주소</p>
                <div
                  class="
                    font-medium
                    text-black-alpha-60
                    mt-5
                    inputwrapper-max-width
                  "
                >
                  <InputText
                    v-model="lockUpAddress"
                    placeholder="Lock Up 조회할 주소 입력"
                    :class="[{ 'p-invalid': islockUpAddressError }]"
                    class="
                      w-full
                      flex-1 flex
                      border-round
                      text-blockchain
                      font-medium
                      text-black-alpha-60
                    "
                  />
                </div>
                <div class="err-msg-style">
                  <span v-show="islockUpAddressError">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
              <!-- 1 -->
              <!-- 2 -->
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  py-2
                "
              >
                <Button
                  @click="selectLockup"
                  label="조회"
                  class="px-7"
                ></Button>
              </div>
              <!-- 2 -->
            </div>
            <!-- 3 -->
            <div class="flex h-6rem">
              <div
                class="
                  flex-initial flex
                  w-1
                  align-items-center
                  justify-content-start
                  ml-5
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">잔액</p>
              </div>
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  px-3
                  py-1
                  border-round
                "
              >
                <i
                  class="pi pi-spin pi-spinner"
                  v-if="isSeletedLockUploading"
                />
                <p class="text-xl text-black-alpha-60 font-medium">
                  {{ formatDigits(tokenBalance) }}
                </p>
              </div>
              <div
                class="
                  flex-initial flex
                  w-3
                  align-items-center
                  justify-content-start
                  pl-8
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">락업 수량</p>
              </div>
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  px-3
                  py-1
                  border-round
                "
              >
                <i
                  class="pi pi-spin pi-spinner"
                  v-if="isSeletedLockUploading"
                />
                <p class="text-xl text-black-alpha-60 font-medium">
                  {{ tokenlockUpAmount }}
                </p>
              </div>
            </div>
            <!-- 3 -->
            <!-- 4 -->
            <div class="flex h-6rem">
              <div
                class="
                  flex-initial flex
                  w-1
                  align-items-center
                  justify-content-start
                  ml-5
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">사용 가능</p>
              </div>
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  px-3
                  py-1
                  border-round
                "
              >
                <i
                  class="pi pi-spin pi-spinner"
                  v-if="isSeletedLockUploading"
                />
                <p class="text-xl text-black-alpha-60 font-medium">
                  {{ tokenUsableAmount }}
                </p>
              </div>
              <div
                class="
                  flex-initial flex
                  w-3
                  align-items-center
                  justify-content-start
                  pl-8
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">만료일</p>
              </div>
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  px-3
                  py-1
                  border-round
                "
              >
                <i
                  class="pi pi-spin pi-spinner"
                  v-if="isSeletedLockUploading"
                />
                <p class="text-xl text-black-alpha-60 font-medium">
                  {{ formatyyyyDate(tokenExpireDate) }}
                </p>
              </div>
            </div>
            <!-- 4 -->
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Watch Lock -->

    <!-- Lock Up -->
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
                Lock Up
              </span>
            </template>
            <div class="field">
              <!-- 2 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">주소</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <InputText
                    v-model="setLockUpAddress"
                    class="w-full"
                    :class="[{ 'p-invalid': islockUpAdd }]"
                    placeholder="락업 적용할 주소 입력"
                  />
                </div>
                <div class="err-msg-style">
                  <span v-show="islockUpAdd">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
              <!-- 2 -->
              <!-- 3 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">락업 수량</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <!-- <InputNumber
                    v-model="setLockUpAmount"
                    :maxFractionDigits="digits"
                    class="w-full"
                    :class="[{ 'p-invalid': islockUPAmount }]"
                    placeholder="락업 적용할 수량 입력 (소수점 포함)"
                    mode="decimal"
                  /> -->
                  <NumberInput
                    :id="'lockUpOnly'"
                    :modelValue="setLockUpAmount"
                    :placeholderInfo="'락업 적용할 수량 입력 (소수점 포함)'"
                    @update:modelValue="setLockUpAmount = $event"
                  />
                </div>
                <div class="err-msg-style">
                  <span v-show="islockUPAmount">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
              <!-- 3 -->
              <!-- 4 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">만료 시간</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <Calendar
                    v-model="setExpireTime"
                    class="w-full"
                    :class="[{ 'p-invalid': isExpireTime }]"
                    :showTime="true"
                    :showSeconds="true"
                    :showIcon="true"
                    :minDate="minDateValue"
                    placeholder="만료 시간 입력"
                    dateFormat="yy-mm-dd"
                    autocomplete="off"
                  />
                </div>
                <div class="err-msg-style">
                  <span v-show="isExpireTime">
                    {{ errorMessage }}
                  </span>
                </div>
              </div>
              <!-- 4 -->
              <!-- 1 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
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
                    placeholder="현재 Owner 비공개키 입력"
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
              <!-- 1 -->
              <!-- 5 -->
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-center
                  py-3
                "
              >
                <Button label="적용" class="px-7" @click="onSubmit"></Button>
              </div>
              <!-- 5 -->
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Lock Up -->
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>

<script>
import { ref } from "vue";
import { ethers } from "ethers";
import { tokenListData } from "@/common/getDataList.js";
import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import {
  formatyyyyDate,
  formatDigits,
  formatSendAmount,
} from "@/common/formatDate.js";
import constant from "@/common/constant.js";
import NumberInput from "@/components/input/NumberInput.vue";
export default {
  components: {
    TransactionTransfer,
    NumberInput,
  },
  setup() {
    const {
      tokenList,
      getTokenList,
      getOwnerAdd,
      ownerAddress,
      getTokenInfo,
      resetOwner,
      getLockUpData,
    } = tokenListData();
    //토큰 리스트 호출
    getTokenList(1);

    // 토큰 및 Owner 정보 불러오기
    const tokenSelect = ref("");
    const isloading = ref(false);
    const getOwnerAddress = async () => {
      isSeleted.value = false;
      isloading.value = true;
      await getOwnerAdd(tokenSelect.value);
      try {
        const response = await getTokenInfo(tokenSelect.value);
        console.log("lock up : ", response);
        digits.value = await response.data.decimals;
        selectedToken.value = await response.data.name;
        isNotOwner.value = false;
      } catch (error) {
        console.log("error >> ", error);
        resetOwner();
        digits.value = 0;
        selectedToken.value = "";
        isNotOwner.value = true;
      }
      isloading.value = false;
    };

    // Lock
    const lockUpAddress = ref("");
    const islockUpAddressError = ref(false);
    const isPrivatekey = ref(false);
    const islockUpAdd = ref(false);
    const islockUPAmount = ref(false);
    const isExpireTime = ref(false);
    const isSeleted = ref(false);
    const isNotOwner = ref(false);
    const digits = ref(0);
    const selectedToken = ref("");
    const privateKey = ref("");
    const setLockUpAddress = ref("");
    const setLockUpAmount = ref();
    const setExpireTime = ref("");
    const minDateValue = ref(new Date());
    let today = new Date();
    minDateValue.value.setDate(today.getDate());
    const sendDatas = ref({});

    const isSeletedLockUploading = ref(false);
    const tokenBalance = ref(null);
    const tokenlockUpAmount = ref("");
    const tokenUsableAmount = ref("");
    const tokenExpireDate = ref(null);
    const errorMessage = ref("");

    const { showDialog1, closeDialog1 } = dialogToggleAction();

    //lockup조회
    const selectLockup = async () => {
      tokenBalance.value = null;
      tokenExpireDate.value = null;
      if (tokenSelect.value) {
        if (isNotOwner.value) {
          window.scrollTo(0, 0);
        } else if (!ethers.utils.isAddress(lockUpAddress.value)) {
          islockUpAddressError.value = true;
          errorMessage.value = constant.errmsg.CHECKLOCKUP;
          //오류 없으면 검색 실행
        } else {
          islockUpAddressError.value = false;
          isSeletedLockUploading.value = true;
          try {
            const response = await getLockUpData(
              tokenSelect.value,
              lockUpAddress.value
            );
            tokenBalance.value = response.data.amount;
            tokenExpireDate.value = response.data.releaseTime;
            console.log(" >> ", response);
          } catch (error) {
            console.log("error >> ", error);
          }
          isSeletedLockUploading.value = false;
        }
      } else {
        isSeleted.value = true;
        window.scrollTo(0, 0);
      }
    };

    const onSubmit = () => {
      if (tokenSelect.value === "") {
        isSeleted.value = true;
        window.scrollTo(0, 0);
        return;
      } else if (
        !ethers.utils.isAddress(setLockUpAddress.value) ||
        setLockUpAddress.value === ""
      ) {
        isPrivatekey.value = false;
        isExpireTime.value = false;
        islockUPAmount.value = false;
        islockUpAdd.value = true;
        errorMessage.value = constant.errmsg.CHECKLOCKUP;
        return;
      } else if (
        setLockUpAmount.value === 0 ||
        setLockUpAmount.value === null
      ) {
        islockUpAdd.value = false;
        isPrivatekey.value = false;
        isExpireTime.value = false;
        islockUPAmount.value = true;
        errorMessage.value = constant.errmsg.CHECKLOCKUPAMOUNT;
        return;
      } else if (setExpireTime.value === "" || setExpireTime.value === null) {
        islockUpAdd.value = false;
        isPrivatekey.value = false;
        islockUPAmount.value = false;
        isExpireTime.value = true;
        errorMessage.value = constant.errmsg.NOLOCKUPTIME;
        return;
      } else if (
        privateKey.value.length !== 64 ||
        privateKey.value === "" ||
        privateKey.value === null
      ) {
        islockUpAdd.value = false;
        islockUPAmount.value = false;
        isExpireTime.value = false;
        isPrivatekey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        return;
      } else if (isNotOwner.value) {
        window.scrollTo(0, 0);
        return;
      }
      sendDatas.value = {
        tokenName: selectedToken.value,
        lockupAddress: setLockUpAddress.value,
        lockupAmount: formatSendAmount(setLockUpAmount.value),
        expireDate: setExpireTime.value,
        ownerPrivateKey: privateKey.value,
        contractAddress: tokenSelect.value,
      };
      showDialog1("setLock", sendDatas);
    };

    const closed = (status) => {
      closeDialog1();
      console.log(status);
    };

    return {
      tokenSelect,
      tokenList,
      lockUpAddress,
      tokenBalance,
      tokenlockUpAmount,
      tokenUsableAmount,
      tokenExpireDate,
      isSeletedLockUploading,
      minDateValue,
      selectLockup,
      privateKey,
      setLockUpAddress,
      setLockUpAmount,
      setExpireTime,
      onSubmit,
      getOwnerAddress,
      ownerAddress,
      isloading,
      islockUpAddressError,
      isPrivatekey,
      islockUpAdd,
      islockUPAmount,
      isExpireTime,
      isSeleted,
      isNotOwner,
      digits,
      closed,
      formatDigits,
      formatyyyyDate,
      errorMessage,
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
.border-1 {
  color: red;
}
</style>