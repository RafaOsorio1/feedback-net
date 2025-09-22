import { Plus } from 'lucide-react';
import { CustomButton } from '../../components/trackerForm';

export default function DashboardPage() {
  return (
    <section>
      <h1>Dashboard - ISP Colombia SA</h1>

      <CustomButton
        size="3"
        radius="large"
        Icon={<Plus />}
        text="Nueva Solicitud"
        style={{
          margin: '20px 0px',
          width: '100%',
        }}
      />
    </section>
  );
}
