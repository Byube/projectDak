<template>
  <div class="card">
    <DataView
      :value="products"
      :layout="layout"
      :paginator="true"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="grid grid-nogutter">
          <div class="col-6" style="text-align: left">
            <Dropdown
              v-model="sortKey"
              :options="sortOptions"
              optionLabel="label"
              placeholder="Sort By Price"
              @change="onSortChange($event)"
            />
          </div>
          <div class="col-6" style="text-align: right">
            <DataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12">
          <div class="product-list-item">
            <img :src="slotProps.data.imageUrl" :alt="slotProps.productTitle" />
            <div class="product-list-detail">
              <div class="product-name">{{ slotProps.productTitle }}</div>
              <div class="product-description">
                {{ slotProps }}
              </div>
              <Rating
                :modelValue="slotProps.ratingAvg"
                :readonly="true"
                :cancel="false"
              ></Rating>
              <i class="pi pi-tag product-category-icon"></i
              ><span class="product-category">
                <!-- {{ slotProps.data.category }} -->
              </span>
            </div>
            <div class="product-list-action">
              <span class="product-price">${{ slotProps.price }}</span>
              <!-- <Button
                icon="pi pi-shopping-cart"
                label="Add to Cart"
                :disabled="slotProps.idBrand === 'OUTOFSTOCK'"
              ></Button>
              <span
                :class="
                  'product-badge status-' +
                  slotProps.data.inventoryStatus.toLowerCase()
                "
              > -->
                <!-- {{ slotProps.data.inventoryStatus }} -->
              <!-- </span> -->
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 md:col-12">
          <div class="product-grid-item card">
            <div class="product-grid-item-top">
              <div>
                <i class="pi pi-tag product-category-icon"></i>
                <span class="product-category">
                  {{slotProps}}
                </span>
              </div>
              <!-- <span
                :class="
                  'product-badge status-' +
                  slotProps.data.inventoryStatus.toLowerCase()
                "
                >{{ slotProps.data.inventoryStatus }}</span
              > -->
            </div>
            <div class="product-grid-item-content">
              <img :src="slotProps.data.imageUrl" :alt="slotProps.productTitle" />
              <div class="product-name">{{ slotProps.productTitle }}</div>
              <div class="product-description">
                <!-- {{ slotProps.data.description }} -->
              </div>
              <Rating
                :modelValue="slotProps.ratingAvg"
                :readonly="true"
                :cancel="false"
              />{{ slotProps.ratingAvg }}
            </div>
            <div class="product-grid-item-bottom">
              <span class="product-price">${{ slotProps.price }}</span>
              <!-- <Button
                icon="pi pi-shopping-cart"
                :disabled="slotProps.data.inventoryStatus === 'OUTOFSTOCK'"
              ></Button> -->
            </div>
          </div>
        </div>
      </template>
    </DataView>
  </div>
  <div class="card">
    <Rating :modelValue="val1" :readonly="true" :cancel="false" />{{ val1 }}
  </div>
</template>

<script>
import { ref } from "vue";
// import { ref, onMounted } from "vue";
// import ProductService from "../service/ProductService.js";
import api from "@/api/index.js";
import constant from '@/common/constant.js'

export default {
  setup() {
    // onMounted(() => {
    //   productService.value
    //     .getProducts()
    //     .then((data) => (products.value = data));
    // });

    const products = ref();
    // const productService = ref(new ProductService());
    const layout = ref("grid");
    const val1 = ref(4.3);
    const sortKey = ref();
    const sortOrder = ref();
    const sortField = ref();
    const sortOptions = ref([
      { label: "Price High to Low", value: "!price" },
      { label: "Price Low to High", value: "price" },
    ]);
    const onSortChange = (event) => {
      console.log(event.value);
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf("!") === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
      } else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
      }
    };
    const getUrlData = async () => {
      let response = await api.get(constant.url.GETDATA);
      console.log(response.data);
      products.value = await response.data.products;
    };
    getUrlData();
    return {
      products,
      layout,
      sortKey,
      sortOrder,
      sortField,
      sortOptions,
      onSortChange,
      val1,
    };
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}

.product-description {
  margin: 0 0 1rem 0;
}

.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.product-category {
  font-weight: 600;
  vertical-align: middle;
}

::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;

  img {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 2rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .p-rating {
    margin: 0 0 0.5rem 0;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    align-self: flex-end;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
  }

  .p-button {
    margin-bottom: 0.5rem;
  }
}

::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);

  .product-grid-item-top,
  .product-grid-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  img {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin: 2rem 0;
  }

  .product-grid-item-content {
    text-align: center;
  }

  .product-price {
    font-size: 1.5rem;
    font-weight: 600;
  }
}

@media screen and (max-width: 576px) {
  .product-list-item {
    flex-direction: column;
    align-items: center;

    img {
      margin: 2rem 0;
    }

    .product-list-detail {
      text-align: center;
    }

    .product-price {
      align-self: center;
    }

    .product-list-action {
      display: flex;
      flex-direction: column;
    }

    .product-list-action {
      margin-top: 2rem;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  }
}
</style>