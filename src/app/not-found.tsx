import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-display font-medium text-primary-200 mb-4">404</h1>
        <h2 className="text-3xl font-display font-medium text-neutral-900 mb-4">
          Сторінку не знайдено
        </h2>
        <p className="text-neutral-600 mb-8 max-w-md mx-auto">
          На жаль, сторінка, яку ви шукаєте, не існує.
        </p>
        <Link href="/" className="luxury-button">
          Повернутися на головну
        </Link>
      </div>
    </div>
  );
}
