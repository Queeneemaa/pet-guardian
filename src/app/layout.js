// src/app/layout.js
import './globals.css';

export const metadata = {
  title: 'PetGuardian',
  description: 'Your Pets\' Lifelong Protector',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}
