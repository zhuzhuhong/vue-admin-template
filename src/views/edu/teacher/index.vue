<template>
  <div class="app-container" >
    <el-table
      v-loading="listLoading"
    :data="list"
    element-loading-text="数据加载中"
    border
    fit
    highlight-current-row="true">
      // 序号列
      <el-table-column
        width="70"
        align="center"
        label="序号"
      >
        <template slot-scope="scope">
          {{  (page - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      // 性名列
      <el-table-column label="姓名" prop="name" width="80" />

      // 头衔
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{scope.row.level===1?'高级讲师':'首席讲师'}}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160"/>

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/teacher/edit/'+scope.row.id">
            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
          </router-link>
          <el-button type="primary" icon="el-icon-delete" size="mini" @click="removeDataById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper"
      @current-change="fetchData"
    />
  </div>
</template>

<script>
// 引入teacher 接口定义文件
import teacher from '@/api/edu/teacher'
export default {
  name: 'Index',
  // 定义数据
  data() {
    return {
      listLoading: true, // 是否显示Loading图标
      list: {},
      total: 0, // 总记录数
      page: 1, // 当前页码
      pageSize: 10, // 默认每页多少条
      searchObj: {} // 查询条件
    }
  },
  // 当页面加载时获取数据
  created() {
    this.fetchData()
  },
  methods: {
    fetchData(page = 1) {
      console.log('加载列表')
      this.page = page
      this.listLoading = true
      teacher.getPageList(this.page, this.pageSize, this.searchObj)
        .then(response => {
          if (response.success === true) {
            // 完成数据绑定
            this.total = response.data.total
            this.list = response.data.rows
          }
          this.listLoading = false
        })
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return teacher.deleteById(id)
      }).then(() => {
        this.fetchData()
        this.$message({
          type: 'success',
          message: '操作成功'
        })
      }).catch(resonse => {
        if (resonse === 'cancel') {
          this.$message({
            type: 'cancel',
            message: '取消删除'
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
