import axios from 'axios';
import { get } from 'lodash';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, Fragment, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer from '../components/Page/Footer';
import Panel from '../components/Page/Schedule/Panel';
import ScheduleServiceProvider, {
  useScheduleService,
} from '../components/Page/Schedule/ScheduleServiceContext';
import Toast from '../components/Toast';
import { formatCurrency } from '../utils/formatCurrency';

type FormData = {
  services: Number[];
  server?: unknown;
};

const ScheduleServicePage = () => {
  const { services, selecteds, addSelectedService, removeSelectedService } =
    useScheduleService();

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>();

  const router = useRouter();

  const onChangeService = (checked: boolean, serviceId: number) => {
    if (checked) {
      addSelectedService(serviceId);
    } else {
      removeSelectedService(serviceId);
    }
  };

  const save: SubmitHandler<FormData> = ({ services }) => {
    if (services.length === 0) {
      setError('services', {
        type: 'required',
        message: 'Escolha um serviço.',
      });

      return false;
    }

    axios
      .post('/api/schedules/services', {
        services,
      })
      .then(() => router.push('/schedules-payment'))
      .catch((error) => {
        setError('server', {
          message: error.response?.data.message ?? error.message,
        });
      });
  };

  useEffect(() => {
    setValue(
      'services',
      selecteds.map((service) => service.id),
    );

    if (selecteds.length > 0) {
      clearErrors();
    }
  }, [selecteds, setValue, clearErrors]);

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

        <Toast
          type="danger"
          open={Object.keys(errors).length > 0}
          onClose={clearErrors}
        >
          {Object.keys(errors).map((key) => (
            <Fragment key={key}>
              {get(errors, `${key}.message`, 'Confira os serviços.')} &nbsp;
            </Fragment>
          ))}
        </Toast>

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