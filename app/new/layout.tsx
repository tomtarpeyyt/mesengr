import { Navbar } from '@/components/navbar';

interface NewLayoutProps {
    children: React.ReactNode;
}

export default function NewLayout({ children }: NewLayoutProps) {
    return (
        <div className="w-full h-full">
            <Navbar />
            <main className="flex w-full h-full">
                {/* <Sidebar /> */}
                <div className="h-full w-full pl[300px] bg-green-200">
                    { children }
                </div>
            </main>
        </div>
    )
}