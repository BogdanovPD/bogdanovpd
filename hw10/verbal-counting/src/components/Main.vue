<template>
  <div id="main">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-container class="fill-width" fluid>
                  <v-row>
                    <v-col md="3">
                      <v-toolbar-title left>Тренировка</v-toolbar-title>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col md="2">
                      <v-toolbar-title class="text-body-2">Решено: {{solved}}</v-toolbar-title>
                    </v-col>
                  </v-row>
                </v-container>
              </v-toolbar>
              <v-card-actions>
                <v-container class="fill-width" fluid>
                  <v-row>
                    <v-col md="2">
                      <v-btn @click="finish()">Отмена</v-btn>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col md="2">
                      <v-card-text class="text-body-1">{{time}}</v-card-text>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-actions>
              <v-container class="text-center" fluid>
                <v-row justify="center">
                  <v-col md="3">
                    <v-card-text
                      dense
                      v-show="this.inputField !== 1"
                      class="text-h6"
                    >{{firstOperand}}</v-card-text>
                    <v-text-field
                      disabled
                      v-model="answer"
                      v-show="this.inputField === 1"
                      v-bind:background-color="isCorrect ?  'green lighten-5' : ''"
                    ></v-text-field>
                  </v-col>
                  <v-col md="1">
                    <v-card-text>{{operator}}</v-card-text>
                  </v-col>
                  <v-col md="3">
                    <v-card-text
                      dense
                      v-show="this.inputField !== 2"
                      class="text-h6"
                    >{{secondOperand}}</v-card-text>
                    <v-text-field
                      disabled
                      v-model="answer"
                      v-show="this.inputField === 2"
                      v-bind:background-color="isCorrect ?  'green lighten-5' : ''"
                    ></v-text-field>
                  </v-col>
                  <v-col md="1">
                    <v-card-text class="text-h6">=</v-card-text>
                  </v-col>
                  <v-col md="3">
                    <v-card-text dense v-show="this.inputField !== 3" class="text-h6">{{res}}</v-card-text>
                    <v-text-field
                      disabled
                      v-model="answer"
                      v-show="this.inputField === 3"
                      v-bind:background-color="isCorrect ?  'green lighten-5' : ''"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
              <v-container class="text-center" fluid>
                <v-row justify="center">
                  <v-col md="2" v-for="n in numbers_1_col" v-bind:key="n">
                    <v-btn
                      class="text-md-h6"
                      color="deep-orange lighten-1"
                      large
                      fab
                      v-on:click="answer += n"
                    >{{n}}</v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="2" v-for="n in numbers_2_col" v-bind:key="n">
                    <v-btn
                      class="text-md-h6"
                      color="deep-orange lighten-1"
                      large
                      fab
                      v-on:click="answer += n"
                    >{{n}}</v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="2" v-for="n in numbers_3_col" v-bind:key="n">
                    <v-btn
                      class="text-md-h6"
                      color="deep-orange lighten-1"
                      large
                      fab
                      v-on:click="answer += n"
                    >{{n}}</v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col md="2">
                    <v-btn
                      class="text-md-h6"
                      color="grey lighten-1"
                      large
                      fab
                      v-on:click="answer = answer.length === 0 ? '-' : answer.slice(0, -1)"
                    >&lt;/-</v-btn>
                  </v-col>
                  <v-col md="2">
                    <v-btn
                      class="text-md-h6"
                      color="deep-orange lighten-1"
                      large
                      fab
                      v-on:click="answer += 0"
                    >0</v-btn>
                  </v-col>
                  <v-col md="2">
                    <v-btn
                      class="text-md-h6"
                      color="grey lighten-1"
                      large
                      fab
                      v-on:click="nextIfCorrect()"
                    >=</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-row justify="center">
        <v-dialog v-model="isFinished" persistent max-width="320">
          <v-card>
            <v-card-title class="headline">Тренировка окончена</v-card-title>
            <v-card-text>Ваш результат: {{solved}}</v-card-text>
            <v-card-actions>
              <router-link :to="{ path: '/' }">
                <v-btn color="green darken-1" text @click="dialog = false">Завершить</v-btn>
              </router-link>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </v-main>
  </div>
</template>

<script>
import {Score} from '../store';

