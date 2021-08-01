<template>
  <div class="home">
    <router-link class='box has-background-info' tag="div" :to='{name: "nowAnalysis"}'>
      <h3 class='title has-text-light'>{{current}}</h3>
      <h3 class='title has-text-light'>
        {{count}}
      </h3>
    </router-link>

    <router-link tag="div" :to='{name: "Analysis", params: {key: smoke.date}}' class='box' v-for="(smoke, i) in smokes" :key='i'>
      <h3 class='title'>
        {{smoke.date}}
      </h3>

      <h3 class='title'>
        {{smoke.smoked.length}}
      </h3>
    </router-link>
  </div>
</template>

<script lang="ts">
import { injectSmokeCounter } from '@/composable/counter.composable';
import { SmokeStore } from '@/helper/storage'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  data: () => ({
    smokes: [] as { date: string; smoked: Date[] | null; }[],
    current: ""
  }),
  setup() {
    const store = new SmokeStore();

    const {count} = injectSmokeCounter();

    return {
      getAllSmoke: store.getAllMonthSmoke,
      getSmokeMonth: store.getUTCMonthSmoke,
      count
    }
  },
  async mounted() {
    this.current = `${(new Date().getUTCMonth()+1 < 10) ? ('0'):('')}${new Date().getUTCMonth()+1}-${new Date().getUTCFullYear()}`;
    this.smokes = await this.getAllSmoke();
    this.smokes.sort((a, b) => {
      const aIndex = Number(a.date.split('-')[0]) + Number(a.date.split('-')[1]);
      const bIndex = Number(b.date.split('-')[0]) + Number(b.date.split('-')[1]);

      return bIndex-aIndex;
    });

    if(this.smokes[0].date === this.current) {
      this.smokes.splice(0, 1);
    }
  },
  methods: {
    async reloadCurrentMonth() {
      const date = new Date();
      this.smokes[0].smoked = await this.getSmokeMonth(date.getUTCMonth()+1, date.getUTCFullYear());
    }
  }
})
</script>

<style scoped>
.home {
  width: 100%;
}
.box {
  width: 100%;
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  
}
</style>