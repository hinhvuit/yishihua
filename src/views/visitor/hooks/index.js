export const useCardType = () => {
  // 1身份证、2护照、3港澳通行证、4香港通行证、5台胞证
  const cardType = [
    { label: '身份证', value: 1 },
    { label: '护照', value: 2 },
    { label: '港澳通行证', value: 3 },
    { label: '香港通行证', value: 4 },
    { label: '台胞证', value: 5 }
  ];
  const getCardType = (type) => {
    return cardType.find((item) => item.value === type);
  };
  return { cardType, getCardType };
};

export const useOutType = () => {
  const outType = [
    { label: '进', value: 1 },
    { label: '出', value: 2 }
  ];
  const getOutType = (type) => {
    return outType.find((item) => item.value === type);
  };
  return { outType, getOutType };
};

export const useAutType = () => {
  // 1刷脸 2刷卡
  const autType = [
    { label: '刷脸', value: 1 },
    { label: '刷卡', value: 2 }
  ];
  const getAutType = (type) => {
    return autType.find((item) => item.value === type);
  };
  return { autType, getAutType };
};

export const useSexType = () => {
  //访客性别 0女 1男
  const sexType = [
    { label: '女', value: 0 },
    { label: '男', value: 1 }
  ];
  const getSexType = (type) => {
    return sexType.find((item) => item.value === type);
  };
  return { sexType, getSexType };
};
