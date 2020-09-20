import http from '../../api/http';
import { SONG_LYRIC } from '../../api/url';


export default {
    namespaced: true,
    mutations: {
        setSongAbout(state, payload) {
            state.songId = payload.songId;
            state.trackIds = payload.trackIds;
        },
        setShow(state, payload) {
            state.isShow = payload
        },
        setPlay(state, payload) {
            state.isPlay = payload
        },
        setSongId(state, payload) {
            state.songId = payload
        },
        setLyrics(state, payload) {
            state.lyrics = payload
        },
    },
    state: {
        songId: '',
        trackIds: [],
        isShow: false,
        isPlay: false,
        lyrics: ''
    },
    actions: {
        async getLyrics(context, payload) {
            try {
                const { data: { lrc: { lyric } } } = await http.get(SONG_LYRIC, payload)
                if (!lyric) {
                    context.commit("setLyrics", " ")
                    return
                }
                var a = lyric.replace(/\n/g, '')
                a = a.split('[')
                var lyrics = a.map(item => item.split(']')) //得到的每句歌词和所对应时间的数组
                context.commit("setLyrics", lyrics)
            } catch (e) {
                context.commit("setLyrics", " ")
            }

        }
    }
}