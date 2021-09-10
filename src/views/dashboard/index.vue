<template>
  <div class="index-container">
    <el-row>
      <!-- 左侧 -->
      <el-col :span="8" :offset="0">
        <!-- 公告 -->
        <div class="content left-top">
          <div class="title-left">系统公告</div>
          <div class="content__notice">项目填报已截止</div>
        </div>
        <div class="content" :style="{height:offsetHeight-200-45+'px'}">
          <div class="title-left">说明文档</div>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="16" :offset="0">
        <div>
          <el-row>
            <el-col :span="8" :offset="0">
              <div class="content icon">
                待处理项目
              </div>
            </el-col>
            <el-col :span="8" :offset="0">
              <div class="content icon">
                已申报项目
              </div>
            </el-col>
            <el-col :span="8" :offset="0">
              <div class="content icon">
                已申报金额
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="content" :style="{height:offsetHeight-100-45+'px'}">
          <div class="title-left">微信绑定</div>
          <el-button type="primary" size="medium" @click="addWx" class="mt5">添加微信账号</el-button>
          <div class="mt5">
            <el-table :data="wsData.results" border stripe :header-cell-style="{background:'#eef1f6',color:'#606266'}"
              :height="offsetHeight-200-65+'px'">
              <el-table-column type="index" label="序号" width="50" align="center">
              </el-table-column>
              <el-table-column prop="nick_name" label="微信昵称" width="180" align="center">
              </el-table-column>
              <el-table-column prop="create_date" label="创建时间" width="180" align="center">
              </el-table-column>
              <el-table-column prop="status" label="绑定状态" width="100" align="center">
                <template v-slot="{ row }">
                  <span v-if="row.status == 0">未审核</span>
                  <span v-if="row.status == 1">审核通过</span>
                  <span v-if="row.status == 2">审核未通过</span>
                </template>
              </el-table-column>
              <el-table-column prop="date" label="操作" align="center">
                <template v-slot="{ row }">
                  <template v-if="row.status === '0'">
                    <el-Button type="success" size="small" class="actionBtn" @click="passAction(row.id)">
                      过审
                    </el-Button>
                    <el-Button type="danger" size="small" class="actionBtn" @click="noPassAction(row.id)">不予通过
                    </el-Button>
                  </template>
                  <el-Button type="danger" size="small" class="actionBtn" @click="delAction(row.id)">删除
                  </el-Button>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination @size-change="pageSizeChange" @current-change="pageNoChange" :page-sizes="[10, 50, 5, 200]"
                :page-size="10" layout="total, sizes, prev, pager, next" :total="wsData.totalRecord">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'user'
    ])
  },
  data () {
    return {
      offsetHeight: document.documentElement.clientHeight - 100,
      wsData: {
        totalRecord: 0
      },
      pageNo: 1,
      pageSize: 10,
    }
  },
  methods: {
    async init () {
      this.wsData = await this.$http('wxPage', {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        dal_flag: '0'
      })
    },
    addWx () {

    },
    async passAction (id) {
      const res = await this.$http('wxUp', {
        id: id,
        status: 1
      })
      this.init()
    },
    async noPassAction (id) {
      const res = await this.$http('wxUp', {
        id: id,
        status: 2
      })
      this.init()
    },
    async delAction (id) {
      const res = await this.$http('wxUp', {
        id: id,
        del_flag: 1
      })
      this.init()
    },
    pageNoChange (pageNo) {
      this.pageNo = pageNo
      this.init()
    },
    pageSizeChange (pageSize) {
      this.pageSize = pageSize
      this.init()
    },
  },
  mounted () {
    this.init()
    console.log('-----');
  }
}
</script>

<style lang="scss" scoped>
.index-container {
  background-color: #f1f2f6;
  height: 100%;
  width: 100%;
}
.content {
  background-color: #fff;
  margin: 5px;
  padding: 10px;

  border-radius: 5px;
  &__notice {
    margin: 0 auto;
    align-content: center;
    text-align: center;
  }
}
.left-top {
  height: 200px;
  margin-bottom: 10px;
}
.icon {
  height: 100px;
}
.page {
  height: 20px;
  text-align: right;
}
</style>
