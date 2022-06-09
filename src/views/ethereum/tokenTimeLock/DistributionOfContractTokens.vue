<template>
  <div>
    <!-- DistributionOfContractTokens -->
    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">계약 주소</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              text-blockchain
              font-medium
              text-black-alpha-60
              px-1
              py-3
              border-round
              p-inputgroup
              inputwrapper-max-width
            "
          >
            <div class="w-12">
              <InputText
                v-model="contractAddress"
                class="w-12"
                :class="[{ 'p-invalid': isContractAddress }]"
              />
              <div class="err-msg-style">
                <span v-show="isContractAddressError">
                  {{ errorMessage }}
                </span>
              </div>
            </div>
            <Button
              icon="pi pi-search"
              class="bg-indigolight"
              @click="getContractInfo"
            />
          </div>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="surface-200 mt-5 h-12rem mx-5 py-2 align-content-center">
          <div class="grid justify-content-center">
            <span class="col-11 mt-2 text-lg" v-show="isVisible">
              {{ printExpireTime }}
            </span>
            <i
              class="pi pi-sync cursor-pointer col-fixed mt-2"
              @click="onRefresh"
              v-show="isVisible"
            />
          </div>
          <div class="grid mt-2 align-content-center align-items-center">
            <div
              class="
                col-3
                text-xl
                font-bold
                text-black-alpha-80 text-center
                pl-8
                mr-6
              "
            >
              <div class="py-4">
                <img
                  v-show="tokenImage !== '' && tokenImage !== null"
                  :src="tokenImage"
                  class="mr-2"
                  style="width: 20px; height: 20px"
                />
                <span>{{ tokenName }}</span>
              </div>
              <div class="mb-3">{{ balanceTokenAmount }}</div>
            </div>
            <div
              class="
                col-3
                text-xl
                font-bold
                text-black-alpha-80 text-right
                pl-8
              "
            >
              <i
                class="pi pi-spin pi-spinner mt-6"
                style="font-size: 4rem"
                v-if="isloading"
              />
              <i
                class="pi pi-arrow-circle-right"
                style="font-size: 4rem"
                v-show="isVisible && isExpire"
              />
              <i
                class="pi pi-lock"
                style="font-size: 4rem"
                v-show="isVisible && !isExpire"
              />
            </div>
            <div
              class="col text-xl font-bold text-black-alpha-80 text-center pl-8"
            >
              <div class="py-3" v-show="isVisible">받는 주소</div>
              <div class="py-3">{{ distributionAddress }}</div>
            </div>
          </div>
        </div>
        <!-- 2 -->
        <!-- 3 -->
        <div
          class="
            field
            align-items-start
            justify-content-start
            ml-2
            px-4
            py-3
            mt-5
          "
        >
          <p class="text-xl text-black-alpha-80 font-bold">
            실행할 주소 비공개키
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
        <!-- 3 -->
        <!-- 4 -->
        <div
          class="
            flex-1 flex
            align-items-center
            justify-content-center
            py-3
            h-6rem
          "
        >
          <Button
            label="전송"
            class="px-7"
            @click="onSubmit"
            v-show="isVisible === true && isTransPossible === true"
          />
          <Button
            label="전송불가"
            class="px-7 p-button-secondary"
            disabled="disabled"
            v-show="isVisible === true && isTransPossible === false"
          />
        </div>
        <!-- 4 -->
      </div>
    </div>
    <!-- DistributionOfContractTokens -->
    <TransactionTransfer @dialog-action="closed" />
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";

import { ethers } from "ethers";

