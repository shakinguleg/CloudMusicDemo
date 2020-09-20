import http from '../../api/http';
import { MINE_URL } from '../../api/url';


export default {
    namespaced: true,
    state: {
        data: []
    },
    actions: {
        async requireMineData(context, payload) {
            const data = await http.get(MINE_URL)
            const { data: { code, result } } = data
            if (code == 200) {
                context.commit('setData', result)
            }
        }
    },
    mutations: {
        setData(state, payload) {
            state.data = payload;
        }
    }
}