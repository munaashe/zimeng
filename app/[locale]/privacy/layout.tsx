import { Metadata } from 'next';

type LayoutProps = {
    children: React.ReactNode;
};

export async function generateMetadata(): Promise<Metadata> {
    const title = 'Privacy Policy - Zim Engineering Community';
    const description = 'Learn how we collect, use, and protect your personal information.';

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg',
                    width: 800,
                    height: 600,
                    alt: 'Zim Engineering Logo',
                },
            ],
            siteName: 'Zim Engineering Community',
            url: 'https://zimeng.org/contact',
            type: 'website',
        },
    };
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Layout;