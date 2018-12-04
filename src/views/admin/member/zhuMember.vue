<template>
  <div class="app-container">

    <el-form>
      <el-form-item label="切换环境" label-width="80px">
        <el-select v-model="envName" placeholder="请选择" @change="selectEnvChange">
          <el-option
            v-for="item in envList"
            :key="item.id"
            :label="item.name"
            :value="item.name"/>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="手机号">
        <el-input v-model="phone_number"/>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="listLoading" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <div style="height: 20px"/>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      max-height="600"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item ,key) in tableField"
        :prop="item"
        :label="item"
        :key="key"
        width="120"
        sortable
      />
    </el-table>
  </div>
</template>

<script>

import { getList } from '@/api/admin/environment/environment'
import { getUserInfoById } from '@/api/admin/member/zhuMember'

export default {
  data() {
    return {
      listLoading: false,
      envList: [],
      envName: '',
      phone_number: '',
      tableData: [],
      tableField: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.envList = response.data.data
        this.listLoading = false
      })
    },
    selectEnvChange(row) {
      console.log(this.environmentId)
    },
    onSubmit() {
      if (this.phone_number === '' || this.envName === '') {
        this.$message({
          type: 'error',
          message: '请填写查找内容'
        })
        return false
      }

      const para = {
        'phone_number': this.phone_number,
        'envName': this.envName
      }

      this.listLoading = true
      getUserInfoById(para).then(res => {
        this.tableData = res.data.data
        this.tableField = []
        if (this.tableData.length > 0) {
          for (const i in this.tableData[0]) {
            this.tableField.push(i)
          }
        }
        this.listLoading = false
      })
    }
  }
}
</script>
