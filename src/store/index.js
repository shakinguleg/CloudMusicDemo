import Vue from 'vue';
import Vuex from 'vuex';
import mine from './modules/mine';
import collection from './modules/collection';
import songInfo from './modules/songInfo';
import playSongAbout from './modules/playSongAbout';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        mine,
        collection,
        songInfo,
        playSongAbout
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