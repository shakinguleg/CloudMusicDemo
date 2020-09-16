import http from '../../api/http';
import { SONG_INFO_URL, SONG_URL } from '../../api/url';

export default {
    namespaced: true,
    mutations: {
        setSongInfo(state, payload) {
            state.songInfo = payload
        },
        setSongUrl(state, payload) {
            state.songUrl = payload
        }
    },
    state: {
        songInfo: {},
        songUrl: ''
    },
    actions: {
        // http://localhost:3000/song/detail?ids=1401414335
        async getSongInfo(context, payload) {
            var songInfo = await http.get(SONG_INFO_URL, { ids: payload })
            context.commit("setSongInfo", songInfo);
            return context.state.songInfo;
        },
        /* 根据歌单详情中的trackIds中的id获取歌曲url地址*/
        /*http://localhost:3000/song/url?id=1401414335 */
        async getSongUrl(context, payload) {

            var { data: { data: [{ url }] } } = await http.get(SONG_URL, { id: payload })
            context.commit('setSongUrl', url)
            return context.state.songUrl

        }

    },
}