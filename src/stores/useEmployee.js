import { defineStore, acceptHMRUpdate } from 'pinia'

const baseUrl = `${import.meta.env.VITE_API_URL}/employees`

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    isLoading: false
  }),
  actions: {
    // 모든 임직원 조회
    async getEmployees() {
      this.isLoading = true

      const res = await fetch(baseUrl)
      const data = await res.json()

      this.employees = data
      this.isLoading = false
    },
    // 임직원 추가
    async addEmployee(person) {
      this.employees.push(person)

      const res = await fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify(person),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    // 특정 임직원 삭제
    async deleteEmployee(id) {
      this.employees = this.employees.filter((t) => t.id !== id)

      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    // 특정 임직원 수정
    async editEmployee(id, employee) {
      let target = this.employees.find((t) => t.id === id)

      if (!target) return

      target.empName = employee.empName
      target.empDeptName = employee.empDeptName
      target.empTelNo = employee.empTelNo
      target.emlMail = employee.emlMail

      const res = await fetch(`${baseUrl}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          ...employee
        }),
        headers: { 'Content-Type': 'application/json' }
      })

      if (res.error) {
        console.log(res.error)
      }
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot))
}
