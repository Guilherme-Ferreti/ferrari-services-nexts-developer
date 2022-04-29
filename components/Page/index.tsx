import { ReactNode } from 'react';

type PageColors = 'blue' | 'green' | 'yellow';

type PageProps = {
  children: ReactNode;
  title: string;
  id: string;
  color: PageColors;
  panel?: ReactNode;
};

const Page = ({ children, title, id, color, panel }: PageProps) => {
  return (
    <section id={id} className={['page', color].join(' ')}>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>

      {panel && panel}
    </section>
  );
};

export default Page;
