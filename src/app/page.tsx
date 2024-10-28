'use client';
import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/about');
  return null;
}
