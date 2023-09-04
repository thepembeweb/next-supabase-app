'use client';

import type { FormEvent } from 'react';
import { useCallback } from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import Heading from '~/core/ui/Heading';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import SubHeading from '~/core/ui/SubHeading';
import useUserSession from '~/core/hooks/use-user-session';

export interface OrganizationInfoStepData {
  organization: string;
}

const OrganizationInfoStep: React.FCC<{
  onSubmit: (data: OrganizationInfoStepData) => void;
}> = ({ onSubmit }) => {
  const user = useUserSession();
  const displayName = user?.data?.displayName ?? user?.auth?.user.email ?? '';

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const data = new FormData(event.currentTarget);
      const organization = data.get(`organization`) as string;

      onSubmit({
        organization,
      });
    },
    [onSubmit]
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className={'flex w-full flex-1 flex-col space-y-6'}
    >
      <div className={'flex flex-col space-y-1.5'}>
        <Heading type={2}>Hi, {displayName}</Heading>
        <SubHeading>Let&apos;s create your organization.</SubHeading>
      </div>

      <div className={'flex flex-1 flex-col space-y-2'}>
        <TextField>
          <TextField.Label>
            Your organization&apos;s name
            <TextField.Input
              required
              name={'organization'}
              placeholder={'Organization Name'}
            />
          </TextField.Label>
        </TextField>

        <div>
          <Button type={'submit'}>
            <span className={'flex items-center space-x-2'}>
              <span>Continue</span>
              <ArrowRightIcon className={'h-5'} />
            </span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default OrganizationInfoStep;
