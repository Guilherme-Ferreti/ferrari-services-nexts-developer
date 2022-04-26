type PageColors = 'blue' | 'green' | 'yellow';

type PageProps = {
    children: React.ReactNode;
    title: string;
    id: string;
    color: PageColors;
};

const Page = ({ children, title, id, color}: PageProps) => {
    return (
        <section id={id} className={['page', color].join(' ') }>
            <header>
                <h1>{title}</h1>
            </header>
            <main>
                {children}
            </main>
        </section> 
    )
}

export default Page;