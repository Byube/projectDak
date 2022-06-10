export default {
    namespaced: true,
    state: {
        dark:false,
        theme:''
    },
    mutations: {
        SET_DARK(state, payload) {
            state.dark = payload;
        },
        SET_THEME(state, payload){
            state.theme = payload
        }
    },
    actions: {
        changeDarkState({ commit }, status) {
            commit('SET_DARK', status);
        },
        changeTheme({ commit }, nowTheme){
            commit('SET_THEME', nowTheme);
        }
    },
    getters: {

    }
}