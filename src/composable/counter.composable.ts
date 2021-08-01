import { SmokeStore } from "@/helper/storage"
import { InjectionKey, provide, inject, ref } from "@vue/composition-api";

const injectionKey: InjectionKey<any> = Symbol('smokeCounter');

export const smokeCounter = () => {
    const date= new Date();
    const store = new SmokeStore()

    const count = ref(0);

    const button = () => {
        store.insertSmokeStats();
        count.value++;
    }

    const init = async () => {
        count.value = (await store.getUTCMonthSmoke(date.getUTCMonth()+1, date.getUTCFullYear())).length;
    }

    provide(injectionKey, {button, count});

    return {
        button,
        count,
        init,
    }
}

export const injectSmokeCounter = () => {
    const smoke = inject(injectionKey);

    if(!smoke) {
        throw 'please inject smoke counter';
    }

    return smoke
}