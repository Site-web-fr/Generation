import { motion } from 'framer-motion'

const stats = [
  { value: '850M€+', label: 'Volume Transactionnel', desc: 'de biens vendus depuis 2008' },
  { value: '1 200+', label: 'Propriétés Vendues', desc: 'en France et à l\'international' },
  { value: '98%', label: 'Clients Satisfaits', desc: 'recommandent nos services' },
  { value: '15', label: 'Pays Couverts', desc: 'réseau mondial d\'experts' },
]

export default function Stats() {
  return (
    <section className="py-16 border-y border-[#C9A96E]/10 bg-[#060A14]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center lg:text-left border-l border-[#C9A96E]/20 pl-6">
              <div className="font-display text-4xl lg:text-5xl text-[#C9A96E] mb-1">{stat.value}</div>
              <div className="text-[#F5F0E8]/70 text-sm font-medium mb-1">{stat.label}</div>
              <div className="text-[#F5F0E8]/30 text-xs">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
