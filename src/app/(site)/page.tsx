import Image from 'next/image';

import {
  BuildingLibraryIcon,
  CubeIcon,
  DocumentIcon,
  FireIcon,
  PaintBrushIcon,
  UserGroupIcon,
  UserIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';

import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import Heading from '~/core/ui/Heading';

export default function Home() {
  return (
    <div>
      <Container>
        <div
          className={
            'my-12 flex flex-col items-center md:flex-row lg:my-16' +
            ' mx-auto flex-1 justify-center'
          }
        >
          <div className={'flex w-full flex-1 flex-col items-center space-y-8'}>
            <Pill>
              <span>The leading SaaS Starter Kit for ambitious developers</span>
            </Pill>

            <HeroTitle>
              <span>The SaaS Solution for</span>
              <span
                className={
                  'bg-gradient-to-br bg-clip-text text-transparent' +
                  ' from-primary-400 to-primary-600 leading-[1.2]'
                }
              >
                developers and founders
              </span>
            </HeroTitle>

            <SubHeading className={'text-center'}>
              <span>Here you can write a short description of your SaaS</span>
              <span>This subheading is usually laid out on multiple lines</span>
              <span>Impress your customers, straight to the point.</span>
            </SubHeading>

            <div className={'flex flex-col items-center space-y-4'}>
              <Button
                className={
                  'bg-transparent bg-gradient-to-r hover:shadow-2xl' +
                  ' hover:shadow-primary-500/40 from-primary-500' +
                  ' to-primary-500 hover:to-primary-600 text-white'
                }
                color={'custom'}
                size={'large'}
                round
                href={'/auth/sign-up'}
              >
                <span className={'flex items-center space-x-2'}>
                  <span>Get Started</span>
                  <ChevronRightIcon className={'h-4'} />
                </span>
              </Button>

              <span className={'text-xs text-gray-500 dark:text-gray-400'}>
                Free plan. No credit card required.
              </span>
            </div>
          </div>
        </div>

        <div className={'flex justify-center py-12 max-w-5xl mx-auto'}>
          <Image
            priority
            className={
              'hero-image-shadow rounded-2xl' +
              ' shadow-primary-500/40 dark:shadow-primary-500/30'
            }
            width={2688}
            height={1824}
            src={`/assets/images/dashboard-dark.webp`}
            alt={`App Image`}
          />
        </div>
      </Container>

      <Divider />

      <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-12'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-4 text-center'
            }
          >
            <div className={'flex flex-col items-center space-y-2'}>
              <div>
                <FireIcon className={'h-6 text-primary-500'} />
              </div>

              <b className={'text-primary-500'}>Features</b>
            </div>

            <Heading type={2}>The best tool in the space</Heading>

            <SubHeading>
              Unbeatable Features and Benefits for Your SaaS Business
            </SubHeading>
          </div>

          <div>
            <div className={'grid gap-12 lg:grid-cols-3'}>
              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <UserIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Authentication</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Secure and Easy-to-Use Authentication for Your SaaS Website
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <BuildingLibraryIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Multi-Tenancy</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Powerful Multi-Tenancy Features for Maximum Flexibility and
                  Efficiency
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <UserGroupIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Team-Management</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Effortlessly Manage and Organize Your Team Members
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <PaintBrushIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>UI Themes</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Customizable UI Themes to Match Your Brand and Style
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <CubeIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>UI Components</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Pre-built UI Components to Speed Up Your Development
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <DocumentIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>Blog and Documentation</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  Pre-built Blog and Documentation Pages to Help Your Users
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Divider />

      <Container>
        <div className={'py-12'}>
          <div
            className={
              'flex flex-col justify-between rounded-lg lg:flex-row' +
              ' space-y-4 bg-primary-50 px-8 py-10 dark:bg-primary-500/5' +
              ' lg:space-y-0'
            }
          >
            <div className={'flex flex-col justify-between space-y-2'}>
              <Heading type={3}>
                <p className={'text-gray-800 dark:text-white'}>
                  The application you were waiting for.
                </p>
              </Heading>

              <Heading type={4}>
                <p className={'text-primary-500'}>Sign up for free, today.</p>
              </Heading>
            </div>

            <div className={'flex flex-col justify-end space-y-2'}>
              <div>
                <Button
                  className={'w-full lg:w-auto'}
                  size={'large'}
                  href={'/auth/sign-up'}
                >
                  Get Started
                </Button>
              </div>

              <div className="flex flex-col space-y-2 text-center">
                <span className={'text-xs'}>No credit-card required</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-gray-600 dark:text-white md:text-5xl' +
        ' flex flex-col font-heading font-medium xl:text-7xl 2xl:text-[5.2rem]'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={'rounded-xl bg-primary-500/10 p-4 dark:bg-primary-500/10'}
      >
        {props.children}
      </div>
    </div>
  );
}

function Pill(props: React.PropsWithChildren) {
  return (
    <h2
      className={
        'inline-flex w-auto items-center space-x-2' +
        ' rounded-full bg-gradient-to-br dark:from-gray-200 dark:via-gray-400' +
        ' dark:to-gray-700 bg-clip-text px-4 py-2 text-center text-sm' +
        ' font-normal text-gray-500 dark:text-transparent shadow' +
        ' dark:shadow-dark-700'
      }
    >
      <span>{props.children}</span>
    </h2>
  );
}
