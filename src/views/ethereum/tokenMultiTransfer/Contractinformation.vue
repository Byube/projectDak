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
              @change="getbalanceAll"
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
            />
          </div>
        </div>
        <!-- 1 -->
      </div>
    </div>

    <div class="card">
      <div class="card-container purple-container overflow-hidden">
        <!-- 1 -->
        <div class="flex">
          <div
            class="
              flex-initial flex
              w-2
              align-items-center
              justify-content-start
              font-bold
              text-black
              ml-5
              border-round
            "
          >
            <p class="text-2xl">전체 거래내역</p>
          </div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-center
              m-2
              px-3
              py-1
              border-round
            "
          ></div>
          <div
            class="
              flex-1 flex
              align-items-center
              justify-content-end
              font-bold
              px-1
              py-3
              border-round
            "
          >
            <i
              @click="getbalanceAll"
              class="pi pi-sync cursor-pointer ml-3 text-2xl"
            />
          </div>
        </div>
        <!-- 1 -->
        <!-- 2 -->
        <div class="flex h-full">
          <div
            class="
              col-12
              align-items-center
              justify-content-center
              m-2
              px-3
              py-1
              border-round
            "
          >
            <DataTable
              :value="datas"
              :rowHover="true"
              :loading="loading1"
              :paginator="true"
              :rows="10"
              breakpoint="1080px"
              responsiveLayout="stack"
            >
              <template #empty>
                No datas found.<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
              </template>
              <template #loading>
                Loading customers data. Please wait.
              </template>
              <Column
                header="트랜잭션 해시"
                field="transactionHash"
                bodyStyle="text-align:center"
                bodyClass="hash-txd"
                headerStyle="width: 10%"
              >
                <template #body="{ data }">
                  <a
                    class="cursor-pointer text-blue-300 hover:underline"
                    @click="goScanpage(data.transactionHash)"
                  >
                    <span>{{ data.transactionHash }}</span>
                  </a>
                </template>
              </Column>
              <Column
                header="메소드"
                field="event"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span
                    :class="
                      'customer-badge status-' +
                      (data.event === 'OwnershipTransferred'
                        ? 'proposal'
                        : 'qualified')
                    "
                    >{{
                      data.event === "OwnershipTransferred"
                        ? "Owner 변경"
                        : data.event === "MultiTransferred"
                        ? "멀티전송"
                        : data.event
                    }}</span
                  >
                </template>
              </Column>
              <Column
                header="받는주소 수"
                field="data"
                bodyStyle="text-align:center"
                headerStyle="width: 20%"
              >
                <template #body="{ data }">
                  <span>
                    {{
                      data.event === "OwnershipTransferred"
                        ? ""
                        : parseFloat(Number(data.data))
                    }}
                  </span>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <!-- 2 -->
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { tokenListData } from "@/common/getDataList.js";
export default {
  setup() {
    const datas = ref([]);
    const loading1 = ref(false);
    const contractSelected = ref("");

    const {
      getContractList,
      contractList,
      getEvents,
      goScanpage,
    } = tokenListData();
    getContractList(1);

    //계약 셀렉 시 전체 데이터 가져오기
    const getbalanceAll = async () => {
      loading1.value = true;
      let response = await getEvents(
        contractSelected.value,
        "MultiTransferFrom"
      );
      datas.value = await response.data;
      loading1.value = false;
      console.log(response);
    };

    //변수값 리셋
    // const resetAll = () => {
    //   contractSelected.value = "";
    //   isVisible.value = false;
    //   isloading.value = false;
    // };

    return {
      datas,
      loading1,
      contractList,
      contractSelected,
      getbalanceAll,
      goScanpage,
    };
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/demo/badges.scss";
</style>