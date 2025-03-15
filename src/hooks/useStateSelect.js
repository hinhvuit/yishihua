import useUserStore from '@/store/modules/user';
export default function useStateSelect() {
  const userStore = useUserStore();
  const nowPark = computed(() => userStore.getNowPark().name);
  const types = [
    { label: nowPark.value + '列管', value: 0, id: 1 },
    { label: '全集团列管', value: 1, id: 2 },
    { label: nowPark.value + '解除列管', value: 2, id: 3 },
    { label: '全集团解除列管', value: 3, id: 4 }
  ];
  function getType(value) {
    let result = types.find((item) => {
      return item.value == value;
    });
    return result;
  }

  return { types, getType };
}
