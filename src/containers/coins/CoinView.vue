<template>
  <va-progress-bar
    v-if="!isLoaded"
    indeterminate
    style="max-width: 50%; margin: auto"
  />

  <section
    v-else-if="coin.id"
  >
    <div class="row">
      <div class="flex xs12 sm6">
        <va-card
          square
          outlined
        >
          <va-card-title>
            <img
              :alt="coin.id"
              :src="coin.image.small "
            > {{ ` ${coin.name}` }}
          </va-card-title>
          <va-card-content>
            {{ coin.description.en }}
          </va-card-content>
        </va-card>
      </div>

      <div class="flex xs12 sm6">
        <va-card
          square
          outlined
        >
          <va-card-title>Community score</va-card-title>
          <va-card-content>
            {{ coin.community_score || 0 }}
          </va-card-content>

          <va-card-title>Liquidity score</va-card-title>
          <va-card-content>
            {{ coin.liquidity_score || 0 }}
          </va-card-content>

          <va-card-title>Reddit subscribers</va-card-title>
          <va-card-content>
            {{ coin.community_data.reddit_subscribers }}
          </va-card-content>

          <va-card-title>Twitter followers</va-card-title>
          <va-card-content>
            {{ coin.community_data.twitter_followers }}
          </va-card-content>
        </va-card>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, getCurrentInstance, ref } from 'vue';
import api from '../../api';

export default {
  setup() {
    const vaToast = getCurrentInstance().appContext.config.globalProperties.$vaToast;
    const { id } = getCurrentInstance().appContext.config.globalProperties.$route.params;

    const coin = ref({});
    const isLoaded = ref(false);

    onMounted(() => {
      api.getCoin(id)
        .then((res) => {
          isLoaded.value = true;
          coin.value = res.data;
        })
        .catch((err) => {
          console.error(err);
          vaToast.init({
            message: err.response?.data?.error || 'Unknown error',
            color: 'danger',
          });
        });
    });

    return {
      coin,
      isLoaded,
    };
  },
};
</script>
<style lang="sass" scoped>
img
  width: 100%
  max-width: $space-xs
  margin-right: $space-xxs

.flex
   text-align: left

.va-card
   margin: $space-xxs 10px
</style>