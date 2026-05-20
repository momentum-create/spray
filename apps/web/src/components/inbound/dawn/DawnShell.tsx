import { CartProvider } from "@/components/inbound/dawn/CartProvider";
import { DawnFooter } from "@/components/inbound/dawn/DawnFooter";
import { DawnHeader } from "@/components/inbound/dawn/DawnHeader";

type Props = {
  children: React.ReactNode;
};

export function DawnShell({ children }: Props) {
  return (
    <CartProvider>
      <div className="dawn-theme min-h-screen bg-white text-black">
        <DawnHeader />
        <main>{children}</main>
        <DawnFooter />
      </div>
    </CartProvider>
  );
}
