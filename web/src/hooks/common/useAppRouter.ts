import { useLayoutEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const sendRouterEvent = async (params: Record<string, string | Record<string, unknown>>) => {
  window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'ROUTER_EVENT', ...params }));
};

export default function useAppRouter() {
  const pathname = usePathname();
  const router = useRouter();
  const [isApp, setIsApp] = useState(false);

  useLayoutEffect(() => {
    setIsApp(typeof window !== 'undefined' && window.ReactNativeWebView);
  }, []);

  const push = async (
    url: string,
    options?: NavigateOptions
  ): Promise<void | boolean> => {
    return isApp
      ? sendRouterEvent({ path: url })
      : router.push(url, options);
  };

  const replace = async (
    url: string,
    options?: NavigateOptions
  ): Promise<void | boolean> => {
    return isApp
      ? sendRouterEvent({ path: url })
      : router.replace(url, options);
  };

  const reload = async (): Promise<void> =>
    isApp ? sendRouterEvent({ path: pathname }) : router.refresh();

  const back = async (): Promise<void> =>
    isApp ? sendRouterEvent({ path: 'back' }) : router.back();

  return {
    isApp,
    push,
    replace,
    reload,
    back,
  };
};