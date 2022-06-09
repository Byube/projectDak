<template>
  <div>
    <!-- Token -->
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
        <!-- <Message v-show="isSelectError" severity="error">
          {{ errorMessage }}
        </Message> -->
        <!-- 1 -->
      </div>
    </div>
    <!-- Token -->

    <!-- Allowance -->
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
                Allowance (Approve 수량 조회)
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">From</p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <InputText
                    v-model="fromAddress"
                    placeholder="Approve 수량을 조회할 From 주소 입력"
                    class="w-full"
                    :class="[{ 'p-invalid': isFromAddress }]"
                  />
                  <!-- <Message v-show="isFromAddressError" severity="error">
                    {{ errorMessage }}
                  </Message> -->
                </div>
              </div>
              <!-- 1 -->
              <!-- 2 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  Spender (대리 전송 주소)
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <InputText
                    v-model="spender"
                    placeholder="From 주소에서 Approve 받은 Allowance를 조회할 Spender 주소 입력"
                    class="w-full"
                    :class="[{ 'p-invalid': isSpender }]"
                  />
                  <!-- <Message v-show="isSpenderError" severity="error">
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
                  justify-content-start
                  m-2
                  py-2
                "
              >
                <Button
                  @click="selectAllowance"
                  label="조회"
                  class="px-7"
                ></Button>
              </div>
              <!-- 3 -->
            </div>
            <!-- 4 -->
            <div class="flex h-6rem">
              <div
                class="
                  flex-initial flex
                  w-1
                  align-items-center
                  justify-content-start
                  ml-2
                "
              >
                <p class="text-xl text-black-alpha-80 font-bold">Allowance</p>
              </div>
              <div
                class="
                  flex-1 flex
                  align-items-center
                  justify-content-start
                  m-2
                  px-8
                "
              >
                <div v-if="isInquiry">
                  <i class="pi pi-spin pi-spinner" v-if="isloading" />
                  <p class="text-xl text-black-alpha-60 font-medium" v-else>
                    {{ formatDigits(allowance) }}
                  </p>
                </div>
              </div>
            </div>
            <!-- 4 -->
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Allowance -->

    <!-- Approve -->
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
                Approve
              </span>
            </template>
            <div class="field">
              <!-- 1 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  From 비공개키
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <Password
                    v-model="privateKey"
                    class="w-full"
                    :class="[{ 'p-invalid': isPrivateKey }]"
                    :feedback="false"
                    placeholder="비공개키 입력할때는 보안에 주의하세요"
                    inputStyle="width: 100%"
                    toggleMask
                  ></Password>
                </div>
              </div>
              <!-- 1 -->
              <!-- 2 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  Spender (대리 전송 주소)
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <InputText
                    v-model="setSpender"
                    class="w-full"
                    :class="[{ 'p-invalid': isSetSpender }]"
                    placeholder="Allowance 수량 만큼 From 주소에서 대리 전송을 진행할 Spender 주소 입력"
                  />
                </div>
              </div>
              <!-- 2 -->
              <!-- 3 -->
              <div
                class="field align-items-center justify-content-start ml-2 py-3"
              >
                <p class="text-xl text-black-alpha-80 font-bold">
                  Allowance (전송 허용 수량)
                </p>
                <div
                  class="font-medium text-black-alpha-60 inputwrapper-max-width"
                >
                  <NumberInput
                    :id="'allowanceOnly'"
                    :modelValue="setAllowance"
                    :placeholderInfo="'Approve 적용할 Allowance 수량 입력 (소수점 포함)'"
                    @update:modelValue="setAllowance = $event"
                  />
                </div>
              </div>
              <!-- 3 -->
              <!-- 4 -->
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
              <!-- 4 -->
            </div>
          </AccordionTab>
        </Accordion>
      </div>
    </div>
    <!-- Approve -->
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>

<script>
import { ref } from "vue";

