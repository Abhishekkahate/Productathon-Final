
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'HPCL Lead Intelligence Agent',
    description: 'AI-powered B2B Lead Discovery',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="manifest" href="/manifest.json" />
                <meta name="theme-color" content="#0047BB" />
            </head>
            <body className={outfit.className}>{children}</body>
        </html>
    );
}
