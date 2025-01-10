import FeedConstructor from '@/components/feed-constructor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-blue-900 dark:to-gray-900">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-300">Bluesky Feed Constructor</h1>
        <FeedConstructor />
      </div>
    </main>
  )
}

