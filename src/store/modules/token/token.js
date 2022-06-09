
export default {
    namespaced: true,
    state: {
        tokenList: [],
        owner: '',
        contractList: [],
        status:false
    },
    mutations: {
        SET_TOKEN_LIST(state, payload) {
            state.tokenList = payload;
        },
        SET_OWNER_ADDRESS(state, payload) {
            state.owner = payload;
        },
        SET_CONTRACT_LIST(state, payload) {
            state.contractList = payload;
        },
        SET_STATUS(state, payload){
            state.status = payload
        }
    },
    actions: {
        setTokenList({ commit }, response) {
            let tokenList = [];
            let token = {};
            for (let i = 0; i < response.data.length; i++) {
                let tokenName = response.data[i].coCoinName;
                let toKenAddress = response.data[i].coContractAddress;
                token = {
                    name: tokenName,
                    code: toKenAddress,
                }
                tokenList.push(token);
            }
            if (response.idx === 0) {
                token = {
                    name: '직접 입력',
                    code: 'directly'
                };
                tokenList.push(token);
            }
            commit('SET_TOKEN_LIST', tokenList);
        },
        setOwnerAddress({ commit }, ownerAdd) {
            commit('SET_OWNER_ADDRESS', ownerAdd);
        },
        setContractAddress({ commit }, response) {
            let contractList = [];
            let contract = {};
            for (let i = 0; i < response.length; i++) {
                contract = {
                    name: response[i].conContractAddress,
                    code: response[i].conContractAddress,
                }
                contractList.push(contract);
            }
            commit('SET_CONTRACT_LIST', contractList);
        },
        setStatus({commit}, response){
            console.log('>>>>>>>>>>>>>>>',response.data)
            commit('SET_STATUS', response.data);
        }

    },
    getters: {

    }
}