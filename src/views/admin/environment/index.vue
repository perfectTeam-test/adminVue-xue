<template>
  <div class="app-container">

    <!--<el-button @click="addPage" style="margin-bottom: 30px">添加模块</el-button>-->

    <!--<el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">-->

    <!--<el-table-column align="center" label="ID" width="80">-->
    <!--<template slot-scope="scope">-->
    <!--<span>{{scope.row.id}}</span>-->
    <!--</template>-->
    <!--</el-table-column>-->

    <!--&lt;!&ndash;&lt;!&ndash;<el-table-column min-width="200px" label="模块别名">&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<template v-if="scope.row.edit">&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<el-input v-model="scope.row.code" placeholder="请输入模块别名"></el-input>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;</template>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<span v-else>{{scope.row.code}}</span>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;</template>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;</el-table-column>&ndash;&gt;&ndash;&gt;-->
    <!--</el-table>-->

    <template>
      <el-select v-loading="listLoading" v-model="environmentId" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="item in list"
          :key="item.id"
          :label="item.name"
          :value="item.name"
        />
      </el-select>
    </template>
  </div>
</template>

<script>

import { getList } from '@/api/admin/environment/environment'

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
      listLoading: false,
      list: null,
      environmentId: ''
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      console.log(this.environmentId)
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.data
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
    selectChange(row) {
      console.log(this.environmentId)
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