export default {
  name: "Main",
  props: {
    complexity: Number,
    duration: Number,
    operators: Array
  },
  data: () => ({
    date: Object,
    numbers_1_col: [1, 2, 3],
    numbers_2_col: [4, 5, 6],
    numbers_3_col: [7, 8, 9],
    firstOperand: 0,
    secondOperand: 0,
    res: 0,
    operator: "",
    answer: "",
    inputField: 3,
    isCorrect: false,
    checkIfCorrectInterval: Object,
    solved: 0,
    isFinished: false
  }),
  computed: {
    time: function() {
      return this.date.format("mm:ss");
    }
  },
  methods: {
    setOperands: function() {
      this.setRandomOperator();
      let comp =
        this.operator === "*" || this.operator === "^"
          ? Math.floor(this.complexity / 2)
          : this.complexity;
      let max = Math.pow(10, comp + 1);
      let min = Math.pow(10, comp);
      switch (this.operator) {
        case "+":
          this.firstOperand = this.getRandomNumber(min, max);
          this.secondOperand = this.getRandomNumber(min, max);
          this.res = this.firstOperand + this.secondOperand;
          break;
        case "-":
          this.firstOperand = this.getRandomNumber(min, max);
          this.secondOperand = this.getRandomNumber(min, max);
          this.res = this.firstOperand - this.secondOperand;
          break;
        case "*":
          this.firstOperand = this.getRandomNumber(min, max);
          this.secondOperand = this.getRandomNumber(min, max);
          this.res = this.firstOperand * this.secondOperand;
          break;
        case "^":
          this.firstOperand = this.getRandomNumber(min, max);
          this.secondOperand = this.getRandomNumber(
            1,
            Math.floor(this.complexity / 2)
          );
          this.res = Math.pow(this.firstOperand, this.secondOperand);
          break;
        case "/":
          this.firstOperand = this.getRandomNumber(min, max);
          this.secondOperand = this.getRandomElement(
            this.getFactorsArray(this.firstOperand)
          );
          this.res = this.firstOperand / this.secondOperand;
          break;
        default:
          throw new Error("Unsupportable operand");
      }
      this.setInputField();
    },
    setRandomOperator: function() {
      this.operator = this.getRandomElement(this.operators);
    },
    setInputField: function() {
      this.inputField = this.getRandomNumber(1, 3);
    },
    getFactorsArray: number =>
      Array.from(Array(number + 1), (_, i) => i).filter(
        i => number % i === 0 && number !== 0
      ),
    getRandomElement: items => items[Math.floor(Math.random() * items.length)],
    getRandomNumber: (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min,
    nextIfCorrect: function() {
      if (this.isCorrect) {
        this.solved += 1;
        this.answer = "";
        this.setOperands();
      }
    },
    setVars: function() {
      this.$store.dispatch("SET_LAST_RESULT", this.solved);
      this.$store.dispatch("SET_LAST_TIME", this.duration);
      this.$store.dispatch("SET_LAST_COMPLEXITY", this.complexity);
      this.$store.dispatch("INCREMENT_GAMES_COUNT");
      this.$store.dispatch(
        "SET_SCORE",
        new Score(this.solved, this.duration, this.complexity)
      );
    },
    finish: function() {
      this.setVars();
      this.isFinished = true;
    }
  },
  beforeMount() {
    this.date = this.$moment(this.duration * 60 * 1000);
    this.setOperands();
    this.checkIfCorrectInterval = setInterval(() => {
      if (this.inputField === 1) {
        if (this.answer == this.firstOperand) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
      }
      if (this.inputField === 2) {
        if (this.answer == this.secondOperand) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
      }
      if (this.inputField === 3) {
        if (this.answer == this.res) {
          this.isCorrect = true;
        } else {
          this.isCorrect = false;
        }
      }
    }, 50);
  },
  mounted: function() {
    let timer = setInterval(() => {
      this.date = this.$moment(this.date.subtract(1, "seconds"));
      if (this.date.diff(this.$moment(0)) === 0) {
        this.isFinished = true;
        this.setVars();
        clearInterval(timer);
      }
    }, 1000);
  },
  destroyed() {
    clearInterval(this.checkIfCorrectInterval);
  }
};
</script>
