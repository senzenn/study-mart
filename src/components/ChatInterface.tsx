'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaComments, FaPaperPlane, FaTimes, FaUser } from 'react-icons/fa'

interface Message {
  id: number
  text: string
  sender: 'user' | 'other'
  timestamp: Date
}

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hi! Is this item still available?',
      sender: 'user',
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    },
    {
      id: 2,
      text: 'Yes, it is! When would you like to meet?',
      sender: 'other',
      timestamp: new Date(Date.now() - 1000 * 60 * 4), // 4 minutes ago
    },
  ])
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date(),
      },
    ])
    setNewMessage('')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <FaTimes className="w-6 h-6 mx-auto" />
        ) : (
          <FaComments className="w-6 h-6 mx-auto" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-purple-600 text-white">
              <h3 className="text-lg font-semibold">Messages</h3>
              <p className="text-sm text-white/80">Online</p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 space-y-4 h-[calc(600px-144px)] overflow-y-auto">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                      <FaUser className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs mt-1 opacity-60">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-800"
            >
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FaPaperPlane className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 