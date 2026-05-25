import { useEffect } from 'react'


function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = import.meta.env.VITE_WIDGET_URL
    script.setAttribute('data-tenant', import.meta.env.VITE_TENANT_ID)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])
   

  return (
    <div className="min-h-screen bg-neutral-950 text-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_40%)]" />

        <div className="relative z-10 max-w-5xl">
          <p className="tracking-[0.4em] uppercase text-pink-300 text-sm mb-6">
            Aura Boutique
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            Moda que
            <span className="block bg-gradient-to-r from-pink-400 via-fuchsia-300 to-violet-400 bg-clip-text text-transparent">
              expresa tu energía
            </span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Descubre colecciones exclusivas con estilo moderno, elegante y auténtico.
            Diseñadas para destacar tu esencia en cada momento.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-violet-500 font-semibold shadow-2xl hover:scale-105 transition-transform duration-300">
              Explorar colección
            </button>

            <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              Ver novedades
            </button>
          </div>
        </div>

        <div className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-5 w-full max-w-6xl">
          {[
            {
              title: 'Diseño Premium',
              text: 'Prendas seleccionadas con acabados de alta calidad.'
            },
            {
              title: 'Tendencia Global',
              text: 'Inspiración en moda contemporánea internacional.'
            },
            {
              title: 'Estilo Atemporal',
              text: 'Looks versátiles para cualquier ocasión.'
            },
            {
              title: 'Aura Exclusiva',
              text: 'Colecciones únicas para destacar tu personalidad.'
            }
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 text-left hover:-translate-y-2 transition-transform duration-300"
            >
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Collections */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="uppercase tracking-[0.3em] text-pink-300 text-sm mb-4">
              Colecciones destacadas
            </p>
            <h2 className="text-4xl md:text-5xl font-black">
              Elegancia moderna
            </h2>
          </div>

          <p className="max-w-xl text-neutral-400 leading-relaxed">
            Una selección curada de prendas y accesorios con identidad visual sofisticada,
            ideal para clientes que buscan exclusividad y frescura.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: 'Luxe Edition',
              category: 'Fashion Essentials',
              image:
                'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop'
            },
            {
              name: 'Urban Glow',
              category: 'Street Chic',
              image:
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop'
            },
            {
              name: 'Soft Aura',
              category: 'Minimal Collection',
              image:
                'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop'
            }
          ].map((item, index) => (
            <div
              key={item.name}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 min-h-[420px] p-8 flex flex-col justify-end bg-cover bg-center" 
              style={{ backgroundImage: `url(${item.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-pink-500/20 blur-3xl group-hover:scale-125 transition-transform duration-500" />

              <div className="relative z-10">
                <p className="text-pink-300 text-sm mb-2">0{index + 1}</p>
                <h3 className="text-3xl font-bold mb-3">{item.name}</h3>
                <p className="text-neutral-300">{item.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="px-6 py-24 bg-white/[0.03] border-y border-white/10">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="uppercase tracking-[0.3em] text-pink-300 text-sm mb-5">
              Nuestra esencia
            </p>

            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-8">
              Una boutique creada para mujeres con identidad propia.
            </h2>

            <p className="text-neutral-300 leading-relaxed text-lg mb-6">
              Aura Boutique combina estética contemporánea, detalles elegantes y una experiencia visual premium para conectar con personas que desean proyectar autenticidad.
            </p>

            <p className="text-neutral-400 leading-relaxed">
              Cada colección busca transmitir confianza, estilo y sofisticación a través de prendas cuidadosamente seleccionadas.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-5">
            {['Minimal', 'Elegant', 'Bold', 'Luxury'].map((tag) => (
              <div
                key={tag}
                className="rounded-3xl border border-white/10 bg-neutral-900 p-10 flex items-center justify-center min-h-[180px] text-2xl font-bold bg-gradient-to-br from-pink-500/10 to-violet-500/10"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-28">
        <div className="max-w-5xl mx-auto rounded-[3rem] border border-white/10 bg-gradient-to-r from-pink-500/20 via-fuchsia-500/10 to-violet-500/20 p-12 md:p-20 text-center backdrop-blur-xl">
          <p className="uppercase tracking-[0.3em] text-pink-200 text-sm mb-5">
            Nueva temporada
          </p>

          <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8">
            Haz que tu estilo tenga presencia.
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-300 text-lg leading-relaxed mb-10">
            Explora las nuevas tendencias de Aura Boutique y transforma cada outfit en una declaración visual.
          </p>

          <button className="px-10 py-5 rounded-2xl bg-white text-black font-bold hover:scale-105 transition-transform duration-300 shadow-2xl">
            Comprar ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-10 border-t border-white/10 text-center text-neutral-500 text-sm">
        © 2026 Aura Boutique · Moda contemporánea con identidad.
      </footer>
    </div>
  )
}



export default App