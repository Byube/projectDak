<template>
  <div class="card">
    <h5>제품 정보</h5>
    <DataTable
      :value="products"
      :sortField="sortRating"
      :sortOrder="sortOrder"
      v-model:filters="filters"
      :defaultSortOrder="-1"
      showGridlines
      scrollable
      scrollHeight="750px"
      :virtualScrollerOptions="{
        itemSize: 40,
        delay: 200,
        numToleratedItems: 6,
        showLoader: true,
      }"
    >
      <template #header>
        <TableHeader
          :sortRatingAvg="sortRatingAvg"
          :filterRatingAvg="filterRatingAvg"
          @search="searchKeyword"
          @initFilters="initFilter"
        />
      </template>
      <template #empty> No Product found. </template>
      <template #loading> Loading Product data. Please wait. </template>

      <ColumnGroup type="header">
        <Row>
          <Column header="No." field="idProduct" :rowspan="2" />
          <Column header="제품고유ID" field="idProduct" :rowspan="2" />
          <Column header="제품명" field="productTitle" :rowspan="2" />
          <Column header="제품사진" field="imageUrl" :rowspan="2" />
          <Column header="제품용량" field="volume" :rowspan="2" />
          <Column header="제품평점" field="ratingAvg" :rowspan="2" />
          <Column header="제품평가" field="ratingStatus" :rowspan="2" />
          <Column header="평가자수" field="reviewCount" :rowspan="2" />
          <Column header="제품가격" field="price" :rowspan="2" />
          <Column header="브랜드정보" :colspan="2" />
        </Row>
        <Row>
          <Column header="브랜드명" field="brand" />
          <Column header="브랜드사진" field="brand" />
        </Row>
      </ColumnGroup>

      <Column
        field="idProduct"
        bodyStyle="text-align:center"
        style="min-width: '30px'"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="20%" height="1rem" />
          </div>
        </template>
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column
        field="idProduct"
        style="min-width: '50px'"
        bodyStyle="text-align:center"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="20%" height="1rem" />
          </div>
        </template>
      </Column>
      <Column field="productTitle" style="min-width: '300px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
      </Column>
      <Column field="imageUrl" style="min-width: '100px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          <img
            :src="data.imageUrl"
            :alt="data.productTitle"
            style="width: 100px"
          />
        </template>
      </Column>
      <Column field="volume" style="min-width: '50px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="20%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          {{ data.volume }}
        </template>
      </Column>
      <Column field="ratingAvg" style="min-width: '260px'" :sortable="true">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="60%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          <div class="tooltip">
            <Rating
              :modelValue="data.ratingAvg"
              :readonly="true"
              :cancel="false"
            />
            <span class="tooltiptext tooltip-bottom">{{ data.ratingAvg }}</span>
          </div>
        </template>
      </Column>
      <Column field="ratingStatus" header="제품평가" style="min-width: '100px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="30%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          <Badge
            :value="data.ratingStatus"
            :severity="data.ratingStatus === '긍정적' ? 'success' : 'danger'"
          ></Badge>
        </template>
      </Column>
      <Column
        field="reviewCount"
        style="min-width: '100px'"
        bodyStyle="text-align: center"
      >
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="30%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          {{ formatPrice(data.reviewCount) + " 명" }}
        </template>
      </Column>
      <Column field="price" style="min-width: '100px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="30%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          {{
            formatPrice(data.price) !== "정보없음"
              ? formatPrice(data.price) + "원"
              : formatPrice(data.price)
          }}
        </template>
      </Column>

      <Column field="brand" style="min-width: '100px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          {{ data.brand.brandTitle }}
        </template>
      </Column>
      <Column field="brand" style="min-width: '100px'">
        <template #loading>
          <div
            class="flex align-items-center"
            :style="{ height: '17px', 'flex-grow': '1', overflow: 'hidden' }"
          >
            <Skeleton width="40%" height="1rem" />
          </div>
        </template>
        <template #body="{ data }">
          <img
            :src="data.brand.imageUrl"
            alt="data.brand.brandTitle"
            style="width: 80px"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script>
import { ref } from "vue";
// import api from "@/api/index.js";
import constant from "@/common/constant.js";
import BigNumber from "bignumber.js";
import TableHeader from "@/components/Header.vue";
import { FilterMatchMode, FilterOperator } from "primevue/api";

import api from "axios";
export default {
  components: {
    TableHeader,
  },
  setup() {
    const products = ref([]);
    const totalProduct = ref(0);
    const sortRating = ref("ratingAvg");
    const sortOrder = ref(-1);
    const sortRatingAvg = constant.data.SORTDATA;
    const filterRatingAvg = constant.data.FILTERDATA;
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      ratingStatus: {
        operator: FilterOperator.OR,
        constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
      },
      productTitle: {
        operator: FilterOperator.AND,
        constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
      },
    });

    //api 연동 데이터 가져오기
    const getUrlData = async () => {
      // let response = await api.get(constant.url.GETDATA);
      let response = await api.get(
        "https://s3.ap-northeast-2.amazonaws.com/public.glowday.com/test/app/products.json"
      );
      let res = [];
      totalProduct.value = await response.data.products.length;

      //필터링 > 3점 이상 긍정, 이하 부정 처리
      for (let i = 0; i < (await response.data.products.length); i++) {
        let element = await response.data.products[i];
        let data = {
          ...element,
          ratingStatus: element.ratingAvg > 3 ? "긍정적" : "부정적",
        };
        await res.push(data);
      }
      console.log(res);
      products.value = await res;
    };
    getUrlData();

    //금액 포맷
    const formatPrice = (price) => {
      if (price === undefined) {
        return "정보없음";
      }
      return new BigNumber(price).toFormat();
    };

    //검색 기능
    const searchKeyword = (searchKey) => {
      switch (searchKey.no) {
        case 0:
          sortOrder.value = searchKey.sort;
          break;
        case 1:
          filters.value["ratingStatus"].constraints[0].value =
            searchKey.filter === "all" ? null : searchKey.filter;
          break;
        case 2:
          console.log("gds");
          filters.value["productTitle"].constraints[0].value =
            searchKey.keywords;
          console.log(
            "gds",
            filters.value["productTitle"].constraints[0].value
          );
          break;
        default:
          break;
      }
      console.log(searchKey);
      // sortOrder.value = 1;
    };

    //검색 초기화
    const initFilter = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        ratingStatus: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
        },
        productTitle: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
      };
      sortOrder.value = -1;
      getUrlData();
    };

    return {
      products,
      sortRating,
      sortOrder,
      sortRatingAvg,
      filterRatingAvg,
      filters,
      formatPrice,
      searchKeyword,
      initFilter,
    };
  },
};
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
  display: block;
}
.tooltip .tooltiptext {
  visibility: hidden;
  width: 145px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
}
.tooltip:hover .tooltiptext {
  visibility: visible;
}
/* 툴팁 화살표 기본 스타일 설정 시작 */
.tooltip .tooltiptext::after {
  content: " ";
  position: absolute;
  border-style: solid;
  border-width: 5px;
}
/* 툴팁 화살표 기본 스타일 설정 끝 */
.tooltip .tooltip-bottom {
  width: 145px;
  top: 150%;
  left: 50%;
  margin-left: -60px;
}
.tooltip .tooltip-bottom::after {
  bottom: 100%;
  left: 45%;
  margin-left: -5px;
  border-color: transparent transparent black transparent;
}
</style>