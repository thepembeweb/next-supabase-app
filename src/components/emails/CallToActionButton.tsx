import { Button } from '@react-email/button';

// update this with your brand's primary color
const PRIMARY_COLOR = `#3b82f6`;

function CallToActionButton(
  props: React.PropsWithChildren<{
    href: string;
  }>
) {
  return (
    <Button
      style={{
        backgroundColor: PRIMARY_COLOR,
        padding: '8px 12px',
        borderRadius: 8,
        color: 'white',
      }}
      href={props.href}
    >
      {props.children}
    </Button>
  );
}

export default CallToActionButton;
