import Link from 'next/link'
import type { Metadata } from 'next'
import { LEGAL, OFERTA } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Términos de Uso — Nutrisco',
  robots: { index: false },
}

export default function Terminos() {
  return (
    <div className="min-h-screen bg-crema">
      <header className="bg-carbon px-5 py-4 flex items-center gap-4">
        <Link href="/" className="text-[#9CA3AF] hover:text-white font-body text-sm transition-colors">
          ← Volver
        </Link>
        <span className="text-white/20">|</span>
        <span className="font-display text-white font-bold">Nutrisco</span>
      </header>
      <main className="max-w-3xl mx-auto px-5 py-16">
        <h1 className="font-display font-bold text-display-sm text-carbon mb-3">
          Términos de Uso
        </h1>
        <p className="font-body text-gray-mid text-sm mb-10">Última actualización: abril 2026</p>

        <div className="space-y-8 font-body text-[14px] text-carbon/80 leading-relaxed">
          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">1. El Servicio</h2>
            <p>
              Nutrisco es una plataforma digital de acompañamiento nutricional antiinflamatorio creada por{' '}
              {LEGAL.nombre}, {LEGAL.profesion}. El servicio incluye: plan alimentario semanal personalizado,
              ajuste quincenal, soporte disponible sobre tu pauta, recetario, lista de compras y dashboard de progreso.
            </p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">2. Suscripción y Pagos</h2>
            <p>
              La suscripción mensual se cobra de forma recurrente. El precio fundador de {OFERTA.precioFundador}/mes
              está disponible para los primeros {OFERTA.cuposTotal} suscriptores y queda bloqueado de por vida mientras
              la suscripción esté activa. El pago se procesa a través de Mercado Pago.
            </p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">3. Cancelación</h2>
            <p>
              Puedes cancelar tu suscripción desde tu perfil en cualquier momento, sin multas ni contratos de
              permanencia. La cancelación es efectiva al final del período de facturación vigente. Tus datos se
              conservan por 30 días para facilitar la reactivación.
            </p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">4. Naturaleza del Servicio</h2>
            <p>
              Nutrisco es un servicio de acompañamiento nutricional digital. No reemplaza la consulta médica presencial
              ni constituye un tratamiento médico. Si tienes condiciones médicas graves, consulta con tu médico tratante.
              El servicio está dirigido a personas mayores de 18 años.
            </p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">5. Boleta Electrónica e Isapre</h2>
            <p>
              Cada mes recibirás una boleta electrónica exenta de IVA emitida a nombre de {LEGAL.nombre}. Esta boleta
              puede presentarse a tu isapre para solicitar reembolso por prestaciones de nutrición. El monto cubierto
              depende de tu plan de salud particular.
            </p>
          </section>

          <section>
            <h2 className="font-body font-semibold text-base text-carbon mb-2">6. Contacto</h2>
            <p>
              Para consultas sobre términos o privacidad: privacidad@constanzanutricion.cl
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
