<script setup>
import Button from 'primevue/button';
import { ref } from 'vue';
import VueTailwindDatepicker from 'vue-tailwind-datepicker';

import HelloWorld from './components/HelloWorld.vue';
import TheWelcome from './components/TheWelcome.vue';

const dateValue = ref([]);

const formatter = ref({
    date: 'YYYY-MM-DD',
    month: 'MMM',
});

const dDate = (date) => {
    return date < new Date();
};
</script>

<template>
    <header>
        <div class="p-8">
            <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        </div>

        <!-- <div class="wrapper">
            <HelloWorld msg="You did it!" />
        </div> -->
    </header>

    <Button>啦啦啦</Button>
    <i class="pi pi-check"></i>

    <main>
        <div class="p-8">
            <vue-tailwind-datepicker overlay as-single v-model="dateValue" class="my-4 w-64" />
            <div class="w-[400px]">
                鑑於對人類家庭所有成員的固有尊嚴及其平等的和不移的權利的承認，乃是世界自由、正義與和平的基礎
            </div>
            <div class="w-[400px]">
                In view of the recognition of the inherent dignity and of the equal and inalienable
                rights of all members of the human family, which is the foundation of freedom,
                justice and peace in the world.
            </div>
            <vue-tailwind-datepicker
                :formatter="formatter"
                :disable-date="dDate"
                overlay
                as-single
                v-model="dateValue"
                class="my-4 w-64" />
            <vue-tailwind-datepicker
                :formatter="formatter"
                overlay
                as-single
                use-range
                v-model="dateValue"
                class="my-4 w-[400px]" />
        </div>
    </main>
</template>

<style scoped>
header {
    line-height: 1.5;
}

.logo {
    display: block;
    margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    .logo {
        margin: 0 2rem 0 0;
    }

    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
