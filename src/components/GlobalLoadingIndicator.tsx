'use client';

import TopLoadingBarIndicator from '~/components/TopLoadingBarIndicator';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';

function GlobalLoadingIndicator({
  children,
  displayLogo = false,
  fullPage = false,
}: React.PropsWithChildren<{
  displayLogo?: boolean;
  fullPage?: boolean;
}>) {
  return (
    <>
      <TopLoadingBarIndicator />

      <div className={'flex flex-1 flex-col items-center justify-center py-48'}>
        <PageLoadingIndicator displayLogo={displayLogo} fullPage={fullPage}>
          {children}
        </PageLoadingIndicator>
      </div>
    </>
  );
}

export default GlobalLoadingIndicator;
