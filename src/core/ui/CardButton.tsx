import { forwardRef } from 'react';
import Button from '~/core/ui/Button';
import classNames from 'clsx';

const CardButton = forwardRef<
  typeof Button,
  React.ComponentProps<typeof Button>
>(function CardButtonComponent(props, _) {
  return (
    <Button
      {...props}
      size={'large'}
      color={'custom'}
      className={classNames(
        props.className,
        `h-28 cursor-pointer rounded-sm shadow ring-primary-500 transition-all hover:shadow-lg active:bg-gray-50 dark:shadow-primary-500/30 dark:ring-primary-500/70 dark:active:bg-dark-700`
      )}
    >
      {props.children}
    </Button>
  );
});

export default CardButton;
