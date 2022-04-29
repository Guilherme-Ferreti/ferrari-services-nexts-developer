import { NextPage } from 'next';
import { ChangeEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer from '../components/Page/Footer';
import Panel from '../components/Page/Schedule/Panel';
import ScheduleServiceProvider, {
  useScheduleService,
} from '../components/Page/Schedule/ScheduleServiceContext';
import { formatCurrency } from '../utils/formatCurrency';

type FormData = {
  services: Number[];
};

const ScheduleServicePage = () => {
  const { services, addSelectedService, removeSelectedService } =
    useScheduleService();

  const { handleSubmit } = useForm<FormData>();

  const onChangeService = (checked: boolean, serviceId: number) => {
    if (checked) {
      addSelectedService(serviceId);
    } else {
      removeSelectedService(serviceId);
    }
  };

  const save: SubmitHandler<FormData> = ({ services }) => {
    console.log(services);
  };

  return (
    <Page
      id="schedules-services"
      color="blue"
      title="Escolha os serviços"
      panel={<Panel />}
    >
      <form onSubmit={handleSubmit(save)}>
        <input type="hidden" name="schedule_at" />
        <input type="hidden" name="option" />

        <div className="options">
          {services.map(({ id, name, description, price }) => (
            <label key={String(id)}>
              <input
                type="checkbox"
                name="service"
                value={id}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChangeService(event.target.checked, +id)
                }
              />
              <div className="square">
                <div></div>
              </div>
              <div className="content">
                <span className="name">{name}</span>
                <span className="description">{description}</span>
                <span className="price">{formatCurrency(+price)}</span>
              </div>
            </label>
          ))}
        </div>

        <Footer />
      </form>
    </Page>
  );
};

const ComponentPage: NextPage = () => {
  return (
    <ScheduleServiceProvider>
      <Header />
      <ScheduleServicePage />
    </ScheduleServiceProvider>
  );
};

export default ComponentPage;
