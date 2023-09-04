import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import classNames from 'clsx';
import { ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={classNames(
      `flex h-10 w-full items-center justify-between space-x-2.5
        rounded-md border bg-transparent py-1.5 px-2.5 ring-offset-1 transition-all
        duration-300 placeholder:text-gray-400 hover:bg-gray-50
        focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:cursor-not-allowed
        disabled:opacity-50 dark:border-dark-600 dark:bg-dark-800
        dark:ring-primary-500/70 dark:hover:border-dark-500 dark:focus:ring-offset-dark-800`,
      className,
    )}
    {...props}
  >
    {props.asChild ? (
      children
    ) : (
      <>
        <div>{children}</div> <ChevronDownIcon className="h-4" />
      </>
    )}
  </SelectPrimitive.Trigger>
));

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={classNames(
        `animate-in fade-in-250 relative z-50 w-auto min-w-[8rem] overflow-hidden border border-transparent
          border-t-gray-50 bg-white shadow-xl dark:border-dark-600 dark:bg-dark-800 dark:shadow-[0_0_40px_0] dark:shadow-primary-500/30 lg:rounded-md`,
        className,
      )}
      sideOffset={sideOffset}
      {...props}
    >
      <SelectPrimitive.Viewport className={'flex flex-col space-y-0.5 p-1'}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));

SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={classNames(
      'py-1.5 pr-2 pl-2 text-xs font-medium text-gray-400 dark:text-gray-400',
      className,
    )}
    {...props}
  />
));

SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItemClassName = `
  relative flex select-none items-center rounded-md hover:bg-primary-50 dark:hover:bg-dark-600
  h-11 lg:h-8 pr-4 pl-8 text-sm font-medium outline-none focus:bg-primary-50 my-0.5
  data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [data-state="checked"]:bg-primary-50
  [data-state="checked"]:dark:bg-dark-600 dark:focus:bg-dark-700 cursor-pointer data-[selected]:cursor-default
  transition-colors`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={classNames(SelectItemClassName, className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckCircleIcon className="h-5 text-primary-500" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectAction = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>
>(function SelectActionComponent({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={classNames(SelectItemClassName, '!pr-4 !pl-4', className)}
      {...props}
    >
      {children}
    </div>
  );
});

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={classNames(
      '-mx-1 my-1 h-px bg-gray-100 dark:bg-dark-600',
      className,
    )}
    {...props}
  />
));

SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectAction,
};
