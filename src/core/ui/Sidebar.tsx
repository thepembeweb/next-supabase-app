'use client';

import React, { useContext } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import Trans from '~/core/ui/Trans';
import classNames from 'clsx';
import { cva } from 'cva';

import {
  ArrowRightCircleIcon,
  ArrowLeftCircleIcon,
} from '@heroicons/react/24/outline';

import If from '~/core/ui/If';
import Logo from '~/core/ui/Logo';
import LogoMini from '~/core/ui/Logo/LogoMini';
import IconButton from '~/core/ui/IconButton';
import { TooltipContent, Tooltip, TooltipTrigger } from '~/core/ui/Tooltip';

import configuration from '~/configuration';
import SidebarContext from '~/lib/contexts/sidebar';

import isRouteActive from '~/core/generic/is-route-active';

export function Sidebar({ children }: React.PropsWithChildren) {
  const { collapsed, setCollapsed } = useContext(SidebarContext);

  const className = getClassNameBuilder()({
    collapsed,
  });

  return (
    <div className={className}>
      <div className={'flex w-full flex-col space-y-7 px-4'}>
        <AppSidebarHeader collapsed={collapsed} />

        <div className={'flex flex-col space-y-1'}>{children}</div>
      </div>

      <AppSidebarFooterMenu collapsed={collapsed} setCollapsed={setCollapsed} />
    </div>
  );
}

export function SidebarItem({
  end,
  path,
  children,
  Icon,
}: React.PropsWithChildren<{
  path: string;
  Icon: React.ElementType;
  end?: boolean;
}>) {
  const { collapsed } = useContext(SidebarContext);

  const iconClassName = getSidebarIconClassBuilder()({
    collapsed,
  });

  const currentPath = usePathname() ?? '';
  const active = isRouteActive(path, currentPath, end ? 1 : 3);

  const className = getSidebarItemClassBuilder()({
    collapsed,
    active,
  });

  return (
    <Link key={path} href={path} className={className}>
      <If condition={collapsed} fallback={<Icon className={iconClassName} />}>
        <Tooltip>
          <TooltipTrigger>
            <Icon className={iconClassName} />
          </TooltipTrigger>

          <TooltipContent side={'right'} sideOffset={20}>
            {children}
          </TooltipContent>
        </Tooltip>
      </If>

      <span>{children}</span>
    </Link>
  );
}

function AppSidebarHeader({
  collapsed,
}: React.PropsWithChildren<{ collapsed: boolean }>) {
  const logoHref = configuration.paths.appHome;

  return (
    <div className={'flex px-2.5 py-1'}>
      {collapsed ? <LogoMini href={logoHref} /> : <Logo href={logoHref} />}
    </div>
  );
}

function AppSidebarFooterMenu(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
  }>,
) {
  return (
    <div
      className={classNames(`absolute bottom-8 w-full`, {
        'px-6': !props.collapsed,
        'flex justify-center px-2': props.collapsed,
      })}
    >
      <div
        className={
          'flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white'
        }
      >
        <CollapsibleButton
          collapsed={props.collapsed}
          onClick={props.setCollapsed}
        />
      </div>
    </div>
  );
}

function CollapsibleButton(
  props: React.PropsWithChildren<{
    collapsed: boolean;
    onClick: (collapsed: boolean) => void;
  }>,
) {
  if (props.collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>
          <IconButton
            as={'div'}
            onClick={() => props.onClick(!props.collapsed)}
          >
            <ArrowRightCircleIcon className={'h-6'} />
          </IconButton>
        </TooltipTrigger>

        <TooltipContent>
          <Trans i18nKey={'common:expandSidebar'} />
        </TooltipContent>
      </Tooltip>
    );
  }

  const className = classNames({
    '[&>span]:hidden justify-center': props.collapsed,
  });

  return (
    <div className={className}>
      <button
        className={'flex items-center space-x-2 bg-transparent'}
        onClick={() => props.onClick(!props.collapsed)}
      >
        <ArrowLeftCircleIcon className={'h-6'} />

        <span>
          <Trans i18nKey={'common:collapseSidebar'} />
        </span>
      </button>
    </div>
  );
}

export default Sidebar;

function getClassNameBuilder() {
  return cva(
    [
      'relative flex hidden h-screen flex-row justify-center border-r border-gray-100 py-4 dark:border-dark-700 dark:bg-dark-900 lg:flex',
    ],
    {
      variants: {
        collapsed: {
          true: `w-[5rem]`,
          false: `w-2/12 max-w-xs sm:min-w-[12rem] lg:min-w-[17rem]`,
        },
      },
    },
  );
}

function getSidebarItemClassBuilder() {
  return cva(
    [
      `flex w-full items-center rounded-md border-transparent text-sm font-medium text-gray-600 transition-colors duration-300`,
    ],
    {
      variants: {
        collapsed: {
          true: `justify-center space-x-0 px-0.5 py-2 [&>span]:hidden`,
          false: `py-2 px-3 pr-12 space-x-2.5`,
        },
        active: {
          true: `bg-primary-50 font-medium text-current dark:bg-primary-300/10 dark:text-primary-contrast`,
          false: `text-gray-600 ring-transparent hover:bg-gray-50 active:bg-gray-200 dark:bg-dark-900 dark:text-gray-300 dark:hover:bg-dark-800 dark:hover:text-white dark:active:bg-dark-700 dark:active:bg-dark-700`,
        },
      },
      compoundVariants: [
        {
          collapsed: true,
          active: true,
          className: `bg-primary-500/5 dark:bg-primary-500/10 !text-primary-500`,
        },
        {
          collapsed: false,
          active: true,
          className: `bg-primary-50 font-medium text-current dark:bg-primary-300/10 dark:text-primary-contrast [&>svg]:text-primary-500`,
        },
        {
          collapsed: true,
          active: false,
          className: `text-gray-600 dark:text-primary-contrast`,
        },
      ],
    },
  );
}

function getSidebarIconClassBuilder() {
  return cva([''], {
    variants: {
      collapsed: {
        true: `h-7`,
        false: `h-6`,
      },
    },
  });
}
