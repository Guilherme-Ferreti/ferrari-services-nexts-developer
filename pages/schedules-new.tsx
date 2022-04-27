import { Fragment, useCallback, useState } from 'react';
import Calendar from '../components/Calendar';
import Header from '../components/Header';
import Page from '../components/Page';
import Footer, { ButtonBack, ButtonContinue } from '../components/Page/Footer';
import { format } from 'date-fns';
import axios from 'axios';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const ComponentPage: NextPage = () => {
  const router = useRouter();
  const [scheduleAt, setScheduleAt] = useState<Date | null>(null);

  const onSubmit = useCallback(
    (event: any) => {
      event.preventDefault();

      if (!scheduleAt) {
        console.error('scheduleAt is null');
        return;
      }

      axios
        .post('/api/schedules/new', {
          scheduleAt: format(scheduleAt, 'yyyy-MM-dd'),
        })
        .then(({ data }) => {
          router.push('/schedules-time-options');
        })
        .catch(({ data }) => {
          console.log(data);
        });
    },
    [scheduleAt],
  );

  return (
    <Fragment>
      <Header />
      <Page id="schedules-new" color="blue" title="Escolha a Data">
        <Calendar selected={new Date()} onChange={setScheduleAt} />

        <form onSubmit={onSubmit}>
          <input
            type="hidden"
            name="schedule_at"
            value={scheduleAt ? format(scheduleAt, 'yyyy-MM-dd') : ''}
          />

          <Footer />
        </form>
      </Page>
    </Fragment>
  );
};

export default ComponentPage;
