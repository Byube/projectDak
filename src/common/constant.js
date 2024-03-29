/**
 * @namespace constant
 * @description 상수모음
 * @example constant.url.ONLOGIN ..
 */

export default {
    key: {
        MAINNET: 'mainNet',
        MAINNET_NAME: 'mainNetName',
    },
    url: {
        GETDATA:'test/app/products.json',
        ONLOGIN: '/',
        LOGINFAIL: '/#/signIn',
        ONLOGOUT: '/signIn',
        LOGIN: 'auth-api/login/manager?id=',
        LOGOUT: '/',
        GETIP: 'https://api.ipify.org?format=json',
        ETHERSCANA: 'https://etherscan.io/address/',
        ETHERSCANH: 'https://etherscan.io/tx/',
        ROPSTENSCANH: 'https://ropsten.etherscan.io/tx/',
        BSCSCAN: 'https://bscscan.com/tx/',
        MENU_LIST: 'menu/getMenuList/',
        MENU_PATH: 'menu/getMenuPath/',
        GETCOINLIST: 'coin/getCoinList/',
        MAINNETLIST: 'network/getNetworkList',
        TOKENINFO: 'blockchain/tokenInfo?',
        OWNERADDRESS: 'blockchain/owner?',
        ALLOWANCE: 'blockchain/allowance?networkId=',
        APPROVE: 'blockchain/approve',
        GETCONINTRANSACTION: 'blockchain/history?page=',
        LOCKUP: 'blockchain/lock?',
        LOCKUPACTION: 'blockchain/lockUp',
        TOKENTIMELOCKINFO: 'blockchain/tokentimelock/info?',
        TOKENTIMELOCKBALANCE: 'blockchain/tokentimelock/balance?',
        MULTI_OWNER: 'blockchain/multisend/owner',
        MULTITRANSFERFROM_OWNER: 'blockchain/multitransferfrom/owner',
        GETFEE: 'blockchain/getFee?networkId=',
        GETGASLIMIT: 'blockchain/estimateGas',
        MULTISEND_CONTRACT: 'conctract/multiSendContractList/',
        MULTITRANSFER_CONTRACT: 'conctract/multiTransferContractList/',
        CHANGEOWNER_MULTISEND: 'blockchain/multisend/owner',
        CHANGEOWNER_MULTITRANSFER: 'blockchain/multitransferfrom/owner',
        TRANSACTION_CONFIRMED: 'blockchain/confirmed?networkId=',
        GETBALANCE_MULTISEND: 'blockchain/multisend/balance?networkId=',
        GETEVENTS: 'blockchain/events?networkId=',
        GETBALANCE_MULTITRANSFER: 'blockchain/multitransferfrom/info?networkId=',
        COIN_CHARGE: 'blockchain/multisend/charge',
        TRANSFERTOKENTIMELOCK: 'blockchain/tokentimelock/transfer',
        DEPLOYTOKENTIMELOCK: 'blockchain/deploy/tokentimelock',
        MULTISEND_TRANSFER: 'blockchain/multisend/transfer',
        MULTITRANSFERFROM_TRANSFER: 'blockchain/multitransferfrom/transfer',
        TOKENOWNER: 'blockchain/owner',
    },
    data: {
        MENULIST: 'menu_list',
        MENUPATH: 'menu_path',
        SORTDATA: [
            {
                name: '평점높은순',
                code: -1,
            },
            {
                name: '평점낮은순',
                code: 1,
            }
        ],
        FILTERDATA: [
            {
                name: '모두',
                code: 'all',
            },
            {
                name: '긍정적',
                code: '긍정적',
            },
            {
                name: '부정적',
                code: '부정적',
            }
        ],
    },
    dialog: {
        MAINNETOWNER: '메인넷 코인 멀티 전송',
        MULTITRANSFEROWNER: '토큰 멀티 전송',
        TOKENTIMELOCK: '토큰 타임 락',
        RESET: '초기화 하시겠습니까?',
        CHANGEPWD: '비밀번호를 변경 하시겠습니까?',
        SAVEDATA: '입력하신 내용을 저장 하시겠습니까?',
        DELETEDATA: '선택하신 내용을 삭제 하시겠습니까?',
        UPDATEDATA: '선택하신 내용을 수정 하시겠습니까?',
        CREATE: 'save',
        MODIFY: 'update',
        DELETE: 'delete',
        WITHDRAWRESET: '요청오류 초기화를 하시겠습니까?',
        WITHDRAWDO: '출금완료 처리 하시겠습니까?',
        WITHDRAWCANCEL: '출금을 취소 하시겠습니까?',
        WITHDRAWAPPROVAL: '출금을 승인 하시겠습니까?',
        SUCCESS_CREATE: '등록완료',
        SUCCESS_MODIFY: '수정완료',
        SUCCESS_DELETE: '삭제완료',
        ERROR_MSG: '오류 발생 하였습니다. 해당 오류 코드 확인 바랍니다 >',
        CHECKSEND: '최종 전송 하시겠습니까?',
    },
    errmsg: {
        LOGINFAIL: '아이디 또는 비밀번호를 확인 하세요',
        NOID: '아이디를 입력하세요',
        NONAME: '이름을 입력하세요',
        NOEXCHANGEID: '거래소ID 값을 입력하세요(ex coinone)',
        NOICONURL: 'ICON URL 값을 입력하세요',
        NODOMESTIC: '국내거래소 여부 선택 하세요',
        NODEFAULTEXCHANDE: '통합거래기본거래소 여부 선택 하세요',
        NOPAUSETRADING: '거래소중지 여부 선택 하세요',
        CHECKCONTRACT: '컨트랙트 주소값 확인 바랍니다.',
        NOCONTRACT: '컨트랙트를 선택 하세요',
        NOTOKEN: '토큰을 선택 하세요',
        CHECKPRIVATEKEY: '올바르지 않은 비공개키 입니다.',
        NOLOCKUPAMOUNT: '락업수량을 확인 하세요.',
        CHECKTIME: '만료시간을 확인 하세요.',
        CHECKFROM: '프롬 주소값 확인 바랍니다',
        CHECKSPENDER: '스펜더 주소값 확인 바랍니다',
        NOALLOWANCE: '전송 허용 수량을 확인 하세요',
        LESSTOKEN: '토큰 잔액이 부족 합니다.',
        CHECKDISTRIBUTION: '배포 수령 주소값 확인 바랍니다',
        CHECKAMOUNT: '올바르지 않은 수량 값 입니다.',
        CHECKLOCKUP:'LockUp 주소 값 확인 바랍니다.',
        CHECKLOCKUPAMOUNT:'LockUp 수량 확인 바랍니다.',
        NOLOCKUPTIME:'LockUp 만료시간 선택 해 주세요.',
        CHECKOWNER:'Owner 주소 값 확인 바랍니다.',
        CHECKADDRESS:'올바르지 않은 주소 값 입니다.',
    },
    store: {
        auth: {
            LOGIN: 'checkAuth/login',
            ERROR: 'checkAuth/setErrMessage',
            FAIL: 'checkAuth/setIsLoginFail',
            SETAUTH: 'checkAuth/setIsAuthenticated',
        },
        theme:{
            SET_THEME:'theme/changeTheme',
            SET_DARK:'theme/changeDarkState'
        },
        memberInfo: {
            SETINFOLIST: 'memberInfo/getMemberInfoList',
            GETMEMBERNICELIST: 'memberInfo/getMemberNiceList',
            GETMEMBERNICELISTONPAGE: 'memberInfo/getMemberNiceListOnPage',
        },
        menulist: {
            CHANGEMOBILEMENUSTATE: 'sideNav/changeMobileMenuState',
            CHANGEMOBILESTATE: 'sideNav/changeMobileMenuState',
            CHANGEOVERLAYMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGEOVERMENUSTATE: 'sideNav/changeOverlayMenuState',
            CHANGESTATICMENUINACTIVE: 'sideNav/changeStaticMenuInactive',
            CHANGELAYOUTMODE: 'sideNav/changeLayoutMode',
            CHANGEMENUONCLICK: 'sideNav/checkMenuOnclick',
            SETMENULIST: 'sideNav/setMenuList',
        },
        menuName: {
            CHECKONMENU: 'menuName/checkOnMenu',
        },
        mainNet: {
            SETMAINNETLIST: 'mainNet/setMainNetList',
            CHANGEMAINNET: 'mainNet/changeMainNetIdx',
            CHANGEMAINNETNAME: 'mainNet/changetMainNetName',
        },
        token: {
            SETTOKENLIST: 'token/setTokenList',
            SETOWNER: 'token/setOwnerAddress',
            SETCONTRACTLIST: 'token/setContractAddress',
            SETSTATUS: 'token/setStatus',
        },
        dialog: {
            CHANGEWHICH: 'dialog/changeWhich',
            CHANGDISPLAY1: 'dialog/changeDispaly1',
            CHANGDISPLAY2: 'dialog/changeDispaly2',
            CHANGDISPLAY3: 'dialog/changeDispaly3',
            SETMESSAGE: 'dialog/setConfirmMessage',
            SETSENDDATAS: 'dialog/setSendDatas',
        },
    },


}