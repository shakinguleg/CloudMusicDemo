import http from '../../api/http';
import { SONGS_URL } from '../../api/url';

export default {
    namespaced: true,
    state: {
        playlist: {}

    },
    actions: {
        async getSongs(context, payload) {

            // 获取歌单中所有歌曲的trackIds, 利用该对象中的id去获取歌曲信息
            const { data: { playlist } } = await http.get(SONGS_URL, { id: payload })
            context.commit("setSongsId", playlist)
        }
    },
    mutations: {
        setSongsId(state, payload) {
            state.playlist = payload
        }
    }
}