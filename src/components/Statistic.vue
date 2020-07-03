<template>
  <div v-loading.fullscreen.lock="loading">
<!--    <header-info :naire="naire" />-->
    <div v-if="results.length > 0">
<!--      <el-button type="primary" @click="handleChangeMode">切换模式</el-button>-->
      <div class="switch">
        <el-switch
            v-model="scoreMode"
            active-text="打分模式"
            @change="handleChange"
        ></el-switch>
      </div>
      <div v-if="scoreMode" class="question-list">
        <el-table
            class="result-table border-table"
            :data="scoreTable"
        >
          <el-table-column prop="question_content"></el-table-column>
          <el-table-column prop="count" label="打分次数" align="center"></el-table-column>
          <el-table-column prop="score" label="平均分" align="center"></el-table-column>
        </el-table>
      </div>
      <div
          v-else
          v-for="(result, index) in results"
          :key="index"
          class="question-list"
      >
        <div class="question-item">
          <h3 class="title">Q: {{ result.question_content }}</h3>
        </div>

        <div class="echarts">
          <div
              :id="'chart-'+ index"
              :style="{ width: '100%', height: '500%' }"
          ></div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-alert type="info" :closable="false" show-icon center>暂无统计数据</el-alert>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import echarts from 'echarts'

  export default {
    name: "Statistic",
    data() {
      return {
        loading: false,
        scoreMode: false,
        Q_ID: '',
        results: [],
        scoreTable: [],
      }
    },
    methods: {
      async getStatisticResult() {
        this.loading = true;
        const path = `/questionnaireStatistics/?Q_ID=${this.Q_ID}`;
        await axios.get(path)
          .then((res) => {
            this.results = res.data;
          })
          .catch((error) => {
            switch (error.msg) {
              case 1:
                this.$router.push({ name: '404' });
                break;
              case 100:
                this.$message.error('请将信息填写完整');
                break;
              default:
                this.$message.error('网络连接超时，请检查网络或稍后再试');
            }
          })
        this.loading = false;
        this.$nextTick(async () => {
          await this.drawCharts();
        })
      },
      async drawCharts() {
        let chartsList = [];
        await this.results.forEach((result, index) => {
          let optionContent = [];
          let optionCount = [];
          for (let i = 0; i < result.option.length; i++) {
            optionContent.push(result.option[i].option_content);
            optionCount.push(result.option[i].option_count);
          }
          let chart = echarts.init(document.getElementById('chart-' + index))
          let option = {
            color: ['#3398DB'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: optionContent,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                name: '人数',
                type: 'bar',
                barWidth: '20%',
                data: optionCount
              }
            ]
          };
          chart.setOption(option);
          chartsList.push(chart)
        })
        window.onresize = async () => {
          chartsList.forEach((chart) => {
            chart.resize();
          })
        }
      },
      // handleChangeMode() {
      //   if (!this.scoreMode) {
      //     if (this.validate()) {
      //       this.scoreMode = true;
      //       this.score();
      //     } else {
      //       this.$message.warning('该问卷暂不支持切换模式');
      //     }
      //   } else {
      //     this.scoreMode = false;
      //     this.getStatisticResult();
      //   }
      // },
      validate() {
        let valid = true;
        this.results.forEach((result) => {
          result.option.forEach((op) => {
            if (isNaN(Number(op.option_content))) {
              valid = false;
            }
          })
        })
        return valid;
      },
      async score() {
        this.scoreTable = [];
        this.results.forEach((result) => {
          let sum = 0;
          let count = 0
          result.option.forEach((op) => {
            sum += Number(op.option_content * op.option_count);
            count += op.option_count;
          })
          let avg = sum / count;
          this.scoreTable.push({
            question_content: result.question_content,
            count: count,
            score: avg.toFixed(2),
          })
        })
      },
      handleChange(mode) {
        if (mode) {
          if (this.validate()) {
            this.scoreMode = true;
            this.score();
          } else {
            this.scoreMode = false;
            this.$message.warning('该问卷暂不支持切换模式');
          }
        } else {
          this.scoreMode = false;
          this.getStatisticResult();
        }
      }
    },
    created() {
      this.Q_ID = this.$route.params.id;
      this.getStatisticResult();
    }
  }
</script>

<style scoped>
  .switch {
    text-align: end;
  }

  .question-list {
    padding: 20px 0;
    margin-bottom: 20px;
    border-bottom: 2px dotted #eee;
  }

  .question-list .question-item .title {
    font-size: 16px;
  }

  .result-table {
    margin: 20px 0;
  }
</style>
