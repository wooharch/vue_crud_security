<script setup>
const columns = [
  {
    name: 'empName',
    required: true,
    label: '이름',
    align: 'left',
    field: (row) => row.empName,
    format: (val) => `${val}`,
    sortable: true
  },
  { name: 'empDeptName', align: 'left', label: '부서명', field: 'empDeptName', sortable: true },
  { name: 'empTelNo', align: 'left', label: '전화번호', field: 'empTelNo', sortable: true },
  { name: 'empMail', align: 'left', label: '이메일', field: 'empMail' },
  { name: 'actions', align: 'center', label: 'Actions' }
]

import { ref, onMounted, watch } from 'vue'

const show_dialog = ref(false)
const isEditMode = ref(false)
const editedItem = ref({
  id: '',
  empName: '',
  empDeptName: '',
  empTelNo: '',
  empMail: ''
})
const defaultItem = ref({
  id: '',
  empName: '',
  empDeptName: '',
  empTelNo: '',
  empMail: ''
})

// Fetch Employees
import { storeToRefs } from 'pinia'
import { useEmployeeStore } from '@/stores/useEmployee'
const employeeStore = useEmployeeStore()
const { employees, isLoading } = storeToRefs(employeeStore)
const { getEmployees, addEmployee, editEmployee, deleteEmployee } = employeeStore

onMounted(() => {
  // fetch
  getEmployees()
})

watch(
  () => employeeStore.employees,
  () => {
    console.log('employeeStore.employees changed to')
  }
)

const initAdd = () => {
  editedItem.value = Object.assign({}, defaultItem)
  isEditMode.value = false
  show_dialog.value = true
}

const initEdit = (item) => {
  console.log(item)
  editedItem.value = Object.assign({}, item)
  isEditMode.value = true
  show_dialog.value = true
}

const handleDeleteEmployee = (item) => {
  confirm(`${item.empName} 직원을 삭제하시겠습니까?`) && deleteEmployee(item.id)
}

const handleSubmit = () => {
  console.log('handleSubmit', editedItem.value.empName, editedItem.value.empDeptName)

  const { id, empName, empDeptName, empTelNo, empMail } = editedItem.value

  if (!empName || !empDeptName || !empTelNo || !empMail) return

  if (isEditMode.value) {
    editEmployee(id, editedItem.value)
  } else {
    addEmployee({
      id: Math.floor(Math.random() * 10000),
      empName,
      empDeptName,
      empTelNo,
      empMail
    })
  }

  handleReset()
}

const handleReset = () => {
  editedItem.value = Object.assign({}, defaultItem)
  show_dialog.value = false
}
</script>

<template>
  <div>
    <div class="q-pa-sm q-gutter-sm">
      <q-table
        flat
        bordered
        title="임직원 현황"
        :rows="employees"
        :columns="columns"
        no-data-label="No Employee"
        row-key="username"
        :loading="isLoading"
      >
        <template v-slot:top>
          <span class="text-bold">임직원 현황</span>
          <q-space />
          <q-btn
            flat
            round
            dense
            color="primary"
            icon="add"
            :disable="isLoading"
            @click="initAdd"
          ></q-btn>

          <div class="q-pa-sm q-gutter-sm">
            <q-dialog v-model="show_dialog">
              <q-card flat bordered class="q-pa-md" style="min-width: 400px">
                <q-card-section>
                  <div class="text-h6">{{ isEditMode ? '직원 수정' : '직원 추가' }}</div>
                </q-card-section>

                <q-separator inset />

                <q-card-section>
                  <q-form @submit.prevent="handleSubmit" @reset="handleReset" class="q-gutter-md">
                    <q-input
                      filled
                      v-model="editedItem.empName"
                      label="이름 *"
                      hint="Emp Name"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
                    />
                    <q-input
                      filled
                      v-model="editedItem.empDeptName"
                      label="부서명"
                      hint="Dept Name"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
                    />
                    <q-input
                      filled
                      v-model="editedItem.empTelNo"
                      label="전화번호"
                      hint="Tel No"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
                    />
                    <q-input
                      filled
                      v-model="editedItem.empMail"
                      label="이메일 *"
                      hint="Email Address"
                      lazy-rules
                      :rules="[(val) => (val && val.length > 0) || '필수값입니다']"
                    />

                    <div class="flex justify-between">
                      <q-btn
                        label="Save"
                        type="submit"
                        color="positive"
                        :disable="
                          !editedItem.empName ||
                          !editedItem.empDeptName ||
                          !editedItem.empTelNo ||
                          !editedItem.empMail
                        "
                      />
                      <q-btn label="Cancel" type="reset" v-close-popup color="negative" flat />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </q-dialog>
          </div>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat round color="warning" icon="edit" @click="initEdit(props.row)"></q-btn>
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="handleDeleteEmployee(props.row)"
            ></q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
@/stores/useEmployee
