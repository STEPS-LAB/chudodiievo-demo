import { Mail, MapPin, Phone, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function Contact() {
  return (
    <div className="min-h-screen bg-canvas pt-16">
      <section className="relative h-72 sm:h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=2000&q=80"
          alt="Контакти готелю"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary-950/65" />
        <div className="absolute inset-0 container-max container-padding flex flex-col justify-center text-white">
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">Зв'яжіться з Нами</h1>
          <p className="text-white/80 max-w-xl">
            Маєте запитання або особливе прохання? Ми готові зробити ваше перебування досконалим.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-max container-padding grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-neutral-100 space-y-6">
            <h2 className="text-2xl font-bold font-display text-primary-900">Зв'яжіться з Нами</h2>
            <div className="space-y-5 text-sm text-neutral-600">
              <div className="flex gap-3">
                <Phone className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Телефон</p>
                  <p>+380 44 123 4567</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Email</p>
                  <p>info@luminahotel.ua</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Адреса</p>
                  <p>гора 1, Буковель, Івано-Франківська обл., Україна</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-neutral-900">Заїзд / Виїзд</p>
                  <p>3 14:00 / До 12:00</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white rounded-2xl p-6 sm:p-8 shadow-soft border border-neutral-100">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Ваше ім'я *" placeholder="—" />
              <Input label="Електронна Пошта *" placeholder="—" type="email" />
              <div className="sm:col-span-2">
                <Input label="Тема *" placeholder="—" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Повідомлення *</label>
                <textarea
                  rows={5}
                  placeholder="Маєте запитання або особливе прохання? Ми готові зробити ваше перебування досконалим."
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary-700 focus:ring-2 focus:ring-primary-700/20"
                />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full" size="lg">
                  Надіслати Повідомлення
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
