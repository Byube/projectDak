<template>
  <div>
    <!-- ContractInformation -->
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
              @click="getTokenTimeLockContractInfo"
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
            <p class="text-xl text-black-alpha-80 font-bold">토큰 계약 주소</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <span class="text-xl text-black-alpha-60 font-medium">
              {{ tokenContractAddress }}
            </span>
            <CopyAddress :address="tokenContractAddress" :isShow="isVisible" />
          </div>
        </div>
        <!-- 2 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">토큰 이름</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <img
              v-show="tokenImage !== '' && tokenImage !== null"
              :src="tokenImage"
              class="mr-2"
              style="width: 20px; height: 20px"
            />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenName }}
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
            <p class="text-xl text-black-alpha-80 font-bold">토큰 심볼</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenSymbol }}
            </p>
          </div>
        </div>
        <!-- 4 -->
        <!-- 5 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">소수점 자리</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ tokenDigits }}
            </p>
          </div>
        </div>
        <!-- 5 -->
        <!-- 6 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">보관 수량</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p class="text-xl text-black-alpha-60 font-medium">
              {{ formatBalance }}
            </p>
          </div>
        </div>
        <!-- 6 -->
        <!-- 7 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">배포 입금 주소</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <span class="text-xl text-black-alpha-60 font-medium">
              {{ distributionAddress }}
            </span>
            <CopyAddress :address="distributionAddress" :isShow="isVisible" />
          </div>
        </div>
        <!-- 7 -->
        <!-- 8 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">락 만료 시간</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <p
              class="text-xl text-black-alpha-60 font-medium"
              v-show="isVisible"
            >
              {{ formatTime }} (한국 시간)
            </p>
          </div>
        </div>
        <!-- 8 -->
        <!-- 9 -->
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
            <p class="text-xl text-black-alpha-80 font-bold">계약 상태</p>
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
            <i class="pi pi-spin pi-spinner" v-if="isloading" />
            <Badge
              :value="contractStatus"
              :severity="contractBGColor"
              size="large"
              class="border-round-md px-4"
              v-show="isVisible"
            />
          </div>
        </div>
        <!-- 9 -->
        <!-- 10 -->
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
            label="토큰 배포"
            class="px-7"
            @click="onSendData"
            v-show="contractStatus === '배포 가능'"
          ></Button>
        </div>
        <!-- 10 -->
      </div>
    </div>
    <!-- ContractInformation -->
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { ethers } from "ethers";

