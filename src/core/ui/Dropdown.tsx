import * as React from 'react';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import classNames from 'clsx';

import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
    clickable?: boolean;
  }
>(({ className, inset, clickable = true, children, ...props }, ref) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={classNames(
      'flex cursor-default select-none items-center space-x-2.5 rounded-md' +
        ' justify-between py-1.5 px-2 text-sm font-medium outline-none',
      inset && 'pl-8',
      clickable &&
        `cursor-pointer transition-colors focus:bg-primary-50 active:bg-primary-100 dark:focus:bg-dark-600 dark:active:bg-dark-900`,
      className,
    )}
    {...props}
  >
    <span>{children}</span>

    <ChevronRightIcon className="ml-auto h-4 w-4" />
  </DropdownMenuPrimitive.SubTrigger>
));

DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={classNames(
      'animate-in slide-in-from-left-1 z-50 min-w-[8rem] overflow-hidden' +
        ' rounded-md border border-gray-100 bg-white p-1 shadow-md' +
        ' dark:border-dark-700 dark:bg-dark-800',
      className,
    )}
    {...props}
  />
));

DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, alignOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <DropdownMenuPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={classNames(
        'animate-in data-[side=bottom]:slide-in-from-top-2 w-screen md:w-auto' +
          ' data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem]' +
          ' overflow-hidden border border-transparent border-t-gray-50' +
          ' bg-white p-1 shadow-xl dark:border-dark-600 dark:bg-dark-800' +
          ' dark:shadow-[0_0_40px_0] dark:shadow-primary-500/30' +
          ' dark:text-gray-300 md:rounded-md',
        className,
      )}
      {...props}
    />
  </DropdownMenuPrimitive.Portal>
));

DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
    clickable?: boolean;
  }
>(({ className, inset, clickable = true, ...props }, ref) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={classNames(
      'relative flex h-11 w-full select-none items-center rounded-md lg:h-8' +
        ' px-2 text-sm font-medium outline-none focus:outline-none' +
        ' data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      {
        'pl-8': inset,
        [`transition-colors duration-300 focus:bg-primary-50 active:bg-primary-100 dark:focus:bg-dark-700 dark:active:bg-dark-600`]:
          clickable,
      },
      className,
    )}
    {...props}
  />
));

DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={classNames(
      'px-2 py-1.5 text-sm font-semibold text-gray-500 dark:text-gray-400',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
));

DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={classNames(
      '-mx-1 my-1 h-px bg-gray-100 dark:bg-dark-600',
      className,
    )}
    {...props}
  />
));

DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={classNames('ml-auto text-xs tracking-widest', className)}
      {...props}
    />
  );
};

DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
