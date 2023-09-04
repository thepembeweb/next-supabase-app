import MinusIcon from '@heroicons/react/24/outline/MinusIcon';

import type MembershipRole from '~/lib/organizations/types/membership-role';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';

import MembershipRoleSelector from './MembershipRoleSelector';

interface Member {
  email: string;
  role: MembershipRole;
}

const MemberRow: React.FCC<{
  member: Member;
  memberRemoved: (member: Member) => void;
}> = ({ member, memberRemoved }) => {
  return (
    <div
      key={member.email}
      className={'space-between flex items-center space-x-1'}
    >
      <div className={'w-7/12'}>
        <TextField.Input placeholder="member@email.com" type="email" />
      </div>

      <div className={'w-4/12'}>
        <MembershipRoleSelector value={member.role} />
      </div>

      <div className={'w-1/12'}>
        <Button
          size={'small'}
          color={'transparent'}
          onClick={() => memberRemoved(member)}
        >
          <MinusIcon className={'h-5'} />
        </Button>
      </div>
    </div>
  );
};

export default MemberRow;
