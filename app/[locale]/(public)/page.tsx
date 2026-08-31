import { HeroCarousel } from "@/components/publico/hero-carousel";
import { CuentaRegresiva } from "@/components/publico/cuenta-regresiva";
import { RedesSociales } from "@/components/publico/redes-sociales";
import { Bienvenida } from "@/components/publico/bienvenida";
import { Partners } from "@/components/publico/partners";

export default function PaginaInicio() {
  return (
    <>
      <HeroCarousel />
      <CuentaRegresiva />
      <RedesSociales />
      <Bienvenida />
      <Partners />
    </>
  );
}
