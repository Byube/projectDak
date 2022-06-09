<template>
  <div class="coinintroduction">
    <Dialog
      header="트랜잭션 전송"
      v-model:visible="display"
      :breakpoints="{ '1080px': '75vw', '720px': '100vw' }"
      :style="{ width: '60vw' }"
      :modal="true"
      class=""
      :dismissableMask="true"
    >
      <hr class="w-full" />
      <!-- 1 -->
      <div class="grid m-3">
        <div class="col-3 justify-content-center align-items-center">
          <span class="text-black-alpha-80 font-bold text-xl">
            {{ actionNm }}
          </span>
        </div>
        <div class="col-9 justify-content-center align-items-center">
          <span class="text-black-alpha-60 font-medium text-xl">
            {{ tokenName }}
          </span>
        </div>
      </div>
      <!-- 1 -->
      <!-- 2 -->
      <div class="grid m-3" v-if="check === 5 || check === 6">
        <div class="col-3 justify-content-center align-items-center">
          <span class="text-black-alpha-80 font-bold text-xl"> 토큰 </span>
        </div>
        <div class="col-9 justify-content-center align-items-center">
          <span class="text-black-alpha-60 font-medium text-xl">
            {{ contractAddress }}
          </span>
        </div>
      </div>
      <!-- 2 -->
      <!-- 2 -->
      <div class="grid m-3">
        <div class="col-3 justify-content-center align-items-center">
          <span class="text-black-alpha-80 font-bold text-xl"> 메소드 </span>
        </div>
        <div class="col-9 justify-content-center align-items-center">
          <span class="text-black-alpha-60 font-medium text-xl">
            {{ which }}
          </span>
        </div>
      </div>
      <!-- 2 -->
      <div>
        <!-- 3 -->
        <div class="grid m-3">
          <div class="col-3 justify-content-center align-items-center">
            <span class="text-black-alpha-80 font-bold text-xl">
              {{ whichAddress }}
            </span>
          </div>
          <div class="col-9 justify-content-center align-items-center">
            <span class="text-black-alpha-60 font-medium text-xl">
              {{ commonAddress }}
            </span>
          </div>
        </div>
        <!-- 3 -->
        <!-- 3 -->
        <div class="grid m-3" v-if="check === 7">
          <div class="col-3 justify-content-center align-items-center">
            <span class="text-black-alpha-80 font-bold text-xl"> 수량 </span>
          </div>
          <div class="col-9 justify-content-center align-items-center">
            <span class="text-black-alpha-60 font-medium text-xl">
              {{ formatDigits(coinAmount) }}
            </span>
          </div>
        </div>
        <!-- 3 -->
        <!-- 3 -->
        <div class="grid m-3" v-if="check === 8 || check === 9">
          <div class="col-3 justify-content-center align-items-center">
            <span class="text-black-alpha-80 font-bold text-xl">총 수량 </span>
          </div>
          <div class="col-9 justify-content-center align-items-center">
            <span class="text-black-alpha-60 font-medium text-xl">
              {{ totalAmount }}
            </span>
          </div>
        </div>
        <!-- 3 -->
      </div>
      <div v-if="isNotOwnerSetting">
        <div v-if="check === 1">
          <!-- 4 -->
          <div class="grid m-3">
            <div class="col-3 justify-content-center align-items-center">
              <span class="text-black-alpha-80 font-bold text-xl">
                Spender
              </span>
            </div>
            <div class="col-9 justify-content-center align-items-center">
              <span class="text-black-alpha-60 font-medium text-xl">
                {{ approveSpender }}
              </span>
            </div>
          </div>
          <!-- 4 -->
          <!-- 5 -->
          <div class="grid m-3">
            <div class="col-3 justify-content-center align-items-center">
              <span class="text-black-alpha-80 font-bold text-xl">
                Allowance
              </span>
            </div>
            <div class="col-9 justify-content-center align-items-center">
              <span class="text-black-alpha-60 font-medium text-xl">
                {{ formatDigits(approveAllowance) }}
              </span>
            </div>
          </div>
          <!-- 5 -->
        </div>
        <div v-else-if="check === 2">
          <!-- 4 -->
          <div class="grid m-3">
            <div class="col-3 justify-content-center align-items-center">
              <span class="text-black-alpha-80 font-bold text-xl">
                LockUp 수량
              </span>
            </div>
            <div class="col-9 justify-content-center align-items-center">
              <span class="text-black-alpha-60 font-medium text-xl">
                {{ formatDigits(lockupAmount) }}
              </span>
            </div>
          </div>
          <!-- 4 -->
          <!-- 5 -->
          <div class="grid m-3">
            <div class="col-3 justify-content-center align-items-center">
              <span class="text-black-alpha-80 font-bold text-xl">
                LockUp 만료일
              </span>
            </div>
            <div class="col-9 justify-content-center align-items-center">
              <span class="text-black-alpha-60 font-medium text-xl">
                {{ formatDate(lockupExpireDate) }}
              </span>
            </div>
          </div>
          <!-- 5 -->
        </div>
        <div v-else-if="check === 4">
          <!-- 4 -->
          <div class="grid m-3">
            <div class="col-3 justify-content-center align-items-center">
              <span class="text-black-alpha-80 font-bold text-xl">
                락 만료 시간
              </span>
            </div>
            <div class="col-9 justify-content-center align-items-center">
              <span class="text-black-alpha-60 font-medium text-xl">
                {{ formatDate(timeLockExpireDate) }}
              </span>
            </div>
          </div>
          <!-- 4 -->
        </div>
      </div>
      <hr />
      <div>
        <!-- 1 -->
        <div class="mt-5">
          <span class="text-lg font-bold text-black-alpha-80">전송수수료</span>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="mt-3">
          <ToggleButton
            v-model="isSlow"
            :disabled="isSendEnd"
            @click="slowSend"
            onLabel="느림"
            offLabel="느림"
            class="w-2"
          />
          <ToggleButton
            v-model="isNomal"
            :disabled="isSendEnd"
            @click="nomalSend"
            onLabel="보통"
            offLabel="보통"
            class="w-2 ml-2"
          />
          <ToggleButton
            v-model="isSpeed"
            :disabled="isSendEnd"
            @click="speedSend"
            onLabel="빠름"
            offLabel="빠름"
            class="w-2 ml-2"
          />
          <ToggleButton
            v-model="isSelf"
            :disabled="isSendEnd"
            @click="selfSend"
            onLabel="직접 설정"
            offLabel="직접 설정"
            class="w-2 ml-2"
          />
        </div>
        <!-- 2 -->
        <!-- 3 -->
        <div class="h-14rem" v-if="isSendLoading">
          <div
            class="flex justify-content-center align-items-center mt-8"
            v-if="isloading"
          >
            <ProgressSpinner />
          </div>

          <div v-else>
            <div class="flex justify-content-center align-items-center mt-8">
              <i class="pi pi-check-circle text-8xl"></i>
            </div>

            <div class="flex justify-content-center align-items-center mt-7">
              <a
                class="cursor-pointer text-blue-300 hover:underline"
                @click="goScanpage(transactionHash)"
              >
                <span class="text-3xl font-bold">
                  {{ transactionHash }}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="surface-200 mt-5 h-12rem" v-if="isSelfSetting">
            <div class="flex justify-content-center align-items-center h-6rem">
              <span
                class="w-2 font-bold text-2xl text-black-alpha-80 text-center"
              >
                가스비(GWEI)
              </span>
              <InputNumber
                class="font-medium text-xl text-black-alpha-60"
                placeholder="입력 하세요"
                :max="30000000"
                v-model="selfGasfee"
                :minFractionDigits="0"
              />
            </div>
            <div class="flex justify-content-center align-items-center h-6rem">
              <span
                class="w-2 font-bold text-2xl text-black-alpha-80 text-center"
              >
                가스제한
              </span>
              <InputNumber
                class="font-medium text-xl text-black-alpha-60"
                placeholder="입력 하세요"
                :max="30000000"
                v-model="selfGasLimit"
                :minFractionDigits="0"
              />
            </div>
          </div>
          <div class="surface-200 mt-5 h-12rem" v-else>
            <div class="grid">
              <span class="col-11 ml-2 mt-2 text-lg">
                {{ blockNum }}블록 기준 {{ getLastBlockTime(lastblockTime) }} 전
                계산 ...
              </span>
              <i
                class="pi pi-sync cursor-pointer col-fixed mt-2"
                @click="getFeeInfo()"
              />
            </div>

            <!-- <div class="flex justify-content-center align-items-center mt-3"> -->
            <div class="grid mt-3">
              <div
                class="col-3 text-xl font-bold text-black-alpha-80 text-center"
              >
                마지막 블록 Base Fee
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                Max Base Fee
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                Tip
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                Gas Limit
              </div>
            </div>
            <div class="grid mt-2">
              <div
                class="col-3 text-xl font-bold text-black-alpha-80 text-center"
              >
                {{ getGWEI(fBlockFee, "fer") }} GWEI({{ fBlockFer }}%)
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                {{ getGWEI(maxFee, "fer") }} GWEI
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                {{ getGWEI(tip, "tip") }} GWEI
              </div>
              <div
                class="col text-xl font-bold text-black-alpha-80 text-center"
              >
                {{ getGWEI(gasLimit, "limit") }}
              </div>
            </div>
            <!-- </div> -->
          </div>
        </div>
        <!-- 3 -->
        <!-- 4 -->
        <!-- <div class="flex justify-content-center align-items-center mt-3">
          <span class="text-2xl font-bold text-black-alpha-80"
            >수수료 약 0.0035284 ETH</span
          >
        </div> -->
        <!-- 4 -->
      </div>

      <template #footer>
        <div class="flex justify-content-center align-items-center">
          <Button
            v-if="isBeforeTransmission"
            type="button"
            label="전송"
            class="bg-indigolight w-2"
            @click="sendTransmission(check)"
          />
          <Button
            v-else
            type="button"
            label="닫기"
            class="p-button-outlined p-button-secondary w-2"
            @click="closedDialog"
          />
        </div>
      </template>

      <!-- <Message v-show="isFail" severity="error">
        {{ errMessage }}
      </Message> -->
    </Dialog>
  </div>
  <ConfirmDiaLog @confirm-action="dialogAction" />
