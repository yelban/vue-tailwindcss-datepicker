<script setup>
import IconLanguage from '../components/icons/IconLanguage.vue';
import IconSearch from '../components/icons/IconSearch.vue';
import IconCopyright from '../components/icons/IconCopyright.vue';

import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

import Calendar from 'primevue/calendar';

import Dialog from 'primevue/dialog';

import InputText from 'primevue/inputtext';

import SelectButton from 'primevue/selectbutton';

import Dropdown from 'primevue/dropdown';

import '../assets/flags.css';

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
import cols from '../../data/user-cols.json';
import users from '../../data/users.json';
import IconEdit from '../components/icons/IconEdit.vue';
import IconEye from '../components/icons/IconEye.vue';
import IconSort from '../components/icons/IconSort.vue';
import IconSortDown from '../components/icons/IconSortDown.vue';
import IconSortUp from '../components/icons/IconSortUp.vue';
import IconTrash from '../components/icons/IconTrash.vue';
import {
    Dataset,
    DatasetInfo,
    DatasetItem,
    DatasetPager,
    DatasetSearch,
    DatasetShow,
} from '../../libs/vue-dataset-tailwindcss/vue-dataset.es';

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
    <div id="datapicker" class="p-5 sm:ml-60">
        <Dialog
            v-model:visible="datasetView"
            modal
            header="Dataset View"
            :style="{ width: '75vw' }">
            <div>
                <div class="card flex flex-column md:flex-row gap-3 mt-2">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                        </span>
                        <InputText v-model="valueFirstName" placeholder="First Name" />
                    </div>
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                        </span>
                        <InputText v-model="vauleLastName" placeholder="Last Name" />
                    </div>
                </div>
                <div class="card">
                    <div
                        class="flex justify-content-between flex-wrap card-container mt-6">
                        <div class="flex align-items-center justify-content-center">
                            <Toast />
                            <FileUpload
                                mode="basic"
                                name="demo[]"
                                url="./upload.php"
                                accept="image/*"
                                :maxFileSize="1000000"
                                @upload="onUpload"
                                chooseLabel="File Upload" />
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <SelectButton
                                v-model="valueGender"
                                :options="optionsGender"
                                aria-labelledby="basic" />
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <span class="p-inputgroup-addon"> Birthday </span>
                            <Calendar v-model="date" showIcon />
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div
                        class="flex justify-content-between flex-wrap card-container mt-6">
                        <div class="flex align-items-center justify-content-center">
                            <Dropdown
                                v-model="selectedCountry"
                                :options="countries"
                                filter
                                optionLabel="name"
                                placeholder="Select a Country"
                                class="w-full md:w-14rem">
                                <template #value="slotProps">
                                    <div
                                        v-if="slotProps.value"
                                        class="flex align-items-center">
                                        <img
                                            :alt="slotProps.value.label"
                                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                                            style="width: 18px" />
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <img
                                            :alt="slotProps.option.label"
                                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                                            style="width: 18px" />
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Rating v-model="value" />
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <div
                                class="card flex flex-wrap justify-content-center gap-2">
                                <Badge value="2"></Badge>
                                <Badge value="8" severity="success"></Badge>
                                <Badge value="6" severity="info"></Badge>
                                <Badge value="9" severity="warning"></Badge>
                                <Badge value="5" severity="danger"></Badge>
                            </div>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Toast />
                            <Button label="Show Notice" @click="clickToast()" />
                        </div>
                    </div>
                </div>
                <div class="card mt-6">
                    <div class="flex justify-content-between flex-wrap card-container">
                        <div class="flex align-items-center justify-content-center">
                            <Checkbox
                                v-model="checkBox"
                                inputId="ingredient1"
                                name="checkbox"
                                value="MSBG" />
                            <label for="ingredient1" class="ml-2"> MSBG </label>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Checkbox
                                v-model="checkBox"
                                inputId="ingredient2"
                                name="checkbox"
                                value="SRBG" />
                            <label for="ingredient2" class="ml-2"> SRBG </label>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Checkbox
                                v-model="checkBox"
                                inputId="ingredient3"
                                name="checkbox"
                                value="DSBG" />
                            <label for="ingredient3" class="ml-2"> DSBG </label>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Checkbox
                                v-model="checkBox"
                                inputId="ingredient4"
                                name="checkbox"
                                value="SHBG" />
                            <label for="ingredient4" class="ml-2"> SHBG </label>
                        </div>
                        <div class="flex align-items-center justify-content-center">
                            <Checkbox
                                v-model="checkBox"
                                inputId="ingredient5"
                                name="checkbox"
                                value="EEBG" />
                            <label for="ingredient5" class="ml-2"> EEBG </label>
                        </div>
                    </div>
                </div>
                <div class="card mt-6">
                    <div class="flex justify-content-between flex-wrap card-container">
                        <div
                            class="flex align-items-center justify-content-center p-float-label">
                            <Textarea v-model="valueTextarea" rows="5" cols="90" />
                            <label>Profile</label>
                        </div>
                    </div>
                </div>
                <Divider align="right" type="dashed" class="mt-6">
                    <b>Divider</b>
                </Divider>
            </div>
        </Dialog>
        <Dialog
            v-model:visible="datasetEdit"
            modal
            header="Dataset Edit"
            :style="{ width: '75vw' }">
            <div>
                <div class="card flex flex-column md:flex-row gap-3">
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                        </span>
                        <InputText placeholder="First Name" />
                    </div>
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-id-card"></i>
                        </span>
                        <InputText placeholder="Last Name" />
                    </div>
                </div>
                <div class="card flex flex-column md:flex-row gap-3 mt-8">
                    <div class="p-inputgroup flex-1">
                        <SelectButton
                            v-model="valueGender"
                            :options="optionsGender"
                            aria-labelledby="basic" />
                    </div>
                    <div class="p-inputgroup flex-1">
                        <span class="p-inputgroup-addon"> Birthday </span>
                        <Calendar v-model="date" showIcon />
                    </div>
                </div>
                <div class="card flex flex-column md:flex-row gap-3 mt-8">
                    <div class="p-inputgroup flex-1">
                        <Dropdown
                            v-model="selectedCountry"
                            :options="countries"
                            filter
                            optionLabel="name"
                            placeholder="Select a Country"
                            class="w-full md:w-14rem">
                            <template #value="slotProps">
                                <div
                                    v-if="slotProps.value"
                                    class="flex align-items-center">
                                    <img
                                        :alt="slotProps.value.label"
                                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                        :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                                        style="width: 18px" />
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <img
                                        :alt="slotProps.option.label"
                                        src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                        :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                                        style="width: 18px" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="p-inputgroup flex-1">
                        <div class="card flex justify-content-center">
                            <Rating v-model="value" />
                        </div>
                    </div>
                </div>
                <div class="card flex justify-content-center mt-8">
                    <span class="p-float-label">
                        <Textarea v-model="valueTextarea" rows="5" cols="90" />
                        <label>Profile</label>
                    </span>
                </div>
                <div class="mt-8">
                    <Button type="submit" label="Submit" />
                </div>
            </div>
        </Dialog>
        <Dialog
            v-model:visible="datasetDelete"
            modal
            header="Dateset Delete"
            :style="{ width: '75vw' }">
            <div class="flex justify-end gap-6">
                <Button
                    label="Delete"
                    icon="pi pi-check"
                    iconPos="right"
                    @click="datasetDelete = false" />
                <Button
                    label="Cancel"
                    severity="secondary"
                    icon="pi pi-times"
                    iconPos="right"
                    @click="datasetDelete = false"
                    text />
            </div>
        </Dialog>

        <div id="dataset">
            <div class="pl-4 pt-4 text-4xl font-bold">DSBG</div>
            <dataset
                v-slot="{ ds }"
                :ds-data="users"
                :ds-filter-fields="{}"
                :ds-sortby="sortBy"
                :ds-search-in="[
                    'first_name',
                    'last_name',
                    'gender',
                    'birthdate',
                    'email',
                    'ip_address',
                    'profile', //
                ]"
                :ds-search-as="{}">
                <div
                    class="flex min-w-min flex-row items-center justify-between p-4"
                    :data-page-count="ds.dsPagecount">
                    <div class="w-64">
                        <dataset-show
                            :ds-show-entries="5"
                            :ds-show-entries-lovs="[
                                { value: 5, text: 5 },
                                { value: 10, text: 10 },
                                { value: 15, text: 15 },
                                { value: 25, text: 25 },
                                { value: 50, text: 50 },
                                { value: 100, text: 100 },
                            ]" />
                    </div>
                    <div class="">
                        <dataset-search ds-search-placeholder="Filter..." />
                    </div>
                </div>

                <div v-if="checkedAll" class="p-4">
                    <span class="p-buttonset">
                        <Button label="Edit" icon="pi pi-check" />
                        <Button label="Delete" icon="pi pi-trash" />
                    </span>
                </div>

                <div class="px-2">
                    <table class="w-full border-collapse">
                        <thead>
                            <tr class="bg-[#FFE664] text-left">
                                <th class="border border-slate-100 p-3">
                                    <Checkbox
                                        v-model="checkedAll"
                                        :binary="true"
                                        @change="selectAll" />
                                </th>
                                <th class="border border-slate-100 p-3">#</th>
                                <th
                                    v-for="(th, index) in cols"
                                    :key="th.field"
                                    class="border border-slate-100 p-3">
                                    <div
                                        :class="['sort', th.sort]"
                                        @click="click($event, index)"
                                        class="flex whitespace-nowrap">
                                        <div>{{ th.name }}</div>
                                        <div v-if="!th.sort" class="scale-50">
                                            <IconSort />
                                        </div>
                                        <div
                                            v-else-if="th.sort == 'asc'"
                                            class="scale-50">
                                            <IconSortUp />
                                        </div>
                                        <div v-else class="scale-50">
                                            <IconSortDown />
                                        </div>
                                    </div>
                                </th>
                                <th class="border border-slate-100 px-2">Actions</th>
                            </tr>
                        </thead>
                        <dataset-item tag="tbody">
                            <template #default="{ row, rowIndex }">
                                <tr class="text-zinc-600 odd:bg-[#F0F0F0]">
                                    <td
                                        class="min-w-[56px] border border-slate-100 p-3">
                                        <Checkbox v-model="checkedAll" :binary="true" />
                                    </td>
                                    <td
                                        class="min-w-[64px] border border-slate-100 p-3">
                                        {{ rowIndex + 1 }}
                                    </td>
                                    <td
                                        class="min-w-[100px] border border-slate-100 p-3">
                                        {{ row.first_name }}
                                    </td>
                                    <td
                                        class="min-w-[100px] border border-slate-100 p-3">
                                        {{ row.last_name }}
                                    </td>
                                    <td
                                        class="min-w-[75px] border border-slate-100 p-3">
                                        {{ row.gender }}
                                    </td>
                                    <td
                                        class="min-w-[100px] border border-slate-100 p-3">
                                        {{ row.birthdate }}
                                    </td>
                                    <td
                                        class="min-w-[100px] max-w-[200px] truncate border border-slate-100 p-3">
                                        {{ row.profile }}
                                    </td>
                                    <td
                                        class="flex min-w-[100px] justify-between gap-1 border border-slate-100 p-3 text-zinc-400">
                                        <IconEye
                                            @click="datasetView = true"
                                            class="hover:text-zinc-600" />
                                        <IconEdit
                                            @click="datasetView = true"
                                            class="hover:text-zinc-600" />
                                        <IconTrash
                                            @click="datasetDelete = true"
                                            class="hover:text-zinc-600" />
                                    </td>
                                </tr>
                            </template>
                        </dataset-item>
                    </table>
                </div>

                <div class="flex flex-row justify-between p-4">
                    <dataset-info class="" />
                    <dataset-pager class="flex flex-row justify-between gap-5" />
                </div>
            </dataset>
        </div>
    </div>
</template>

