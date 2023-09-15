type UseI18n = <T extends Record<string, string>>(reflect: T) => T;

/**
 * 使用 chatGPT 进行翻译
 */
const useI18n: UseI18n = (reflect) => reflect;

export default useI18n;
