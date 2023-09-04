import { getMDXComponent } from 'next-contentlayer/hooks';
import type { MDXComponents } from 'mdx/types';
import Components from '~/app/(site)/blog/components/MDXComponents';

function Mdx({
  code,
}: React.PropsWithChildren<{
  code: string;
}>) {
  const Component = getMDXComponent(code);

  return <Component components={Components as unknown as MDXComponents} />;
}

export default Mdx;
