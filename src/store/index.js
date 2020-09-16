import Vue from 'vue';
import Vuex from 'vuex';
import mine from './modules/mine';
import collection from './modules/collection';
import songInfo from './modules/songInfo';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mine,
        collection,
        songInfo
    },
    mutations: {

    },
    state: {

    },
    getters: {

    },
    actions: {

    }
})