<template>
  <div id="settings">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Настройки</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>

              <v-card-title primary-title>Привет!</v-card-title>
              <v-card-text>
                <div>Добро пожаловать на вашу {{gamesCount}} тренировку</div>
                <div>Ваш последний результат - решено {{lastResult}} за {{lastTime}} минут, co сложностью {{lastComplexity}}</div>
                <div>Ваш лучший результат - решено {{bestScore.result}} за {{bestScore.time}} минут, co сложностью {{bestScore.complexity}}</div>
              </v-card-text>
              <v-card-title primary-title>Настройки</v-card-title>
                <v-subheader>Длительность: {{duration}} минут</v-subheader>
                <v-slider class="pl-2 pr-2" v-model="duration" min="1" max="15"></v-slider>
                <v-subheader >Сложность: {{complexity}}</v-subheader>
                <v-slider class="pl-2 pr-2" v-model="complexity" min="1" max="10"></v-slider>
              <v-card-text>
                <v-checkbox class="pa-0 ma-0" v-model="sum" :label="`Сложение`"></v-checkbox>
                <v-checkbox class="pa-0 ma-0" v-model="subtr" :label="`Вычитание`"></v-checkbox>
                <v-checkbox class="pa-0 ma-0" v-model="mult" :label="`Умножение`"></v-checkbox>
                <v-checkbox class="pa-0 ma-0" v-model="div" :label="`Деление`"></v-checkbox>
                <v-checkbox class="pa-0 ma-0" v-model="pow" :label="`Возведение в степень`"></v-checkbox>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <router-link v-if="operators.length != 0" :to="{ name: 'training', params: { duration: this.duration, complexity: this.complexity, operators: this.operators } }">
                <v-btn color="primary">Старт</v-btn>
                </router-link>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      duration: 7,
      complexity: 5,
      sum: true,
      subtr: true,
      mult: false,
      div: false,
      pow: false
    };
  },
  computed: {
    operators() {
      let ops = [];
      if (this.sum) {
        ops.push('+')
      }
      if (this.subtr) {
        ops.push('-')
      }
      if (this.mult) {
        ops.push('*')
      }
      if (this.div) {
        ops.push('/')
      }
      if (this.pow) {
        ops.push('^')
      }
      return ops;
    },
    lastResult() {
      return this.$store.getters.LAST_RESULT;
    },
    lastTime() {
      return this.$store.getters.LAST_TIME;
    },
    lastComplexity() {
      return this.$store.getters.LAST_COMPLEXITY;
    },
    gamesCount() {
      return this.$store.getters.GAMES_COUNT;
    },
    bestScore() {
      return this.$store.getters.BEST_SCORE;
    },
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
