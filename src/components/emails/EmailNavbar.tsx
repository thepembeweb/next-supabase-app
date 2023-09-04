import { Section } from '@react-email/section';
import { Column } from '@react-email/column';
import { Text } from '@react-email/text';

import configuration from '~/configuration';

function EmailNavbar(
  props: React.PropsWithChildren<{
    productName?: string;
  }>
) {
  const productName = props.productName ?? configuration.site.name;

  return (
    <Section style={{ width: '100%' }}>
      <Column>
        <Text style={{ textAlign: 'center' }}>
          {/* Add your logo here */}

          {productName}
        </Text>
      </Column>
    </Section>
  );
}

export default EmailNavbar;
