<template>
  <div>
    <!-- CreateNewContract -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <div class="field ml-5 mt-3">
          <!-- 1 -->
          <div class="field align-items-center justify-content-start ml-2 py-3">
            <p class="text-xl text-black-alpha-80 font-bold">토큰</p>
            <div class="font-medium text-black-alpha-60 inputwrapper-max-width">
              <Dropdown
                v-model="tokenSelect"
                :options="tokenList"
                @change="getTokenSelect"
                optionLabel="name"
                optionValue="code"
                placeholder="선택하세요"
                class="
                  flex-1 flex
                  w-7
                  border-round
                  text-blockchain
                  font-medium
                  text-black-alpha-60
                "
                :class="[{ 'p-invalid': isSeleted }]"
              />
            </div>
            <div class="err-msg-style">
              <span v-show="isSeletedError">
                {{ errorMessage }}
              </span>
            </div>
          </div>
          <!-- 1 -->
          <!-- 2 -->
          <div class="field align-items-center justify-content-start ml-2 py-3">
            <p class="text-xl text-black-alpha-80 font-bold">배포 수령 지갑</p>
            <div class="font-medium text-black-alpha-60 inputwrapper-max-width">
              <InputText
                v-model="distributionAddress"
                placeholder="락 만료 이후 배포 전송 실행할때 토큰을 입금 받는 주소 입력"
                class="w-full"
                :class="[{ 'p-invalid': isDistributionAddress }]"
              />
            </div>
            <div class="err-msg-style">
              <span v-show="isDistributionAddressError">
                {{ errorMessage }}
              </span>
            </div>
          </div>
          <!-- 2 -->
          <!-- 3 -->
          <div class="field align-items-center justify-content-start ml-2 py-3">
            <p class="text-xl text-black-alpha-80 font-bold">락 만료 시간</p>
            <div class="font-medium text-black-alpha-60 inputwrapper-max-width">
              <Calendar
                v-model="lockExpireTime"
                class="w-full"
                :class="[{ 'p-invalid': isLockExpireTime }]"
                :showTime="true"
                :showSeconds="true"
                :showIcon="true"
                :minDate="minDateValue"
                placeholder="락 만료 시간 입력"
                dateFormat="yy-mm-dd"
                autocomplete="off"
              />
            </div>
            <div class="err-msg-style">
              <span v-show="isLockExpireTimeError">
                {{ errorMessage }}
              </span>
            </div>
          </div>
          <!-- 3 -->
          <!-- 4 -->
          <div class="field align-items-center justify-content-start ml-2 py-3">
            <p class="text-xl text-black-alpha-80 font-bold">
              생성할 주소 비공개키
            </p>
            <div class="font-medium text-black-alpha-60 inputwrapper-max-width">
              <Password
                v-model="privateKey"
                class="w-full"
                :class="[{ 'p-invalid': isPrivateKey }]"
                :feedback="false"
                placeholder="비공개키 입력할때는 보안에 주의하세요"
                inputStyle="width: 100%"
                toggleMask
              >
              </Password>
            </div>
            <div class="err-msg-style">
              <span v-show="isPrivateKeyError">
                {{ errorMessage }}
              </span>
            </div>
          </div>
          <!-- 4 -->
          <!-- 5 -->
          <div
            class="flex-1 flex align-items-center justify-content-center py-3"
          >
            <Button label="생성" class="px-7" @click="onSubmit"></Button>
          </div>
          <!-- 5 -->
        </div>
      </div>
    </div>
    <!-- CreateNewContract -->
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

    // 에러 메시지
    const errorMessage = ref("");

    // 토큰 정보 불러오기
    const isSeleted = ref(false);
    const isSeletedError = ref(false);
    const tokenSelect = ref("");
    const selectedToken = ref("");
    const response = ref(null);
    const { tokenList, getTokenList, getOwnerAdd, getTokenInfo } =
      tokenListData();
    //토큰 리스트 호출
    getTokenList(1);
    const getTokenSelect = async () => {
      isSeleted.value = false;
      isSeletedError.value = false;
      await getOwnerAdd(tokenSelect.value);
      response.value = await getTokenInfo(tokenSelect.value);
      selectedToken.value = response.value.data.name;
      console.log("response.value: ", response.value);
    };

    // 계약 생성 내용 입력
    const distributionAddress = ref("");
    const isDistributionAddress = ref(false);
    const isDistributionAddressError = ref(false);
    const lockExpireTime = ref("");
    const isLockExpireTime = ref(false);
    const isLockExpireTimeError = ref(false);
    const minDateValue = ref(new Date());
    const privateKey = ref("");
    const isPrivateKey = ref(false);
    const isPrivateKeyError = ref(false);

    // 락 만료 시간 최소 시간 설정(오늘 날짜 기준)
    let today = new Date();
    minDateValue.value.setDate(today.getDate());

    // 에러 메세지 보여주기
    const toggleErrMsg = (which) => {
      switch (which) {
        case 0:
          isDistributionAddressError.value = false;
          isLockExpireTimeError.value = false;
          isPrivateKeyError.value = false;
          isSeletedError.value = true;
          break;
        case 1:
          isLockExpireTimeError.value = false;
          isPrivateKeyError.value = false;
          isSeletedError.value = false;
          isDistributionAddressError.value = true;
          break;
        case 2:
          isPrivateKeyError.value = false;
          isSeletedError.value = false;
          isDistributionAddressError.value = false;
          isLockExpireTimeError.value = true;
          break;
        case 3:
          isSeletedError.value = false;
          isDistributionAddressError.value = false;
          isLockExpireTimeError.value = false;
          isPrivateKeyError.value = true;
          break;
      }
    };

    // 계약 생성
    const sendDatas = ref({});
    const onSubmit = () => {
      if (tokenSelect.value === "") {
        isSeleted.value = true;
        errorMessage.value = constant.errmsg.NOTOKEN;
        toggleErrMsg(0);
        return;
      } else if (!ethers.utils.isAddress(distributionAddress.value)) {
        isSeletedError.value = false;
        isLockExpireTime.value = false;
        isLockExpireTimeError.value = false;
        isPrivateKey.value = false;
        isPrivateKeyError.value = false;
        isDistributionAddress.value = true;
        errorMessage.value = constant.errmsg.CHECKDISTRIBUTION;
        toggleErrMsg(1);
        return;
      } else if (lockExpireTime.value === "" || lockExpireTime.value === null) {
        isSeletedError.value = false;
        isDistributionAddress.value = false;
        isDistributionAddressError.value = false;
        isPrivateKey.value = false;
        isPrivateKeyError.value = false;
        isLockExpireTime.value = true;
        errorMessage.value = constant.errmsg.CHECKTIME;
        toggleErrMsg(2);
        return;
      } else if (privateKey.value.length !== 64 || privateKey.value === "") {
        isSeletedError.value = false;
        isDistributionAddress.value = false;
        isDistributionAddressError.value = false;
        isLockExpireTime.value = false;
        isLockExpireTimeError.value = false;
        isPrivateKey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        toggleErrMsg(3);
        return;
      } else {
        isSeleted.value = false;
        isSeletedError.value = false;
        isDistributionAddress.value = false;
        isDistributionAddressError.value = false;
        isLockExpireTime.value = false;
        isLockExpireTimeError.value = false;
        isPrivateKey.value = false;
        isPrivateKeyError.value = false;
        sendDatas.value = {
          actionNm: constant.dialog.TOKENTIMELOCK,
          tokenName: selectedToken.value,
          tokenAddress: tokenSelect.value,
          distributionAddress: distributionAddress.value,
          lockExpireTime: lockExpireTime.value,
          privateKey: privateKey.value,
          contractAddress: null,
        };
        showDialog1("deploy", sendDatas);
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
      //distributionAddress.value = "";
      isDistributionAddress.value = false;
      //lockExpireTime.value = "";
      isLockExpireTime.value = false;
      //privateKey.value = "";
      isPrivateKey.value = false;
    };

    return {
      closed,
      errorMessage,
      isSeleted,
      isSeletedError,
      tokenSelect,
      tokenList,
      getTokenSelect,
      distributionAddress,
      isDistributionAddress,
      isDistributionAddressError,
      lockExpireTime,
      isLockExpireTime,
      isLockExpireTimeError,
      minDateValue,
      privateKey,
      isPrivateKey,
      isPrivateKeyError,
      onSubmit,
    };
  },
};
</script>

<style scoped>
.inputwrapper-max-width {
  max-width: 850px;
}
</style>