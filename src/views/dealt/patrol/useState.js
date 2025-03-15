export function useType() {
  const typeList = [
    { label: '发起巡查', value: 1 },
    { label: '中央巡查', value: 2 },
    { label: '异常处理', value: 3 },
    { label: '园区自查自检', value: 4 }
  ];
  function getType(val) {
    return typeList.find((item) => item.value === val);
  }
  return {
    typeList,
    getType
  };
}

export function useStatus() {
  const statusList = [
    [
      { label: '待审核', value: 1 },
      { label: '待巡查', value: 2 },
      { label: '驳回', value: 3 },
      { label: '过期', value: 4 }
    ],
    [
      { label: '待巡查', value: 1 },
      { label: '待确认', value: 2 },
      { label: '完成', value: 3 },
      { label: '驳回', value: 4 }
    ],
    [
      { label: '待确认', value: 1 },
      { label: '驳回', value: 2 },
      { label: '待整改', value: 3 },
      { label: '待复检', value: 4 },
      { label: '待审核', value: 5 },
      { label: '已完成', value: 6 },
      { label: '撤回', value: 7 }
    ],
    [
      { label: '待审核', value: 1 },
      { label: '待自查', value: 2 },
      { label: '驳回', value: 3 },
      { label: '过期', value: 4 },
      { label: '已完成', value: 5 },
      { label: '已过期（未审核）', value: 6 },
      { label: '已过期（被驳回）', value: 7 },
      { label: '已过期（未自查）', value: 8 }
    ]
  ];
  function getStatus(index, val) {
    return statusList[index - 1].find((item) => item.value === val);
  }
  return {
    statusList,
    getStatus
  };
}

export function useCenterState() {
  const centerstates = [
    { value: 1, label: '待巡查' },
    { value: 2, label: '待确认' },
    { value: 3, label: '完成' },
    { value: 4, label: '驳回' }
  ];
  function getCenterstate(value) {
    return centerstates.find((item) => item.value == value);
  }
  return { centerstates, getCenterstate };
}

export function useUserType() {
  const userTypeList = [
    // 发起巡查 type = 1
    [
      { label: '申请人', value: 1 },
      { label: '巡查主管', value: 2 },
      { label: '园区安全主管', value: 3 }
    ],
    // 开始巡查 index = 2
    [
      { label: '巡查人', value: 1 },
      { label: '园区窗口', value: 2 },
      { label: '巡查主管', value: 3 },
      { label: '园区安全主管', value: 4 }
    ],
    // 异常处理 index = 3
    [
      { label: '巡查人', value: 1 },
      { label: '园区窗口', value: 2 },
      { label: '巡查主管', value: 3 },
      { label: '园区安全主管', value: 4 },
      { label: '园区窗口', value: 5 },
      { label: '园区安全主管', value: 6 },
      { label: '巡查人', value: 7 },
      { label: '巡查主管', value: 8 }
    ]
  ];
  function getUserType(index, val) {
    return userTypeList[index - 1].find((item) => item.value === val);
  }
  return {
    userTypeList,
    getUserType
  };
}

// 绩优案例类型
export const useMerit = () => {
  const meritList = [
    { label: '采用技防措施降低成本，提高安全管控的成效和精准度。', value: 1 },
    { label: '具有园区特有的安全管理措施，值得其他园区学习借鉴。', value: 2 },
    { label: '得到当地政府对园区治安管理的肯定（荣誉证书、锦旗、牌匾或正式文件等形式）', value: 3 },
    { label: '得到集团客户对园区安全管理的肯定（荣誉证书、锦旗、牌匾或邮件等形式）', value: 4 }
  ];
  const getMerit = (type) => {
    return meritList.find((item) => item.value === type);
  };
  return { meritList, getMerit };
};

// 事故案例类型
export const useAccident = () => {
  const accidentList = [
    {
      label: '群体事件',
      value: 1,
      meno: '3 人(含)以上罢工、聚众滋事，情绪激动有非理性行为，因未及时处理或处理不当导致的严重扰乱生产经营、生活秩序的行为，或造成重大的社会舆论负面影响。'
    },
    { label: '财产失窃案件', value: 2, meno: '因安全管理不当造成有形资产损失' },
    { label: '人身伤亡事件（非生产类工伤）', value: 3, meno: '因安全管理不当发生的人身伤害等严重危害公共安全的事件。' }
  ];
  const getAccident = (type) => {
    return accidentList.find((item) => item.value === type);
  };
  return { accidentList, getAccident };
};

// 绩优等级
export const useMeritLevel = () => {
  const meritLevelList = [
    { label: '县级', value: 1 },
    { label: '市级', value: 2 },
    { label: '省级', value: 3 },
    { label: '国家级', value: 4 }
  ];
  const getMeritLevel = (type) => {
    return meritLevelList.find((item) => item.value === type);
  };
  return { meritLevelList, getMeritLevel };
};

// 检查结果
export const useCheckResult = () => {
  const checkResultList = [
    { label: '是', value: 1 },
    { label: '否', value: 2 },
    { label: '不适用', value: 3 }
  ];
  const getCheckResult = (type) => {
    return checkResultList.find((item) => item.value === type);
  };
  return { checkResultList, getCheckResult };
};

// 签核状态
export const useSignStatus = () => {
  const signStatusList = [
    { label: '同意', value: 3 },
    { label: '驳回', value: 4 }
  ];
  const getSignStatus = (type) => {
    return signStatusList.find((item) => item.value === type);
  };
  return { signStatusList, getSignStatus };
};
