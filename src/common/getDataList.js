import { computed } from 'vue';
import { useStore } from 'vuex';
import constant from '@/common/constant.js';
import api from '@/api/index.js';

export const tokenListData = () => {
    const store = useStore();
    const tokenList = computed(() => store.state.token.tokenList);
    const contractList = computed(() => store.state.token.contractList);
    const ownerAddress = computed(() => store.state.token.owner);
    const status = computed(() => store.state.token.status);
    const mainNm = computed(() => store.state.mainNet.mainNetName);
    const mainNetIdx = computed(() => store.state.mainNet.mainNetIdx);
    const getTokenList = async (no) => {
        try {
            const res = await api.get(constant.url.GETCOINLIST + mainNetIdx.value);
            const response = await res.data.resultVO;
            store.dispatch(constant.store.token.SETTOKENLIST, { data: response, idx: no });
            store.dispatch(constant.store.token.SETOWNER, '');
        } catch (error) {
            console.log(error);
        }
    };
    const getTokenInfo = async (tokenAdd) => {
        try {
            const res = await api.get(constant.url.TOKENINFO + "networkId=" + mainNm.value + "&contractAddress=" + tokenAdd);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getOwnerAdd = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.OWNERADDRESS + "networkId=" + mainNm.value + '&contractAddress=' + contractAddress);
            const response = await res.data.resultVO;
            store.dispatch(constant.store.token.SETOWNER, response.data);
        } catch (error) {
            console.log('error >> ', error);
            store.dispatch(constant.store.token.SETOWNER, 'No Owner');
        }
    };
    const getAllowance = async (contractAddress, from, spender) => {
        try {
            const res = await api.get(constant.url.ALLOWANCE + mainNm.value + "&contractAddress=" + contractAddress + "&from=" + from + "&spender=" + spender);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const resetOwner = () => {
        store.dispatch(constant.store.token.SETOWNER, '');
    };
    const getLockUpData = async (contractAddress, address) => {
        try {
            const res = await api.get(constant.url.LOCKUP + "networkId=" + mainNm.value + '&contractAddress=' + contractAddress + '&address=' + address);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getTokenTimeLockInfo = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.TOKENTIMELOCKINFO + "networkId=" + mainNm.value + "&contractAddress=" + contractAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getTokenTimeLockBalance = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.TOKENTIMELOCKBALANCE + "networkId=" + mainNm.value + "&contractAddress=" + contractAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    };
    const getMultiOwner = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.MULTI_OWNER + "?networkId=" + mainNm.value + "&contractAddress=" + contractAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getMultitransferOwner = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.MULTITRANSFERFROM_OWNER + "?networkId=" + mainNm.value + "&contractAddress=" + contractAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getContractList = async (which) => {
        try {
            let URL;
            if (which === 0) {
                URL = constant.url.MULTISEND_CONTRACT + mainNetIdx.value;
            } else {
                URL = constant.url.MULTITRANSFER_CONTRACT + mainNetIdx.value;
            }
            const res = await api.get(URL);
            const response = await res.data.resultVO;
            store.dispatch(constant.store.token.SETCONTRACTLIST, response);
        } catch (error) {
            console.log(error);
        }
    }


    const getBalanceMultiSend = async (contractAddress) => {
        try {
            const res = await api.get(constant.url.GETBALANCE_MULTISEND + mainNm.value + '&contractAddress=' + contractAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getEvents = async (contractAddress, contractName) => {
        try {
            const res = await api.get(constant.url.GETEVENTS + mainNm.value + '&contractAddress=' + contractAddress + '&contractName=' + contractName);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getBalanceMultiTransfer = async (contractAddress, tokenAddress) => {
        try {
            const res = await api.get(constant.url.GETBALANCE_MULTITRANSFER + mainNm.value + '&contractAddress=' + contractAddress + '&tokenAddress=' + tokenAddress);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    // 공통 트랜잭션 컨펌 여부 확인
    const transactionCofirmed = async (hash) => {
        try {
            const res = await api.get(constant.url.TRANSACTION_CONFIRMED + mainNm.value + '&transactionHash=' + hash);
            const response = await res.data.resultVO;
            store.dispatch(constant.store.token.SETSTATUS, response);
        } catch (error) {
            console.log(error);
        }
    }

    // post 형식 공통 액션
    const doAction = async (which, datas) => {
        try {
            let URL;
            let sendData = {
                ...datas.value,
                networkId: mainNm.value
            };
            switch (which) {
                case 0:
                    URL = constant.url.TOKENOWNER;
                    break;
                case 1:
                    URL = constant.url.APPROVE;
                    break;
                case 2:
                    URL = constant.url.LOCKUPACTION;
                    break;
                case 3:
                    URL = constant.url.TRANSFERTOKENTIMELOCK;
                    break;
                case 4:
                    URL = constant.url.DEPLOYTOKENTIMELOCK;
                    break;
                case 5:
                    URL = constant.url.CHANGEOWNER_MULTISEND;    
                    break;
                case 6:
                    URL = constant.url.CHANGEOWNER_MULTITRANSFER;
                    break;
                case 7:
                    URL = constant.url.COIN_CHARGE;
                    break;
                case 8:
                    URL = constant.url.MULTISEND_TRANSFER;
                    break;
                case 9:
                    URL = constant.url.MULTITRANSFERFROM_TRANSFER;
                    break;
                default:
                    break;
            }
            const res = await api.post(URL, sendData);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    //메인넷에 따른 hash 값 etherscan 검색 페이지 이동
    const goScanpage = (hash) => {
        let URL;
        if (mainNm.value === 'ethereum') {
            URL = constant.url.ETHERSCANH + hash;
        } else if (mainNm.value === 'ropsten') {
            URL = constant.url.ROPSTENSCANH + hash;
        } else if (mainNm.value === 'bsc') {
            URL = constant.url.BSCSCAN + hash;
        }
        window.open(URL);
    }

    return {
        tokenList,
        getTokenList,
        getOwnerAdd,
        ownerAddress,
        getTokenInfo,
        getAllowance,
        resetOwner,
        getLockUpData,
        mainNm,
        getTokenTimeLockInfo,
        getTokenTimeLockBalance,
        getMultiOwner,
        getMultitransferOwner,
        getContractList,
        contractList,
        doAction,
        transactionCofirmed,
        status,
        getBalanceMultiSend,
        getEvents,
        getBalanceMultiTransfer,
        goScanpage,
    }
}

export const mainNetData = () => {
    const store = useStore();
    const mainNetList = computed(() => store.state.mainNet.mainNetList);
    const mainNetIdx = computed(() => store.state.mainNet.mainNetIdx);
    const mainNm = computed(() => store.state.mainNet.mainNetName);
    const getMainNetList = async () => {
        try {
            const res = await api.get(constant.url.MAINNETLIST);
            const response = await res.data.resultVO;
            store.dispatch(constant.store.mainNet.SETMAINNETLIST, response);
        } catch (error) {
            console.log(error);
            window.localStorage.clear();
            window.sessionStorage.clear();
        }
    };
    const changeMainNetIdx = (meIdx) => {
        store.dispatch(constant.store.mainNet.CHANGEMAINNET, meIdx);
    }
    const changeMainNetName = (mainNm) => {
        // let mainNetName = "networkId=" + mainNm + "&";
        store.dispatch(constant.store.mainNet.CHANGEMAINNETNAME, mainNm);
    }
    return {
        mainNetList,
        getMainNetList,
        mainNetIdx,
        changeMainNetIdx,
        changeMainNetName,
        mainNm,
    }
}

export const blockchainFeeInfo = () => {
    const store = useStore();
    const mainNm = computed(() => store.state.mainNet.mainNetName);
    const getFee = async () => {
        try {
            const res = await api.get(constant.url.GETFEE + mainNm.value);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    const getGasLimit = async (data) => {
        try {
            let sendData = {};
            if (data.methodName === 'charge' || data.methodName === 'release') {
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [],
                    privateKey: data.privateKey
                }
            } else if (data.methodName === 'withdrawls') {
                let address = [];
                let amount = [];
                data.arrayList.forEach(element => {
                    let removed = element.amount.replace(/(,)/g, "");
                    address.push(element.address)
                    amount.push(removed)
                });
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [address, amount],
                    privateKey: data.privateKey
                }
            } else if (data.methodName === 'setLock') {
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [data.newOwner, data.expireDate, data.lockupAmount],
                    privateKey: data.privateKey
                }
            } else if (data.methodName === 'multiTransferFrom') {
                let amount = [];
                let fromAddress = [];
                let toaddress = [];
                let tokenAddress = [];
                data.arrayList.forEach(element => {
                    amount.push(element.amount)
                    fromAddress.push(element.fromAddress)
                    toaddress.push(element.toAddress)
                    tokenAddress.push(element.tokenAddress)
                });
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [tokenAddress, fromAddress, toaddress, amount],
                    privateKey: data.privateKey
                }
            } else if (data.methodName === 'approve') {
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [
                        data.approveSpender, data.allowance
                    ],
                    privateKey: data.privateKey
                }
            } else {
                sendData = {
                    contractAddress: data.contractAddress,
                    contractName: data.contractName,
                    methodName: data.methodName,
                    networkId: mainNm.value,
                    params: [
                        data.newOwner
                    ],
                    privateKey: data.privateKey
                }
            }
            console.log('getGasLimit >>>>>>>>>>>>>>>>>>>>', sendData);
            console.log('getGasLimit >>>>>>>>>>>>>>>>>>>>', data.newOwner);
            const res = await api.post(constant.url.GETGASLIMIT, sendData);
            const response = await res.data.resultVO;
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    return {
        getFee,
        getGasLimit
    }
}

