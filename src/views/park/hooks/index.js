export const useStstusType = () => {
  const statusType = [
    { label: '已提交', value: 1 },
    { label: '未提交', value: -1 },
    { label: '过期未完成', value: -2 },
    { label: '已完成', value: 2 }
  ];
  const getStatusType = (type) => {
    return statusType.find((item) => item.value === type);
  };
  return { statusType, getStatusType };
};

export const useHolidayType = () => {
  const outHoliday = [
    { label: '元旦', value: '元旦'},
    { label: '春节', value: '春节' },
    { label: '清明节', value: '清明节'},
    { label: '劳动节', value: '劳动节'},
    { label: '端午节', value: '端午节'},
    { label: '中秋节', value: '中秋节'},
    { label: '国庆节', value: '国庆节'},
  ];
  const getHolidayType = (type) => {
    return outHoliday.find((item) => item.value === type);
  };
  return { outHoliday, getHolidayType };
};
export const useyearType = () => {
  const outyear = [
    { label: '2024', value: '2024'},
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026'},
    { label: '2027', value: '2027'},
    { label: '2028', value: '2028'},
    { label: '2029', value: '2029'},
    { label: '2030', value: '2030'}
  ];
  const getyearType = (type) => {
    return outyear.find((item) => item.value === type);
  };
  return { outyear, getyearType };
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
