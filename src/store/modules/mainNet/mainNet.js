
export default {
    namespaced: true,
    state: {
        mainNetList: [],
        networkId: {},
        mainNetIdx: import.meta.env.VITE_MAIN_NET_DEFAULT,
        mainNetName: import.meta.env.VITE_MAIN_NET_DEFAULT_NM,
    },
    mutations: {
        SET_MAINNET_LIST(state, payload) {
            state.mainNetList = payload;
        },
        SET_MAINNET_INFO(state, payload) {
            state.networkId = payload;
        },
        CHANGE_MAINNET_IDX(state, payload) {
            state.mainNetIdx = payload;
        },
        CHANGE_MAINNET_NAME(state, payload) {
            state.mainNetName = payload;
        },
    },
    actions: {
        setMainNetList({ commit }, response) {
            let mainNetList = [];
            let mainNet = {};
            for (let i = 0; i < response.length; i++) {
                let mainNetName = response[i].neNetworkName;
                let mainNetIdx = response[i].neIdx;
                let neNetworkId = response[i].neNetworkId;
                mainNet = {
                    name: mainNetName,
                    code: String(mainNetIdx),
                    id:neNetworkId
                }
                mainNetList.push(mainNet);
            }
            commit('SET_MAINNET_LIST', mainNetList);
        },
        changeMainNetIdx({ commit }, meIdx) {           
            commit('CHANGE_MAINNET_IDX', meIdx);
        },
        changetMainNetName({ commit },mainNm){
            commit('CHANGE_MAINNET_NAME', mainNm);
        }
    },
    getters: {

    }
}