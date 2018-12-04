<template>
  <div class="app-container">
    <el-form>
      <el-form-item label="切换环境" label-width="80px">
        <el-select v-model="envName" placeholder="只有dev16充值生效" @change="selectEnvChange">
          <el-option
            v-for="item in envList"
            :key="item.id"
            :label="item.name"
            :value="item.name"/>
        </el-select>
      </el-form-item>
    </el-form>

    <el-form ref="formRecharge" :model="formRecharge" :inline="true" label-width="80px" class="demo-form-inline">
      <el-form-item label="会员ID">
        <el-input v-model="formRecharge.userNumber"/>
      </el-form-item>
      <el-form-item label="充值金额">
        <el-input v-model="formRecharge.balance"/>
      </el-form-item>
      <el-form-item>
        <el-button v-loading="listLoading" type="primary" @click="onSubmit">充值</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { getList } from '@/api/admin/environment/environment'
import { saveRechargeByUser } from '@/api/admin/balance/balance'

export default {
  data() {
    return {
      listLoading: false,
      envList: [],
      envName: '',

      formRecharge: {
        userNumber: '',
        balance: ''
      }
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
      //      console.log(this.environmentId)
    },
    onSubmit() {
      const para = {
        'userNumber': 'blg' + this.formRecharge.userNumber,
        'balance': this.formRecharge.balance + '00',
        'envName': this.envName
      }

      if (!this.formRecharge.userNumber || !para.balance || !para.envName) {
        this.$message({
          type: 'error',
          message: '填写数据不完整'
        })
        return false
      }

      this.listLoading = true
      saveRechargeByUser(para).then(res => {
        if (res.data.data === 1) {
          this.$message({
            message: '充值成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: '充值失败',
            type: 'success'
          })
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
    }
    .last-child {
        margin-bottom: 0;
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
