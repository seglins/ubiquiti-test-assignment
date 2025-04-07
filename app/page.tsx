import ProductList from "@/lib/components/product/list";
import { getDevices } from "@/lib/services/device";

export default async function Home() {
  const devices = await getDevices();

  return <ProductList devices={devices} />;
}
