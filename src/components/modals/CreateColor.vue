<template>
    <div class="card flex justify-content-center" style="margin-top: 30px">
        <Button
            class="add"
            label="Добавить цвета"
            icon="pi pi-mobile"
            @click="visible = true"
        />
        <Dialog
            v-model:visible="visible"
            modal
            header="Добавить цвета"
            :style="{ width: '60vw' }"
        >
            <div class="card p-fluid">
                <DataTable
                    :value="colors"
                    editMode="cell"
                    @cell-edit-complete="onCellEditComplete"
                    tableClass="editable-cells-table"
                    tableStyle="min-width: 50rem"
                    :showGridlines="true"
                    :stripedRows="true"
                >
                    <Column
                        v-for="col of columns"
                        :key="col.field"
                        :field="col.field"
                        :header="col.header"
                        style="width: 50%"
                    >
                        <template #body="{ data, field }">
                            {{ data[field] }}
                        </template>
                        <template #editor="{ data, field }">
                            <InputText v-model="data[field]" autofocus/>
                        </template>
                    </Column>
                </DataTable>
            </div>
            <div class="flex justify-content-end flex-wrap">
                <Button
                    v-if="enabledButton"
                    label="Добавить"
                    severity="success"
                    @click="addColor"
                />
                <Button
                    v-else
                    label="Добавить"
                    severity="success"
                    disabled
                />
            </div>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed } from 'vue';
import { useToast } from 'primevue/usetoast';
import { $authHost } from '../../http/index';

const visible = ref(false);

const columns = [
    { field: 'name', header: 'Имя цвета' },
    { field: 'code', header: 'HEX код' },
];

const colors = ref([{ name: '', code: '', _id: '' }]);

// добавляет новую строку (не совсем понятно, что происходит в switch)
const onCellEditComplete = (event) => {
    let { data, newValue, field } = event;
    const lastName = colors.value[colors.value.length - 1].code;
    if (data.code === lastName && isHexCode(newValue)) {
        colors.value.push({ name: '', code: '', _id: '' });
    }

    switch (field) {
        case 'name':
            data[field] = newValue;
            break;
        case 'code':
            if (isHexCode(newValue)) data[field] = newValue;
            else event.preventDefault();
            break;

        default:
            if (newValue.trim().length > 0) data[field] = newValue;
            else event.preventDefault();
            break;
    }
};
// дописать 
const enabledButton = computed(() => {
    if (colors.value === [{ name: '', code: '', _id: '' }]) {
        return false;
    }
    return true;
});

const isHexCode = (val) => {
    const regex = /#[0-9A-Fa-f]{6}/;
    const hasMatch = regex.test(val);
    console.log(hasMatch); // true
    return hasMatch
};

const addColor = async () => {
    let c = colors.value.slice(0, -1)

    const res = await $authHost.post('api/color', {colors: c});
    console.log(colors.value.slice(0, -1));
    // colors.value = '';
    visible.value = false;
};

</script>

<style scoped>
</style>
