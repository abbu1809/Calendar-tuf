import { Calendar } from './components/Calendar';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/next';
function App() {
  return (
    <div className="min-h-screen  bg-[#abcdef]  flex items-center justify-center p-4 sm:p-8 font-sans overflow-hidden py-12 relative" >

      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 400, 0],
            y: [0, 200, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-purple-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-70"
        />
        <motion.div
          animate={{
            x: [0, -300, 0],
            y: [0, 300, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-60"
        />
        <motion.div
          animate={{
            x: [0, -200, 0],
            y: [0, -400, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 left-1/3 w-[700px] h-[700px] bg-emerald-600/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50"
        />
      </div>

      {/* Main App Container */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col items-center gap-8">
        <Calendar />

        {/* Footer */}
        <footer className="w-full flex flex-col sm:flex-row items-center justify-between px-8 py-5 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-2xl border border-white/10 rounded-3xl text-white text-sm font-light shadow-2xl transition-all hover:bg-white/10">

          <p> <img src="/logo.webp" alt="logo" className='h-10 w-10 rounded-full flex inline-block mx-2' /> ©{new Date().getFullYear()} Aesthetic Calendar.</p>

          <div className="flex items-center gap-6 mt-4 sm:mt-0">
            <a href="https://github.com/abbu1809" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com/in/abhishekverma1809" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              <span>LinkedIn</span>
            </a>
          </div>
        </footer>
      </div>
    <Analytics />
    </div>
  );
}

export default App;
