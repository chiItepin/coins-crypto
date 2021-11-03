<template>
  <va-progress-bar
    v-if="!isLoaded"
    indeterminate
    style="max-width: 50%; margin: auto"
  />

  <section
    v-else
  >
    <div class="flex">
      <div class="flex-5">
        <va-input
          v-model="searchValue"
          clearable
          class="mb-4"
          placeholder="Enter symbol or name"
          label="Search"
          bordered
        />
      </div>
    </div>

    <div>
      <ag-grid-vue
        class="ag-theme-vuestic"
        style="width: 100%; height: 100%;"
        :column-defs="columnDefs"
        :row-data="filteredCoins"
        :modules="modules"
        :pagination-page-size="50"
        :pagination="true"
        @cell-clicked="onCoinCellClicked"
      />
    </div>
  </section>
</template>

<script>
import { onMounted, getCurrentInstance, ref, computed } from 'vue';
import { AgGridVue } from '@ag-grid-community/vue3';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import api from '../../api';

export default {
  components: { AgGridVue },
  setup() {
    const vaToast = getCurrentInstance().appContext.config.globalProperties.$vaToast;
    const router = getCurrentInstance().appContext.config.globalProperties.$router;
    const modules = [ClientSideRowModelModule];

    const columnDefs = [
      { field: 'id', headerName: 'Id' },
      { field: 'symbol', headerName: 'Symbol', sortable: true },
      { field: 'name', headerName: 'Name', sortable: true }
    ];

    const coins = ref([]);
    const searchValue = ref('');
    const isLoaded = ref(false);
    const filteredCoins = computed(() => coins.value.filter((coin) => coin.symbol.includes(searchValue.value.toLowerCase())
      || coin.name.toLowerCase().includes(searchValue.value.toLowerCase())));

    const onCoinCellClicked = (event) => {
      router.push(`/coins/${event.data.id}`);
    };

    onMounted(() => {
      api.listCoins()
        .then((res) => {
          isLoaded.value = true;
          coins.value = res.data;
        })
        .catch((err) => {
          vaToast.init({
            message: err.response?.data?.error || 'Unknown error',
            color: 'danger',
          });
        });
    });

    return {
      coins,
      isLoaded,
      searchValue,
      filteredCoins,
      modules,
      columnDefs,
      onCoinCellClicked,
    };
  },
};
</script>
<style lang="sass">
table
  width: 100%
</style>