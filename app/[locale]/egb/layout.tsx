import { Metadata } from 'next';

type LayoutProps = {
    children: React.ReactNode;
};
const title = 'Engineers Giving Back';
const description = 'Discover how engineers are making a difference in their communities by sharing their skills, knowledge, and resources. Explore initiatives that empower the next generation of innovators and promote sustainable development.';
const url = 'https://images.ctfassets.net/x9qfewrt309k/5i8P1UI9TGSpG8HEft8CT0/d062daa6b652a9d6534b2b83aab7b9e2/egb.jpeg'

export const metadata = {
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
        images: [
            {
                url: url,
                width: 800,
                height: 600,
                alt: 'Zim Engineering Logo',
            },
        ],
        url: 'https://zimeng.org/egb',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: title,
        description: description,
        image: url
    },

};


const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;