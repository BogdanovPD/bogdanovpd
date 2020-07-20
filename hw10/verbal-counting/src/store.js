import Vue from 'vue';
import Vuex from 'vuex';


export class Score {
    constructor(result, time, complexity) {
        this.result = result;
        this.time = time;
        this.complexity = complexity;
    }
}

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        lastResult: 0,
        lastTime: 0,
        lastComplexity: 0,
        gamesCount: 0,
        bestScore: new Score(0, 0, 0)
    },
    getters: {
        LAST_RESULT: state => {
            return state.lastResult;
        },
        LAST_TIME: state => {
            return state.lastTime;
        },
        LAST_COMPLEXITY: state => {
            return state.lastComplexity;
        },
        GAMES_COUNT: state => {
            return state.gamesCount;
        },
        BEST_SCORE: state => {
            return state.bestScore;
        },
    },
    mutations: {
        SET_LAST_RESULT: (state, payload) => {
            state.lastResult = payload;
        },
        SET_LAST_TIME: (state, payload) => {
            state.lastTime = payload;
        },
        SET_LAST_COMPLEXITY: (state, payload) => {
            state.lastComplexity = payload;
        },
        INCREMENT_GAMES_COUNT: (state) => {
            state.gamesCount = state.gamesCount + 1;
        },
        SET_BEST_SCORE: (state, score) => {
            console.log(state.complexity)
            if (score.result >= state.lastResult && score.time <= state.lastTime && score.complexity >= state.lastComplexity) {
                state.bestScore = score;
            }
        },
    },
    actions: {
        SET_LAST_RESULT: (context, result) => {
            context.commit('SET_LAST_RESULT', result);
        },
        SET_LAST_TIME: (context, time) => {
            context.commit('SET_LAST_TIME', time);
        },
        SET_LAST_COMPLEXITY: (context, complexity) => {
            context.commit('SET_LAST_COMPLEXITY', complexity);
        },
        INCREMENT_GAMES_COUNT: (context) => {
            context.commit('INCREMENT_GAMES_COUNT');
        },
        SET_SCORE: (context, score) => {      
            context.commit('SET_BEST_SCORE', score);
        },
    },
});