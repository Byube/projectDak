import BigNumber from "bignumber.js";

export const formatHashDate = (fromDate) => {
  if (fromDate === null) {
    return;
  }
  const date = new Date(fromDate * 1000);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  year = year.toString().substr(-2);
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return (
    year +
    "." +
    month +
    "." +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );

}

export const formatyyyyDate = (fromDate) => {
  if (fromDate === null) {
    return;
  }
  const date = new Date(fromDate * 1000);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );

}

export const formatDate = (fromDate) => {
  if (fromDate === null) {
    return;
  }
  const date = new Date(fromDate);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  month = month >= 10 ? month : "0" + month;
  day = day >= 10 ? day : "0" + day;
  hour = hour >= 10 ? hour : "0" + hour;
  minute = minute >= 10 ? minute : "0" + minute;
  second = second >= 10 ? second : "0" + second;
  return (
    date.getFullYear() +
    "-" +
    month +
    "-" +
    day +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second
  );

}

export const formatAddress = (addressData) => {
  if (addressData === null) {
    return;
  }
  let address = addressData;
  address = addressData.substring(0, 10) + '....' + addressData.slice(-10);
  return (
    address
  );

}

export const formatHash = (hashData) => {
  if (hashData === null) {
    return;
  }
  let address = hashData;
  address = hashData.substring(0, 10) + '....';
  return (
    address
  );

}

import { ethers } from "ethers";
//코인 수량 계산
export const formatDigits = (fromData) => {
  if (fromData === null) {
    return;
  }
  let data = ethers.utils.formatEther(String(fromData));
  let result = new BigNumber(data).toFormat();
  return (
    result
  );
}

//전송 코인 단위 환상
export const formatSendAmount = (fromData) => {
  if (fromData === null) {
    return;
  }
  let removed = fromData.replace(/(,)/g, "");
  let checkNum = new BigNumber(removed);
  let data = ethers.utils.parseEther(checkNum.toString());
  let result = data.toString();
  return (
    result
  );
}

//코인 수수료 계산
export const formatFee = (gasPrice, gasUsed) => {
  if (gasPrice === null || gasUsed === null) {
    return;
  }
  let sumdata = gasPrice + gasUsed;
  let data = sumdata / Math.pow(10, 18);
  let result = new BigNumber(data).toFormat();
  return (
    result
  );

}

//수량 합계
export const sumAmount = (amount) => {
  if (amount.length === 0 || amount === null || amount === undefined) {
    return;
  }
  let result = 0;
  let arr = [];
  for (let i = 0; i < amount.length; i++) {
    let removed = amount[i].amount.replace(/(,)/g, "");
    arr.push(removed);
  }
  result = BigNumber.sum.apply(null, arr);
  return new BigNumber(result).toFormat();
}

//날짜형태에서 숫자형태로 변환
export const formatDateToNumber = (fromDate) => {
  if (fromDate === null) {
    return;
  }
  /* 초 단위로 변환 처리 */
  let result = Math.floor(new Date(fromDate).getTime() / 1000);
  return (
    result
  );

}

//현재 시간 기준 마지막 블록 지난 시간 계산
export const getLastBlockTime = (fromDate) => {
  if (fromDate === null) {
    return;
  }
  const date = new Date();
  let chai = date.getTime() - (fromDate * 1000);
  let result;
  if ((chai / 1000) < 60) {
    result = parseInt(chai / 1000) + ' 초전';
  } else if ((chai / 1000) < (60 * 60)) {
    result = parseInt((chai / 1000) / 60) + '분 ' + parseInt((chai / 1000) % 60) + '초전';
  } else if ((chai / 1000) < (60 * 60 * 24)) {
    result = parseInt((chai / 1000) / (60 * 60)) + '시간전';
  }
  return (
    result
  )
}

export const isLessThan = (datas, tokenAllowance) => {
  let arr = [];
  for (let i = 0; i < datas.length; i++) {
    arr.push(datas[i].amount);
  }
  let sum = BigNumber.sum.apply(null, arr);
  return BigNumber(tokenAllowance).lt(sum);
}