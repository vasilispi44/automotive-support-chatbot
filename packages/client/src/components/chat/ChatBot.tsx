import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import ReactMark from 'react-markdown';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa6';

type FormData = {
   prompt: string;
};

type ChatResponse = {
   message: string;
};

type Message = {
   content: string;
   role: 'user' | 'bot';
};

const ChatBot = () => {
   const formRef = useRef<HTMLFormElement | null>(null);
   const [messages, setMessages] = useState<Message[]>([]);
   const conversationId = useRef(crypto.randomUUID());
   const { register, handleSubmit, reset, formState } = useForm<FormData>();

   useEffect(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
   }, [messages]);

   const onSubmit = async ({ prompt }: FormData) => {
      setMessages((prev) => [...prev, { content: prompt, role: 'user' }]);

      reset();

      const { data } = await axios.post<ChatResponse>('/api/chat', {
         prompt,
         conversationId: conversationId.current,
      });
      setMessages((prev) => [...prev, { content: data.message, role: 'bot' }]);
   };

   const onKeyDown = (e: KeyboardEvent<HTMLFormElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit(onSubmit)();
      }
   };

   return (
      <div>
         <div className="flex flex-col gap-3 items-end pb-3">
            {messages.map((message, index) => (
               <p
                  key={index}
                  className={`px-3 py-1 rounded-xl ${
                     message.role === 'user'
                        ? "bg-linear-to-r from-blue-600 to-blue-700 text-white self-end shadow-md shadow-blue-500/10 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-[85%]"
                        : "bg-white border border-slate-200 text-slate-800 self-start shadow-sm rounded-2xl rounded-tl-sm px-4 py-2.5 dark:bg-zinc-800 dark:border-zinc-700 dark:text-slate-200 max-w-[85%]"
                  }`}
               >
                  <ReactMark>{message.content}</ReactMark>
               </p>
            ))}
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={onKeyDown}
            ref={formRef}
            className="relative bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/60 focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500 transition-all p-3"
         >
            <textarea
               {...register('prompt', {
                  required: true,
                  validate: (data) => data.trim().length > 0,
               })}
               className="w-full bg-transparent border-0 focus:outline-none resize-none text-sm text-slate-800 placeholder:text-slate-400"
               placeholder="Describe the symptoms as simple as possible"
               maxLength={1000}
            />
            <div className='flex justify-end'>
            <Button
               disabled={!formState.isValid}
               type="submit"
               className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-xl transition-colors shadow-sm disabled:opacity-40"
            >
               <FaArrowUp />
            </Button>
            </div>
         </form>
      </div>
   );
};

export default ChatBot;
