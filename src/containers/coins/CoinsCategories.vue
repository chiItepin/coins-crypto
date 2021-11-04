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
          placeholder="Enter id or name"
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
import { VaImage } from 'vuestic-ui';
import api from '../../api';

export default {
  components: {
    AgGridVue,
  },
  setup() {
    const vaToast = getCurrentInstance().appContext.config.globalProperties.$vaToast;
    const router = getCurrentInstance().appContext.config.globalProperties.$router;
    const modules = [ClientSideRowModelModule];

    const columnDefs = [
      {
        field: 'id',
        headerName: 'Id',
      },
      {
        field: 'top_3_coins',
        headerName: 'Top coins',
        cellRenderer: params => {
          // put the value in bold
          return '<div class="top-categories">' + params.value.map((val) => `<span><img src="${val}" /></span>`).join('') + '</div>';
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        sortable: true,
      },
      {
        field: 'market_cap',
        headerName: 'Market Cap',
        sortable: true,
        cellRenderer: params => {
          // put the value in bold
          return '$' + params.value;
        },
      },
      {
        field: 'market_cap_change_24h',
        headerName: 'Market Cap Change 24hr',
        sortable: true,
        cellRenderer: params => {
          // put the value in bold
          return params.value.toString().substring('0', 4) + '%';
        },
      },
      {
        field: 'volume_24h',
        headerName: '24hr Volume',
        sortable: true,
        cellRenderer: params => {
          // put the value in bold
          return '$' + params.value;
        },
      }
    ];

    const categories = ref([]);
    const searchValue = ref('');
    const isLoaded = ref(false);
    const filteredCoins = computed(() => categories.value.filter((category) => category.id.includes(searchValue.value.toLowerCase())
      || category.name.toLowerCase().includes(searchValue.value.toLowerCase())));

    const onCoinCellClicked = (event) => {
      router.push(`/coins/categories/${event.data.id}`);
    };

    onMounted(() => {
      api.getCoinCategories()
        .then((res) => {
          isLoaded.value = true;
          categories.value = res.data;
        })
        .catch((err) => {
          vaToast.init({
            message: err.response?.data?.error || 'Unknown error',
            color: 'danger',
          });
        });
    });

    return {
      categories,
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

.top-categories
   margin: auto
   display: table
   span
      margin: 0 $space-xxs
</style>s