import ChatBot from './components/chat/ChatBot';

function App() {
   return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.14),transparent_34rem),linear-gradient(to_bottom,#f8fafc,#ffffff)] px-6 py-10 dark:bg-black text-slate-900 dark:text-slate-100">
         <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-start pt-8 gap-6">
            <div className="space-y-2 py-4 text-center">
               <p className="text-3xl font-medium text-slate-900 dark:text-white">
                  Automotive technical support agent
               </p>

               <h1 className="text-xl font-light tracking-normal">
                  Vehicle support Assistant
               </h1>

               <p className="mx-auto max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                  Describe a warning light or a maintenance question and get
                  practical next steps
               </p>
            </div>
            <div className="flex min-h-0 flex-1 flex-col">
               <ChatBot />
            </div>
         </section>
      </main>
   );
}

export default App;
