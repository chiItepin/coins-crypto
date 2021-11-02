<template>
  <va-progress-bar
    v-if="!isLoaded"
    indeterminate
    style="max-width: 50%; margin: auto"
  />

  <section
    v-else
    class="table-container"
  >
    <table class="va-table va-table--hoverable va-table--striped">
      <thead>
        <tr>
          <th>Coin</th>
          <th>Total Volume</th>
          <th>Market Cap</th>
          <th>Market Percentage</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="[coin, volume] in Object.entries(globalData.total_volume)"
          :key="coin"
        >
          <td>{{ coin }}</td>
          <td>{{ volume }}</td>
          <td>{{ getCoinMarketCap(coin) }}</td>
          <td>{{ getCoinMarketCapPercentage(coin) + '%' }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import api from '../api';
import { onMounted, getCurrentInstance, ref } from 'vue';

export default {
  setup() {
    const vaToast = getCurrentInstance().appContext.config.globalProperties.$vaToast;

    let globalData = ref({});
    const isLoaded = ref(false);

    /**
     * @param {string} coin
     * @returns {number} market cap
     */
    const getCoinMarketCap = (coin) => {
      return globalData.value.total_market_cap?.[coin] || 0;
    };

    /**
     * @param {string} coin
     * @returns {number} market cap
     */
    const getCoinMarketCapPercentage = (coin) => {
      const percentage = globalData.value.market_cap_percentage?.[coin]?.toString();
      return percentage?.substring(0, 4) || 0;
    };

    onMounted(() => {
      api.getGlobalData()
        .then((res) => {
          isLoaded.value = true;
          globalData.value = { ...res.data.data };
        })
        .catch((err) => {
          vaToast.init({
            message: err.response?.data?.error || 'Unknown error',
            color: 'danger',
          });
        });
    });

    return {
      globalData,
      isLoaded,
      getCoinMarketCap,
      getCoinMarketCapPercentage,
    };
  },
};
</script>
<style lang="sass">
table
  width: 100%
</style>