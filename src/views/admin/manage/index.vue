<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="切换环境">
        <el-select v-loading="listLoading" v-model="envName" placeholder="请选择" @change="selectEnvChange">
          <el-option key="local" label="local" value="local"/>
          <el-option key="ult" label="ult" value="ult"/>
        </el-select>
      </el-form-item>
      <el-form-item label="操作库 ">
        <el-select v-loading="listLoading" v-model="dbName" placeholder="请选择" @change="selectEnvChange">
          <el-option
            v-for="item in envList"
            :key="item.dbName"
            :label="item.name"
            :value="item.name"/>
        </el-select>
      </el-form-item>

      <el-form-item label="选择查询">
        <el-select v-loading="listLoading" v-model="manageSql" placeholder="请选择" @change="selectManageChange">
          <el-option
            v-for="item in manageSqllist"
            :key="item.id"
            :label="item.name"
            :value="item.sql"/>
        </el-select>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form-item>
    </el-form>

    <el-input
      :rows="2"
      v-model="postManageSql"
      type="textarea"
      placeholder="请输入内容"/>

    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        v-for="(item ,key) in tableField"
        :label="item"
        :prop="key"
        :key="item"
        fixed/>
    </el-table>
  </div>
</template>

<script>

import { getList } from '@/api/admin/environment/environment'
import { getManageSqlList } from '@/api/admin/manageSql/manageSql'
import { getDataBySql } from '@/api/admin/manageSql/manageSql'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        success: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status === 0 ? 'success' : 'deleted']
    }
  },
  data() {
    return {
      dbName: '',
      listLoading: false,
      envList: [],
      environmentId: '',
      manageSqllist: [],
      manageSql: '',
      tableData: [],
      tableField: [],
      envName: '',
      postManageSql: ''
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
      getManageSqlList().then(response => {
        this.manageSqllist = response.data.data
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      this.$message({
        message: '您已取消修改',
        type: 'warning'
      })
      this.fetchData()
    },
    // confirmEdit(row) {
    //   row.edit = false
    //   row.columns = JSON.parse(row.columns)
    //   update(row).then(response => {
    //     this.$message({
    //       message: '更新成功',
    //       type: 'success'
    //     })
    //     this.fetchData()
    //   })
    // },
    // addPage() {
    //   this.$router.push('/cms/block/store')
    // },
    //
    // selDelete(row) {
    //   row.deleted = parseInt(this.isDeleted)
    // },
    // // 编辑
    // edit(row) {
    //   this.$router.push('/cms/block/' + row.id + '/edit')
    // },
    selectEnvChange(row) {
      console.log(this.environmentId)
    },
    selectManageChange(row) {
      this.postManageSql = this.manageSql
      console.log(this.environmentId)
    },
    onSubmit() {
      const param = {
        'connName': this.dbName,
        'sql': this.postManageSql,
        'envName': this.envName
      }
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
    },
    fastEdit(row) {
      row.edit = !row.edit
      this.isDeleted = row.deleted.toString()
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
</style>