import constant from "@/common/constant.js";
import { formatDate, formatDigits } from "@/common/formatDate.js";
import { tokenListData } from "@/common/getDataList.js";
import CopyAddress from "@/components/copy/CopyAddress.vue";
export default {
  components: {
    CopyAddress,
  },
  setup() {
    // 기능 호출 및 사전 설정
    const router = useRouter();

    // 에러 메시지
    const errorMessage = ref("");

    // 계약 주소 입력
    const contractAddress = ref("");
    const getContractAddress = ref("");
    const isContractAddress = ref(false);
    const isContractAddressError = ref(false);

    // 계약 정보 출력
    const tokenContractAddress = ref("");
    const tokenImage = ref("");
    const tokenName = ref("");
    const tokenSymbol = ref("");
    const tokenDigits = ref("");
    const balanceTokenAmount = ref("");
    const formatBalance = ref("");
    const distributionAddress = ref("");
    const lockExpireTime = ref("");
    const formatTime = ref("");
    const contractStatus = ref("");
    const contractBGColor = ref("");
    const tokenTLresponse = ref("");
    const tokenTLBlanceResponse = ref("");
    const tokenResponse = ref("");
    const isloading = ref(false);
    const isVisible = ref(false);
    const { getTokenInfo, getTokenTimeLockInfo, getTokenTimeLockBalance } =
      tokenListData();
    const getTokenTimeLockContractInfo = async () => {
      if (!ethers.utils.isAddress(contractAddress.value)) {
        isContractAddress.value = true;
        errorMessage.value = constant.errmsg.CHECKCONTRACT;
        toggleErrMsg(0);
        return;
      } else {
        try {
          isContractAddress.value = false;
          isContractAddressError.value = false;
          isloading.value = true;
          clearAll();
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
          tokenContractAddress.value = tokenTLresponse.value.data.tokenAddress;
          tokenImage.value =
            "https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880";
          tokenName.value = tokenResponse.value.data.name;
          tokenSymbol.value = tokenResponse.value.data.symbol;
          tokenDigits.value = tokenResponse.value.data.decimals;
          balanceTokenAmount.value = tokenTLBlanceResponse.value.data;
          distributionAddress.value = tokenTLresponse.value.data.beneficiary;
          lockExpireTime.value = tokenTLresponse.value.data.releaseTime * 1000;
          formatTime.value = formatDate(lockExpireTime.value);
          formatBalance.value = formatDigits(balanceTokenAmount.value);
          contractStatus.value = calStatus(
            lockExpireTime.value,
            balanceTokenAmount.value
          );
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

    // 계약 상태 체크
    const calStatus = (releaseTime, balance) => {
      const nowTime = Date.now();
      if (nowTime < releaseTime && balance <= 0) {
        contractBGColor.value = "danger";
        return "입금 대기";
      } else if (nowTime < releaseTime && balance > 0) {
        contractBGColor.value = "warning";
        return "잠금";
      } else if (nowTime >= releaseTime && balance > 0) {
        contractBGColor.value = "info";
        return "배포 가능";
      } else if (nowTime >= releaseTime && balance <= 0) {
        contractBGColor.value = "success";
        return "배포 완료";
      }
    };

    // 주소 복사
    const copyToClipBoard = (address) => {
      let textareaObj = document.createElement("textarea");
      document.body.appendChild(textareaObj);
      textareaObj.value = address;
      textareaObj.select();
      document.execCommand("copy");
      document.body.removeChild(textareaObj);
    };

    // 에러 메세지 보여주기
    const toggleErrMsg = (which) => {
      if (which === 0) {
        isContractAddressError.value = true;
      }
    };

    // 계약 주소 담고 토큰 배포 페이지로 이동
    const onSendData = () => {
      if (
        isVisible.value === false ||
        getContractAddress.value !== contractAddress.value
      ) {
        isContractAddress.value = true;
        window.scrollTo(0, 0);
        errorMessage.value = constant.errmsg.CHECKCONTRACT;
        toggleErrMsg(0);
        return;
      } else {
        isContractAddress.value = false;
        isContractAddressError.value = false;
        router.push({
          name: "distributionOfContractTokens",
          params: {
            contractAddress: contractAddress.value,
            isAutoSearch: true,
          },
        });
      }
    };

    // 재 검색시 출력 데이터 초기화
    const clearAll = () => {
      tokenContractAddress.value = "";
      tokenImage.value = "";
      tokenName.value = "";
      tokenSymbol.value = "";
      tokenDigits.value = "";
      balanceTokenAmount.value = "";
      formatBalance.value = "";
      distributionAddress.value = "";
      lockExpireTime.value = "";
      formatTime.value = "";
      contractStatus.value = "";
      contractBGColor.value = "";
      tokenTLresponse.value = "";
      tokenTLBlanceResponse.value = "";
      tokenResponse.value = "";
      isVisible.value = false;
    };

    return {
      errorMessage,
      contractAddress,
      isContractAddress,
      isContractAddressError,
      isloading,
      isVisible,
      tokenContractAddress,
      tokenImage,
      tokenName,
      tokenSymbol,
      tokenDigits,
      formatBalance,
      distributionAddress,
      formatTime,
      contractStatus,
      contractBGColor,
      getTokenTimeLockContractInfo,
      copyToClipBoard,
      onSendData,
    };
  },
};
</script>

<style scoped>
.inputwrapper-max-width {
  max-width: 850px;
}
</style>