import { ethers } from "ethers";
import { formatDigits, formatSendAmount } from "@/common/formatDate.js";
import { tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";
import BigNumber from "bignumber.js";
import NumberInput from "@/components/input/NumberInput.vue";

export default {
  components: {
    TransactionTransfer,
    NumberInput,
  },

  setup() {
    // 기능 호출 및 사전 설정
    const { showDialog1, closeDialog1 } = dialogToggleAction();

    // 토큰 정보 불러오기
    const isSeleted = ref(false);
    const tokenSelect = ref("");
    const selectedToken = ref("");
    const digits = ref(0);
    const response = ref(null);
    const { tokenList, getTokenList, getOwnerAdd, getTokenInfo, getAllowance } =
      tokenListData();
    //토큰 리스트 호출
    getTokenList(1);

    const getOwnerAddress = async () => {
      isSeleted.value = false;
      await getOwnerAdd(tokenSelect.value);
      response.value = await getTokenInfo(tokenSelect.value);
      digits.value = response.value.data.decimals;
      selectedToken.value = response.value.data.name;
    };

    // Allowance 정보 불러오기
    const printAllowance = async () => {
      const result = await getAllowance(
        tokenSelect.value,
        fromAddress.value,
        spender.value
      );

      // allowance.value = await ethers.utils.formatEther(result.data);
      allowance.value = await result.data;
      isloading.value = false;
    };

    // Allowance (Approve 수량 조회)
    const isloading = ref(false);
    const isInquiry = ref(false);
    const allowance = ref();
    const fromAddress = ref("");
    const isFromAddress = ref(false);
    const spender = ref("");
    const isSpender = ref(false);
    const selectAllowance = () => {
      if (tokenSelect.value) {
        if (
          !ethers.utils.isAddress(fromAddress.value) ||
          fromAddress.value === ""
        ) {
          isFromAddress.value = true;
          isSpender.value = false;
          return;
        } else if (
          !ethers.utils.isAddress(spender.value) ||
          spender.value === ""
        ) {
          isFromAddress.value = false;
          isSpender.value = true;
          return;
        } else {
          isloading.value = true;
          isFromAddress.value = false;
          isSpender.value = false;
          printAllowance();
          isInquiry.value = true;
        }
      } else {
        isSeleted.value = true;
        return;
      }
    };

    // Approve
    const privateKey = ref("");
    const isPrivateKey = ref(false);
    const setSpender = ref("");
    const isSetSpender = ref(false);
    const setAllowance = ref();
    const isSetAllowance = ref(false);
    const convertfromAddress = ref("");
    const sendDatas = ref({});
    const onSubmit = () => {
      if (tokenSelect.value === "") {
        isSeleted.value = true;
        window.scrollTo(0, 0);
        return;
      } else if (privateKey.value.length !== 64 || privateKey.value === "") {
        isSetSpender.value = false;
        isSetAllowance.value = false;
        isPrivateKey.value = true;
        return;
      } else if (
        !ethers.utils.isAddress(setSpender.value) ||
        setSpender.value === ""
      ) {
        isPrivateKey.value = false;
        isSetAllowance.value = false;
        isSetSpender.value = true;
        return;
      } else if (setAllowance.value === 0 || setAllowance.value === null) {
        isPrivateKey.value = false;
        isSetSpender.value = false;
        isSetAllowance.value = true;
        return;
      } else {
        isPrivateKey.value = false;
        isSetSpender.value = false;
        isSetAllowance.value = false;
        // from 비공개키에 대응되는 주소 가져오기
        convertfromAddress.value = new ethers.Wallet(privateKey.value);
        sendDatas.value = {
          tokenName: selectedToken.value,
          ownerPrivateKey: privateKey.value,
          fromAddress: convertfromAddress.value.address,
          approveSpender: setSpender.value,
          approveAllowance: formatSendAmount(setAllowance.value),
          contractAddress: tokenSelect.value,
        };
        console.log("approve", sendDatas);
        showDialog1("approve", sendDatas);
      }
    };

    // 트랜잭션 모달 처리
    const closed = (status) => {
      closeDialog1();
      console.log(status);
    };

    // 입력사항 클리어
    // const resetAll = () => {
    //   isSeleted.value = false;
    //   privateKey.value = "";
    //   isPrivateKey.value = false;
    //   setSpender.value = "";
    //   isSetSpender.value = false;
    //   setAllowance.value = 0;
    //   isSetAllowance.value = false;
    // };

    //입력값 체크
    const checkSelfAmount = (v) => {
      let removed = v.replace(/(,)/g, "");
      let checkNum = new BigNumber(removed);
      if (!checkNum.isNaN() && !checkNum.isNegative()) {
        isSetAllowance.value = false;
        setAllowance.value = checkNum.decimalPlaces(18).toFormat();
      } else {
        console.log(">>;;");
        document.getElementById("allowanceOnly").value = "";
        isSetAllowance.value = true;
        setAllowance.value = "";
      }
    };

    return {
      closed,
      isSeleted,
      tokenSelect,
      digits,
      tokenList,
      getOwnerAddress,
      isloading,
      isInquiry,
      allowance,
      fromAddress,
      isFromAddress,
      spender,
      isSpender,
      selectAllowance,
      privateKey,
      isPrivateKey,
      setSpender,
      isSetSpender,
      setAllowance,
      isSetAllowance,
      formatDigits,
      onSubmit,
      checkSelfAmount,
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