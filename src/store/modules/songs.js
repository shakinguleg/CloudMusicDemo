import http from '../../api/http';
import { SONGS_URL } from '../../api/url';

export default {
    namespaced: true,
    actions: {
        async getSongs(context, payload) {

            // 获取歌单中所有歌曲的trackIds, 利用该对象中的id去获取歌曲信息
            const a = await http.get(SONGS_URL, { id: payload })

        }
    }
}