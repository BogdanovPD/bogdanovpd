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
                <div>Добро пожаловать на ваш 25 тренировочный день</div>
                <div>Ваш последний результат - решено 10 из 25</div>
                <div>Общая точность 80%</div>
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
                <v-btn color="primary">Play</v-btn>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
