<script setup>
import IconLanguage from './components/icons/IconLanguage.vue';
import IconSearch from './components/icons/IconSearch.vue';
import IconCopyright from './components/icons/IconCopyright.vue';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import DatePicker from './components/DatePicker.vue';

import Calendar from 'primevue/calendar';

import Dialog from 'primevue/dialog';

import InputText from 'primevue/inputtext';

import SelectButton from 'primevue/selectbutton';

import Dropdown from 'primevue/dropdown';

import './assets/flags.css';

import Rating from 'primevue/rating';

import Textarea from 'primevue/textarea';

import Button from 'primevue/button';

import FileUpload from 'primevue/fileupload';

import Toast from 'primevue/toast';

import { useToast } from 'primevue/usetoast';

import Divider from 'primevue/divider';

import Checkbox from 'primevue/checkbox';

import Badge from 'primevue/badge';

import { ref } from 'vue';

const valueFirstName = ref('Hastings');

const vauleLastName = ref('Skerratt');

const date = ref('06/09/2023');

const value = ref(1);

const valueGender = ref('Femel');

const optionsGender = ref(['Femel', 'Male']);

const valueTextarea = ref(
    'In view of the recognition of the inherent dignity and of the equal and inalienable rights of all members of the human family, which is the foundation of freedom, justice and peace in the world.'
);

const selectedCountry = ref({ name: 'Australia', code: 'AU' });

const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
]);

const toastUpload = useToast();

const onUpload = () => {
    toastUpload.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
};

const checkBox = ref();

const checkedAll = ref(false);

const toastShow = useToast();

const clickToast = () => {
    toastShow.add({
        severity: 'info',
        summary: 'Info',
        detail: 'There is a toast',
        life: 3000,
    });
};

const selectAll = function (event, i) {
    console.log('event', event);
};
</script>

<script>
import cols from '../data/user-cols.json';
import users from '../data/users.json';
import IconEdit from './components/icons/IconEdit.vue';
import IconEye from './components/icons/IconEye.vue';
import IconSort from './components/icons/IconSort.vue';
import IconSortDown from './components/icons/IconSortDown.vue';
import IconSortUp from './components/icons/IconSortUp.vue';
import IconTrash from './components/icons/IconTrash.vue';
import {
    Dataset,
    DatasetInfo,
    DatasetItem,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from '../libs/vue-dataset-tailwindcss/vue-dataset.es';

export default {
    name: 'App',
    components: {
        Dataset,
        DatasetItem,
        DatasetInfo,
        DatasetPager,
        DatasetSearch,
        DatasetShow,
        // CustomSearch,
        IconEye,
        IconEdit,
        IconTrash,
        IconSort,
        IconSortUp,
        IconSortDown,
    },
    data() {
        return {
            searchString: '',
            users,
            cols,
            statusClass: {
                Active: 'text-success',
                Away: 'text-warning',
                'Do not disturb': 'text-danger',
                Invisible: 'text-secondary',
            },
            selected: 5,
            active: true,
            away: true,
            datasetView: false,
            datasetEdit: false,
            datasetDelete: false,
            userIds: [],
        };
    },
    computed: {
        sortBy() {
            return this.cols.reduce((acc, o) => {
                if (o.sort) {
                    o.sort === 'asc' ? acc.push(o.field) : acc.push(`-${o.field}`);
                }

                return acc;
            }, []);
        },
    },
    methods: {
        click(event, i) {
            let toset;
            const sortEl = this.cols[i];

            if (!event.shiftKey) {
                this.cols.forEach((o) => {
                    if (o.field !== sortEl.field) {
                        o.sort = '';
                    }
                });
            }
            if (!sortEl.sort) {
                toset = 'asc';
            }
            if (sortEl.sort === 'desc') {
                toset = event.shiftKey ? '' : 'asc';
            }
            if (sortEl.sort === 'asc') {
                toset = 'desc';
            }
            sortEl.sort = toset;
        },
        // selectAll: (event, i) => {
        //     console.log('event', event);
        //     console.log('this.$refs', this.$refs);
        //     // console.log('this.checkedAll', this.checkedAll);
        // },
    },
};
</script>

<template>
    <div>
        <header class="w-full p-4 bg-white shadow-xl z-50 sm:fixed">
            <div class="flex items-center justify-between text-lg">
                <div id="banner" class="">
                    <a href="#" class="flex items-center">
                        <img src="./assets/logo.svg" alt="網站 Logo" class="h-8" />
                        <span
                            class="ml-6 pl-6 self-center whitespace-nowrap border-l-2 border-[#005087] font-bold text-[#005087]"
                            >網站名稱</span
                        >
                    </a>
                </div>
                <div id="nav" class="flex items-center space-x-6 font-semibold text-[#005087]">
                    <div class="group relative px-1">
                        <a href="#">Solutions</a>
                        <span
                            className="absolute -bottom-8 left-0 w-0 h-[5px] bg-[#64DCF0] transition-all delay-150 group-hover:delay-300 duration-300 group-hover:w-full" />
                    </div>
                    <div class="group relative">
                        <a href="#">Service</a>
                        <span
                            className="absolute -bottom-8 left-0 w-0 h-[5px] bg-[#64DCF0] transition-all delay-150 group-hover:delay-300 duration-300 group-hover:w-full" />
                    </div>
                    <div class="group relative">
                        <a href="#">Support</a>
                        <span
                            className="absolute -bottom-8 left-0 w-0 h-[5px] bg-[#64DCF0] transition-all delay-150 group-hover:delay-300 duration-300 group-hover:w-full" />
                    </div>
                    <button
                        class="rounded-full bg-[#F0F0F0] p-2 hover:bg-[#64DCF0] hover:delay-150">
                        <a href="#"><IconLanguage /></a>
                    </button>
                    <button
                        class="rounded-full bg-[#F0F0F0] p-2 hover:bg-[#64DCF0] hover:delay-150">
                        <a href="#"><IconSearch /></a>
                    </button>
                </div>
            </div>
        </header>
        <div class="flex flex-col h-screen">
            <div class="sm:mb-auto sm:mt-20">
                <div class="p-5 bg-[#F0F0F0] sm:w-60 sm:h-screen sm:fixed">
                    <Accordion :activeIndex="2">
                        <AccordionTab header="MSBG">
                            <p class="pl-6 -mt-4">JAPAN</p>
                        </AccordionTab>
                        <AccordionTab header="SRBG">
                            <p class="pl-6 -mt-4">CHINA</p>
                        </AccordionTab>
                        <AccordionTab header="DSBG">
                            <p class="pl-6 -mt-4 pb-4">Taiwan</p>
                            <p class="pl-6 pb-4">US</p>
                            <p class="pl-6">Europe</p>
                        </AccordionTab>
                        <AccordionTab header="SHBG">
                            <p class="pl-6 -mt-4">Slovakia</p>
                        </AccordionTab>
                        <AccordionTab header="EEBG">
                            <p class="pl-6 -mt-4">India</p>
                        </AccordionTab>
                    </Accordion>
                </div>
                <router-view />
            </div>
            <div class="flex items-center justify-end p-5 sm:ml-60 bg-[#F5F5F5] text-[#707070]">
                <div><IconCopyright /></div>
                <div class="pl-1">2023 AUO Corporation. All Rights Reserved.</div>
            </div>
        </div>
    </div>
</template>