</template>

<script>
import {
  formatDate,
  getLastBlockTime,
  formatDateToNumber,
  formatDigits,
} from "@/common/formatDate.js";
import BigNumber from "bignumber.js";
import { blockchainFeeInfo, tokenListData } from "@/common/getDataList.js";
import { dialogToggleAction } from "@/common/dialogToggle.js";
import ConfirmDiaLog from "@/components/popup/common/ConfirmDiaLog.vue";
import constant from "@/common/constant";
import { getCurrentInstance, ref, watch } from "@vue/runtime-core";
import { ethers } from "ethers";
export default {
  components: {
    ConfirmDiaLog,
  },
  emits: ["dialog-action"],
  setup() {
    const display = ref(false);
    const isSlow = ref(false);
    const isNomal = ref(true);
    const isSpeed = ref(false);
    const isSelf = ref(false);
    const isSendEnd = ref(false);
    const isSelfSetting = ref(false);
    const isSendLoading = ref(false);
    const isloading = ref(false);
    const isNotOwnerSetting = ref(true);
    const fBlockFee = ref(0);
    const fBlockFer = ref(0);
    const maxFee = ref(0);
    const tip = ref("");
    const gasLimit = ref(0);
    const check = ref(0);
    const isBeforeTransmission = ref(true);
    const blockNum = ref(0);
    const lastblockTime = ref(0);

    //전송할 값 설정
    const sendDatas = ref({});

    //팝업공통
    const actionNm = ref("토큰");
    const tokenName = ref("");
    const whichAddress = ref("");
    const commonAddress = ref("");
    const privateKey = ref("");
    const contractAddress = ref("");
    const contractName = ref("");
    const transactionHash = ref("");

    //lockup
    const lockupAmount = ref(0);
    const lockupExpireDate = ref(new Date());

    //Token > Approve
    const approveSpender = ref("");
    const approveAllowance = ref("");

    //Token Time Lock > 신규 계약 생성
    const contractTokenAddress = ref("");
    const timeLockExpireDate = ref(new Date());

    //수수료설정
    const maxFeePerGas = ref("");
    const maxPriorityFeePerGas = ref("");

    //코인추전
    const coinAmount = ref();

    //멀티전송
    const multiSend = ref([]);
    const totalAmount = ref();

    //직접설정
    const selfGasfee = ref(0);
    const selfGasLimit = ref(0);

    const { getFee, getGasLimit } = blockchainFeeInfo();

    //부모에서 호출한 이벤트 체크, 취소번튼의 이벤트 체크
    const { display1, which, closeDialog1, showDialog2, datas, closeDialog2 } =
      // const { display1, which, closeDialog1, datas } =
      dialogToggleAction();
    watch(display1, () => {
      if (display1.value) {
        display.value = true;
        if (which.value === "Owner") {
          check.value = 0;
          whichAddress.value = "새 Owner";
          tokenName.value = datas.value.tokenName;
          commonAddress.value = datas.value.updateOwnerAddress;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          contractName.value = "ERC20Preset";
          isNotOwnerSetting.value = false;
        } else if (which.value === "approve") {
          check.value = 1;
          whichAddress.value = "From";
          tokenName.value = datas.value.tokenName;
          commonAddress.value = datas.value.fromAddress;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          approveSpender.value = datas.value.approveSpender;
          approveAllowance.value = datas.value.approveAllowance;
          contractName.value = "ERC20Preset";
        } else if (which.value === "setLock") {
          check.value = 2;
          whichAddress.value = "LockUp 주소";
          tokenName.value = datas.value.tokenName;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          commonAddress.value = datas.value.lockupAddress;
          lockupAmount.value = datas.value.lockupAmount;
          lockupExpireDate.value = datas.value.expireDate;
          contractName.value = "ERC20Preset";
        } else if (which.value === "release") {
          check.value = 3;
          actionNm.value = datas.value.actionNm;
          whichAddress.value = null;
          commonAddress.value = null;
          privateKey.value = datas.value.privateKey;
          tokenName.value = datas.value.tokenName;
          contractAddress.value = datas.value.contractAddress;
          contractName.value = "TokenTimelock";
        } else if (which.value === "deploy") {
          check.value = 4;
          actionNm.value = datas.value.actionNm;
          whichAddress.value = "배포 수령 지갑";
          commonAddress.value = datas.value.distributionAddress;
          privateKey.value = datas.value.privateKey;
          tokenName.value = datas.value.tokenName;
          contractAddress.value = datas.value.contractAddress;
          contractTokenAddress.value = datas.value.tokenAddress;
          timeLockExpireDate.value = datas.value.lockExpireTime;
          contractName.value = "TokenTimelock";
        } else if (which.value === "changeOwner") {
          check.value = 5;
          actionNm.value = datas.value.actionNm;
          whichAddress.value = "새 Owner";
          commonAddress.value = datas.value.updateOwnerAddress;
          isNotOwnerSetting.value = false;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contactAddress;
          contractName.value = "MultiSend";
        } else if (which.value === "transferOwnership") {
          check.value = 6;
          actionNm.value = datas.value.actionNm;
          whichAddress.value = "새 Owner";
          commonAddress.value = datas.value.updateOwnerAddress;
          isNotOwnerSetting.value = false;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contactAddress;
          contractName.value = "MultiTransferFrom";
        } else if (which.value === "charge") {
          check.value = 7;
          whichAddress.value = "Owner";
          actionNm.value = datas.value.actionNm;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          coinAmount.value = datas.value.amount;
          commonAddress.value = datas.value.ownerAddress;
          contractName.value = "MultiSend";
        } else if (which.value === "withdrawls") {
          check.value = 8;
          whichAddress.value = "전송주소List";
          commonAddress.value =
            datas.value.transferVOList.length === 1
              ? datas.value.transferVOList[0].address
              : datas.value.transferVOList[0].address + " Ox...";
          actionNm.value = datas.value.actionNm;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          console.log(datas.value.transferVOList);
          multiSend.value = datas.value.transferVOList;
          totalAmount.value = datas.value.totalAmount;
          contractName.value = "MultiSend";
        } else if (which.value === "multiTransferFrom") {
          check.value = 9;
          whichAddress.value = "전송주소List";
          commonAddress.value =
            datas.value.transferVOList.length === 1
              ? datas.value.transferVOList[0].toAddress
              : datas.value.transferVOList[0].toAddress + " Ox...";
          actionNm.value = datas.value.actionNm;
          privateKey.value = datas.value.ownerPrivateKey;
          contractAddress.value = datas.value.contractAddress;
          console.log(datas.value.transferVOList);
          multiSend.value = datas.value.transferVOList;
          totalAmount.value = datas.value.totalAmount;
          contractName.value = "MultiTransferFrom";
        }
        getFeeInfo();
      } else {
        display.value = false;
      }
    });
    //우측 상단 x 닫기 버튼의 이벤트 체크
    watch(display, () => {
      if (!display.value) {
        console.log(" >>>>>>> 1");
        closeDialog1();
      }
    });

    const { emit } = getCurrentInstance();

    // 느림, 보통, 빠름, 직접 설정 부분
    //수수료 정보 호출
    const getFeeInfo = async (no) => {
      isSendEnd.value = true;
      isSendLoading.value = true;
      isloading.value = true;
      isBeforeTransmission.value = false;
      const response = await getFee();
      if (no === 0) {
        tip.value = await response.data.maxPriorityFeePerGas.slow;
      } else if (no === 1) {
        tip.value = await response.data.maxPriorityFeePerGas.normal;
      } else if (no === 2) {
        tip.value = await response.data.maxPriorityFeePerGas.fast;
      } else {
        tip.value = await response.data.maxPriorityFeePerGas.normal;
      }
      blockNum.value = await response.data.latestBlockNumber;
      lastblockTime.value = await response.data.latestBlockTimestamp;
      fBlockFee.value = await response.data.latestBlockBaseFeePerGas;
      maxFee.value = await response.data.maxFeePerGas;
      maxFeePerGas.value = await response.data.maxFeePerGas;
      fBlockFer.value = parseInt(response.data.latestBlockGasUsedRate * 100);
      let data = {
        contractAddress: contractAddress.value,
        contractName: contractName.value,
        methodName: check.value === 0 ? "transferOwnership" : which.value,
        newOwner: commonAddress.value,
        privateKey: privateKey.value,
        arrayList: multiSend.value,
        expireDate: lockupExpireDate.value.getTime(),
        lockupAmount: lockupAmount.value,
        allowance: approveAllowance.value,
        approveSpender: approveSpender.value,
      };
      if (check.value === 4) {
        gasLimit.value = 450000;
      } else {
        const res = await getGasLimit(data);
        gasLimit.value = res.data;
      }
      isSendLoading.value = false;
      isloading.value = false;
      isBeforeTransmission.value = true;
      isSendEnd.value = false;
      maxPriorityFeePerGas.value = tip.value;
    };

    //느림
    const slowSend = async () => {
      isNomal.value = false;
      isSpeed.value = false;
      isSelf.value = false;
      isSelfSetting.value = false;
      await getFeeInfo(0);
    };
    //보통
    const nomalSend = async () => {
      isSlow.value = false;
      isSpeed.value = false;
      isSelf.value = false;
      isSelfSetting.value = false;
      await getFeeInfo(1);
    };
    //빠름
    const speedSend = async () => {
      isSlow.value = false;
      isNomal.value = false;
      isSelf.value = false;
      isSelfSetting.value = false;
      await getFeeInfo(2);
    };
    //직접 설정
    const selfSend = () => {
      isSlow.value = false;
      isNomal.value = false;
      isSpeed.value = false;
      isSelfSetting.value = true;
    };

    //api 연동 실제 action
    const { transactionCofirmed, status, doAction, goScanpage } =
      tokenListData();

    //전송하기
    const sendTransmission = (no) => {
      if (isSelfSetting.value) {
        maxPriorityFeePerGas.value = ethers.utils
          .parseUnits(String(selfGasfee.value), "gwei")
          .toString();
        gasLimit.value = String(selfGasfee.value);
      }
      isSendEnd.value = true;
      switch (no) {
        case 0:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            gasLimit: gasLimit.value,
            newOwner: commonAddress.value,
          };
          break;
        case 1:
          sendDatas.value = {
            amount: approveAllowance.value,
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            spender: approveSpender.value,
          };
          break;
        case 2:
          sendDatas.value = {
            address: commonAddress.value,
            amount: lockupAmount.value,
            contractAddress: contractAddress.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            privateKey: privateKey.value,
            releaseTime: formatDateToNumber(lockupExpireDate.value),
          };

          break;
        case 3:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
          };
          break;
        case 4:
          sendDatas.value = {
            beneficiary: commonAddress.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            privateKey: privateKey.value,
            releaseTime: formatDateToNumber(timeLockExpireDate.value),
            tokenAddress: contractTokenAddress.value,
          };
          break;
        case 5:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            newOwner: commonAddress.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
          };
          console.log(" >>>>>>> 5", sendDatas.value);
          break;
        case 6:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            newOwner: commonAddress.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
          };
          console.log(" >>>>>>> 6", sendDatas.value);
          break;
        case 7:
          sendDatas.value = {
            amount: coinAmount.value,
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
          };
          break;
        case 8:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            gasLimit: gasLimit.value,
            transferVOList: multiSend.value,
          };
          break;
        case 9:
          sendDatas.value = {
            contractAddress: contractAddress.value,
            privateKey: privateKey.value,
            maxFeePerGas: maxFeePerGas.value,
            maxPriorityFeePerGas: maxPriorityFeePerGas.value,
            gasLimit: gasLimit.value,
            transferVOList: multiSend.value,
          };
          break;
        default:
          break;
      }
      showDialog2(constant.dialog.CHECKSEND);
    };

    //GWEI 환산
    const getGWEI = (no, who) => {
      switch (who) {
        case "limit":
          return new BigNumber(no).toFormat();
        case "tip":
          return new BigNumber(no / 10 ** 9).toFormat();
        default:
          return parseInt(no / 10 ** 9);
      }
    };

    //변수값 리셋
    const resetAll = () => {
      sendDatas.value = {};
      blockNum.value = 0;
      lastblockTime.value = 0;
      actionNm.value = "토큰";
      tokenName.value = "";
      whichAddress.value = "";
      privateKey.value = "";
      contractAddress.value = "";
      contractName.value = "";
      transactionHash.value = "";
      isSlow.value = false;
      isNomal.value = true;
      isSpeed.value = false;
      isSelf.value = false;
      isSelfSetting.value = false;
      isBeforeTransmission.value = true;
      isSendLoading.value = false;
      isloading.value = false;
      isSendEnd.value = false;
      fBlockFee.value = 0;
      fBlockFer.value = 0;
      maxFee.value = 0;
      tip.value = "";
      maxFeePerGas.value = 0;
      maxPriorityFeePerGas.value = 0;
      gasLimit.value = 0;
      commonAddress.value = "";
      isNotOwnerSetting.value = true;
    };

    //최종 확인
    const dialogAction = async (state) => {
      console.log(state.state);
      if (state.state) {
        isBeforeTransmission.value = false;
        isSendLoading.value = true;
        isloading.value = true;
        let response;
        let hash;
        try {
          response = await doAction(check.value, sendDatas);
          hash = await response.data.transactionHash;
          while (!status.value) {
            await sleep(3000);
            await transactionCofirmed(hash);
          }
          isSendEnd.value = true;
          isloading.value = false;
          transactionHash.value = response.data.transactionHash;
        } catch (error) {
          console.log(error);
        }
      } else {
        closeDialog2;
        isSendEnd.value = false;
      }
    };

    const sleep = (ms) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };

    //다이아로그 종료
    const closedDialog = () => {
      resetAll();
      emit("dialog-action", { state: true });
      closeDialog1();
    };

    return {
      check,
      display,
      actionNm,
      tokenName,
      whichAddress,
      commonAddress,
      isSlow,
      isNomal,
      isSendEnd,
      isSpeed,
      isSelf,
      slowSend,
      nomalSend,
      speedSend,
      selfSend,
      resetAll,
      which,
      isSelfSetting,
      isSendLoading,
      isloading,
      isNotOwnerSetting,
      fBlockFee,
      maxFee,
      tip,
      gasLimit,
      isBeforeTransmission,
      sendTransmission,
      closedDialog,
      dialogAction,
      lockupAmount,
      lockupExpireDate,
      formatDate,
      approveSpender,
      approveAllowance,
      timeLockExpireDate,
      blockNum,
      getLastBlockTime,
      lastblockTime,
      getFeeInfo,
      fBlockFer,
      getGWEI,
      contractAddress,
      transactionHash,
      coinAmount,
      totalAmount,
      goScanpage,
      formatDigits,
      selfGasfee,
      selfGasLimit,
    };
  },
};
</script>

<style>
</style>