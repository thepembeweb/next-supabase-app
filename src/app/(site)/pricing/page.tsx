import Container from '~/core/ui/Container';
import SubHeading from '~/core/ui/SubHeading';
import Heading from '~/core/ui/Heading';
import PricingTable from '~/components/PricingTable';

export const metadata = {
  title: 'Pricing',
};

function PricingPage() {
  return (
    <Container>
      <div className={'flex flex-col space-y-8 my-8'}>
        <div className={'flex flex-col items-center space-y-4'}>
          <Heading type={1}>Pricing</Heading>
          <SubHeading>Fair pricing for your customers</SubHeading>
        </div>

        <PricingTable />
      </div>
    </Container>
  );
}

export default PricingPage;
