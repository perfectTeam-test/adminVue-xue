<template>
  <div class="app-container" >
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="切换环境">
        <el-select v-model="envName" placeholder="请选择1" @change="selectEnvChange">
          <el-option
            v-for="item in envList"
            :key="item.id"
            :label="item.name"
            :value="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="操作库 ">
        <el-select v-model="manageDbId" placeholder="请选择" @change="selectDbChange">
          <el-option
            v-for="item in manageDbList"
            :key="item.id"
            :label="item.name"
            :value="item.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="选择查询">
        <el-select v-model="manageSql" placeholder="请选择" @change="selectSqlChange">
          <el-option
            v-for="item in manageSqlList"
            :key="item.id"
            :label="item.name"
            :value="item.sql"/>
        </el-select>

        <el-form-item>
          <el-button v-loading="listLoading" type="primary" @click="onSubmit" >查询</el-button>
        </el-form-item>

      </el-form-item>
    </el-form>

    <el-input
      :rows="2"
      v-model="postManageSql"
      :autosize="{ minRows: 3, maxRows: 6}"
      type="textarea"
      placeholder="请输入内容"/>

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
        fixed/>
    </el-table>
  </div>
</template>

<script>

import { getList } from '@/api/admin/environment/environment'
import { getManageDbList, getManageSqlList, getDataBySql } from '@/api/admin/manage/manage'

export default {
  data() {
    return {
      listLoading: false,
      envList: [],
      environmentId: '',
      manageSqlList: [],
      manageSql: '',
      tableData: [],
      tableField: [],
      envName: '',
      postManageSql: '',
      manageDbList: [],
      manageDbId: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(this.envList)
        this.envList = response.data.data
        this.listLoading = false
      })
      getManageDbList().then(response => {
        this.manageDbList = response.data.data
        this.listLoading = false
      })
    },
    selectEnvChange(row) {
      console.log(this.environmentId)
    },
    // 操作库下拉
    selectDbChange(manageDbId) {
      getManageSqlList({ 'manageDbId': manageDbId }).then(response => {
        this.manageSqlList = response.data.data
        this.listLoading = false
      })
    },
    selectSqlChange(row) {
      this.postManageSql = this.manageSql
    },
    onSubmit() {
      let connName = ''
      const _this = this
      this.manageDbList.forEach(function(item) {
        if (item.id === _this.manageDbId) {
          connName = item.connName
        }
      })
      if (!connName || !this.postManageSql || !this.envName) {
        this.$message({
          type: 'error',
          message: '请先选择'
        })
        return false
      }
      const param = {
        'connName': connName,
        'sql': this.postManageSql,
        'envName': this.envName
      }
      this.listLoading = true
      getDataBySql(param).then(res => {
        this.tableData = res.data.data
        if (this.tableData.length > 0) {
          this.tableField = []
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

<style scoped>
    .edit-input {
        padding-right: 100px;
    }

    .cancel-btn {
        position: absolute;
        right: 15px;
        top: 10px;
    }

    .el-row {
        margin-bottom: 20px;
    &:last-child {
         margin-bottom: 0;
     }
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
</style>
