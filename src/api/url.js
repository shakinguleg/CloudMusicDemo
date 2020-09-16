export const HOST = "http://localhost:8081/api"


/* 获取推荐歌单 */
export const MINE_URL = "/personalized"


/* 获取歌单详情 */
/** http://localhost:3000/playlist/detail?id=5220741653 **/
export const SONGS_URL = "/playlist/detail"

/* 根据歌单详情中的trackIds中的id获取歌曲信息 */
/**http://localhost:3000/song/detail?ids=1401414335 **/
export const SONG_INFO_URL = "/song/detail"

/* 根据歌单详情中的trackIds中的id获取歌曲url地址*/
/*http://localhost:3000/song/url?id=1401414335 */
export const SONG_URL = "song/url"


/* 发现 - 轮播图 */
export const BANNER_URL = 'banner'