import { createI18n } from 'vue-i18n';
import pinia from '@/store/index';
import { storeToRefs } from 'pinia';
import useSettingsStore from '@/store/modules/settings';

// element plus 自带国际化
import zhcnLocale from 'element-plus/es/locale/lang/zh-cn';
import enLocale from 'element-plus/es/locale/lang/en';
import viLocale from 'element-plus/es/locale/lang/vi';
// 引入自定义中文包
import customZH from './locales/zh'
// 引入自定义英文包
import customEN from './locales/en'
import customVI from './locales/vi'

// 读取 pinia 默认语言
const stores = useSettingsStore(pinia);
const settingsStore = storeToRefs(stores);
const lang = settingsStore.globalI18n.value || 'zh';

// import.meta.glob  vite 中用来批量导入模块的方法
const modules = import.meta.glob('./**/*.js', { eager: true });
const itemize = { 'zh': [], 'en': [], 'vi': [] };
const element = { 'zh': zhcnLocale, 'en': enLocale, 'vi': viLocale };
const messages = {};

export const i18n = createI18n({
  legacy: false,
  locale: lang, // 默认显示语言
  globalInjection: true, // 全局注入 $t 函数
  silentTranslationWarn: true, // 去掉警告
  missingWarn: false,
  silentFallbackWarn: true, //抑制警告
  fallbackLocale: zhcnLocale.name,
  messages: {
    // 英文环境下的语言数据
    en: {
      ...enLocale,
      ...customEN,
    },
    // 中文环境下的语言数据
    zh: {
      ...zhcnLocale,
      ...customZH
    },
    vi:{
      ...viLocale, 
      ...customVI,  
    }
  }
  // messages
});

const translate = (localeKey) => {
  const locale = localStorage.getItem('locale') || "zh"
  
  const hasKey = i18n.global.te(localeKey, locale); // 使用i18n的 te 方法来检查是否能够匹配到对应键值
  const translatedStr = i18n.global.t(localeKey);
  if (hasKey) {
    return translatedStr;
  }
  return localeKey;
};

export default i18n
export { translate }