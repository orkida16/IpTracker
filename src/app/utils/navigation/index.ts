import {navigationRef} from '../../navigators/refs';

export function navigate(name: any, params?: any) {
  return navigationRef?.current?.navigate?.(name, params);
}

export function goBack() {
  return navigationRef?.current?.goBack?.();
}
