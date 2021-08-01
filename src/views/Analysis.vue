<template>
    <div class='hero'>
        <apexchart :series='[{data: series}]' :options='{chart: {id: "smoking-monthly"}, markers: {size: 5}}'></apexchart>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import {SmokeStore} from '@/helper/storage';
export default defineComponent({
    data: () => ({
        series: [] as {x: string, y: number}[],
    }),
    async mounted() {
        const store = new SmokeStore();

        const data = await store.getUTCMonthSmoke(Number(this.$route.params.key.split('-')[0]), Number(this.$route.params.key.split('-')[1]));
        const sortedData = [] as {day: number, number: number}[];

        data.forEach((smoke) => {
            const index = sortedData.findIndex(elem => elem.day == new Date(smoke).getDate());

            if(index == -1) {
                sortedData.push({day: new Date(smoke).getDate(), number: 1});
            }
            else {
                sortedData[index].number ++;
            }
        })

        this.series = sortedData.map(elem => ({
            x: `${elem.day}/${this.$route.params.key.split('-')[0]}/${this.$route.params.key.split('-')[1]}`,
            y: elem.number
        }));
    }
})
</script>
