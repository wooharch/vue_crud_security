import { defineStore, acceptHMRUpdate } from 'pinia';
import { fetchWrapper } from '@/helpers';

const baseUrl = `${import.meta.env.VITE_API_URL}/employees`;

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    isLoading: false
  }),
  actions: {
    // 모든 임직원 조회
    async getEmployees() {
      try {
        this.isLoading = true;
        this.employees = await fetchWrapper.get(baseUrl);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 임직원 추가
    async addEmployee(employee) {
      try {
        this.isLoading = true;
        this.employees.push(employee);
        await fetchWrapper.post(baseUrl, employee);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 특정 임직원 삭제
    async deleteEmployee(id) {
      try {
        this.isLoading = true;
        this.employees = this.employees.filter((t) => t.id !== id);
        await fetchWrapper.delete(`${baseUrl}/${id}`);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    // 특정 임직원 수정
    async editEmployee(id, employee) {
      try {
        this.isLoading = true;
        let target = this.employees.find((t) => t.id === id);

        if (!target) return;

        target.empName = employee.empName;
        target.empDeptName = employee.empDeptName;
        target.empTelNo = employee.empTelNo;
        target.empMail = employee.empMail;

        await fetchWrapper.put(`${baseUrl}/${id}`, employee);
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useEmployeeStore, import.meta.hot));
}