import constant from "@/common/constant.js";
import { formatDigits } from "@/common/formatDate.js";
import { tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";

import TransactionTransfer from "@/components/popup/token/TransactionTransfer.vue";

export default {
  components: {
    TransactionTransfer,
  },

  setup() {
    // 기능 호출 및 사전 설정
    const route = useRoute();
    const { showDialog1, closeDialog1 } = dialogToggleAction();

    // 에러 메시지
    const errorMessage = ref("");

    // 계약 주소 입력
    const contractAddress = ref("");
    if (
      route.params.contractAddress !== "" &&
      route.params.contractAddress !== null
    ) {
      contractAddress.value = route.params.contractAddress;
    }
    const getContractAddress = ref("");
    const isContractAddress = ref(false);
    const isContractAddressError = ref(false);

    // 실행할 주소 비공개키 입력
    const privateKey = ref("");
    const isPrivateKey = ref(false);
    const isPrivateKeyError = ref(false);

    // 출력할 계약 정보
    const lockExpireTime = ref("");
    const tokenImage = ref("");
    const tokenName = ref("");
    const balanceTokenAmount = ref("");
    const distributionStatus = ref("");
    const distributionAddress = ref("");
    // const diffTime = ref("");
    const printExpireTime = ref("");
    const tokenTLresponse = ref("");
    const tokenTLBlanceResponse = ref("");
    const tokenResponse = ref("");
    const isloading = ref(false);
    const isVisible = ref(false);

    // 전송 기능 활성화 여부 정부
    const isExpire = ref(false);
    const isEmpty = ref(false);
    const isTransPossible = ref(false);

    // 입력사항 클리어
    const resetAll = (type) => {
      switch (type) {
        case 1:
          lockExpireTime.value = "";
          tokenImage.value = "";
          tokenName.value = "";
          balanceTokenAmount.value = "";
          distributionStatus.value = "";
          distributionAddress.value = "";
          printExpireTime.value = "";
          tokenTLresponse.value = "";
          tokenTLBlanceResponse.value = "";
          tokenResponse.value = "";
          isloading.value = false;
          isVisible.value = false;
          isExpire.value = false;
          isEmpty.value = false;
          break;
        case 2:
          privateKey.value = "";
          isPrivateKey.value = false;
          break;
      }
    };

    // 계약 정보 출력
    const { getTokenInfo, getTokenTimeLockInfo, getTokenTimeLockBalance } =
      tokenListData();
    const getContractInfo = async () => {
      if (!ethers.utils.isAddress(contractAddress.value)) {
        isContractAddress.value = true;
        errorMessage.value = constant.errmsg.CHECKCONTRACT;
        toggleErrMsg(0);
        return;
      } else {
        try {
          resetAll(1);
          isContractAddress.value = false;
          isContractAddressError.value = false;
          isloading.value = true;
          tokenTLresponse.value = await getTokenTimeLockInfo(
            contractAddress.value
          );
          tokenTLBlanceResponse.value = await getTokenTimeLockBalance(
            contractAddress.value
          );
          tokenResponse.value = await getTokenInfo(
            tokenTLresponse.value.data.tokenAddress
          );
          getContractAddress.value = contractAddress.value;
          lockExpireTime.value = tokenTLresponse.value.data.releaseTime * 1000;
          tokenImage.value =
            "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880";
          tokenName.value = tokenResponse.value.data.name;
          balanceTokenAmount.value = formatDigits(
            tokenTLBlanceResponse.value.data
          );
          distributionAddress.value = tokenTLresponse.value.data.beneficiary;
          printExpireTime.value = lockFormatExpireTime(lockExpireTime.value);
          isTransPossible.value = transPossible(isExpire.value, isEmpty.value);
          isloading.value = false;
          isVisible.value = true;
        } catch (error) {
          console.log(error);
          isloading.value = false;
          isContractAddress.value = true;
          errorMessage.value = constant.errmsg.CHECKCONTRACT;
          toggleErrMsg(0);
        }
      }
    };

    // 락 만료 시간 포맷팅
    const lockFormatExpireTime = (lockExpireTime) => {
      let nowTime = Date.now();
      let diffTime = Math.abs(lockExpireTime - nowTime);
      if (lockExpireTime > nowTime) {
        isExpire.value = false;
        return `락 만료까지 ${calLockExpireTime(diffTime)} 전`;
      } else if (lockExpireTime < nowTime) {
        isExpire.value = true;
        return `락 만료 시간에서 ${calLockExpireTime(diffTime)} 지남`;
      }
    };

    // 락 만료 시간 계산
    const calLockExpireTime = (intTime) => {
      if (intTime >= 86400000) {
        return (
          calculateDay(intTime) +
          "일 " +
          calculateHour(intTime) +
          "시간 " +
          calculateMin(intTime) +
          "분"
        );
      } else if (intTime >= 3600000) {
        return calculateHour(intTime) + "시간 " + calculateMin(intTime) + "분";
      } else {
        return calculateMin(intTime) + "분";
      }
    };
    const calculateDay = (intTime) => {
      return Math.floor(intTime / 86400000);
    };
    const calculateHour = (intTime) => {
      return Math.floor((intTime % 86400000) / 3600000);
    };
    const calculateMin = (intTime) => {
      return Math.floor(((intTime % 86400000) % 3600000) / 60000);
    };

    // 계약 정보 페이지에서 데이터 담아 넘어올 때 자동 검색 기능 활성화
    if (route.params.isAutoSearch) {
      getContractInfo();
    }

    // 락 배포 정보 새로고침
    const onRefresh = () => {
      resetAll(1);
      getContractInfo();
    };

    // 전송기능 활성화 여부
    const transPossible = (isExpire, isEmpty) => {
      if (isExpire === true && isEmpty === false) {
        return true;
      } else if (isExpire === false && isEmpty === true) {
        return false;
      } else if (isExpire === false && isEmpty === false) {
        return false;
      } else if (isExpire === true && isEmpty === true) {
        return false;
      }
    };

    // 에러 메세지 보여주기
    const toggleErrMsg = (which) => {
      switch (which) {
        case 0:
          isPrivateKeyError.value = false;
          isContractAddressError.value = true;
          break;
        case 1:
          isContractAddressError.value = false;
          isPrivateKeyError.value = true;
          break;
      }
    };

    // 토큰 배포
    const sendDatas = ref({});
    const onSubmit = () => {
      if (
        isVisible.value === false ||
        getContractAddress.value !== contractAddress.value
      ) {
        isContractAddress.value = true;
        isPrivateKey.value = false;
        window.scrollTo(0, 0);
        errorMessage.value = constant.errmsg.CHECKCONTRACT;
        toggleErrMsg(0);
        return;
      } else if (privateKey.value.length !== 64 || privateKey.value === "") {
        isContractAddress.value = false;
        isPrivateKey.value = true;
        errorMessage.value = constant.errmsg.CHECKPRIVATEKEY;
        toggleErrMsg(1);
        return;
      } else {
        isContractAddress.value = false;
        isContractAddressError.value = false;
        isPrivateKey.value = false;
        isPrivateKeyError.value = false;
        sendDatas.value = {
          actionNm: constant.dialog.TOKENTIMELOCK,
          contractAddress: contractAddress.value,
          tokenName: tokenName.value,
          privateKey: privateKey.value,
        };
        showDialog1("release", sendDatas);
        resetAll(2);
      }
    };

    // 트랜잭션 모달 처리
    const closed = (status) => {
      closeDialog1();
      console.log(status);
      if (status.state) {
        resetAll(2);
      }
    };

    return {
      closed,
      errorMessage,
      contractAddress,
      isContractAddress,
      isContractAddressError,
      isloading,
      isVisible,
      isTransPossible,
      lockExpireTime,
      tokenImage,
      tokenName,
      balanceTokenAmount,
      distributionStatus,
      distributionAddress,
      isExpire,
      getContractInfo,
      printExpireTime,
      onRefresh,
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