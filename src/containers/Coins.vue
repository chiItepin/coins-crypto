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

    <div class="table-container">
      <table class="va-table va-table--hoverable va-table--striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Symbol</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="coin in filteredCoins"
            :key="coin.id"
          >
            <td>{{ coin.id }}</td>
            <td>{{ coin.symbol }}</td>
            <td>{{ coin.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import api from '../api';
import { onMounted, getCurrentInstance, ref, computed } from 'vue';

export default {
  setup() {
    const vaToast = getCurrentInstance().appContext.config.globalProperties.$vaToast;

    const coins = ref([]);
    const searchValue = ref('');
    const isLoaded = ref(false);
    const filteredCoins = computed(() => coins.value.filter((coin) => coin.symbol.includes(searchValue.value.toLowerCase())
      || coin.name.toLowerCase().includes(searchValue.value.toLowerCase())));

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
    };
  },
};
</script>
<style lang="sass">
table
  width: 100%
</style>