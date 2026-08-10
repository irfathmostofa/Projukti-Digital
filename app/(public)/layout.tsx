import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { FloatingContact } from "@/components/public/FloatingContact";
import { getNavigation, getProducts, getServices, getSiteSettings } from "@/lib/data";

export default async function PublicLayout({ children }: LayoutProps<"/">) {
  const [settings, navigation, products, services] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    getProducts(),
    getServices(),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        settings={settings}
        navigation={navigation}
        products={products}
        services={services}
      />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} products={products} services={services} />
      <FloatingContact settings={settings} />
    </div>
  );
}
