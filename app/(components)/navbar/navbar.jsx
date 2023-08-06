'use client'
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton, LoginButton } from '../../auth'
import { User } from '../../user'
import{ useSession} from 'next-auth/react'
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Register', href: '/register' },
  { name: 'Products', href: '/allPosts' },
  { name: 'Cart', href: '/cartItems' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const isAuthorizedUser =
  session &&
  session.user.email === 'mazhar@gmail.coms' ;
  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gray-900  sm:left-0 sm:w-full">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="h-16 w-16"
              src="/image2.png"
              alt=""
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
       
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold leading-6 text-white">
              {item.name}
            </a>
          ))}
           {isAuthorizedUser && (
              <a href="/createPost" className="text-sm font-semibold leading-6 text-white">
                Create Product
              </a>
            )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        {session ? (
        <LogoutButton />
        ) : (
          <LoginButton />
          )}
        {/* <User /> */}
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:text-white">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>

                  ))}
                  {isAuthorizedUser && (
              <a href="/createPost" className="text-sm font-semibold leading-6 text-gray-900">
                Create Product
              </a>
            )}
                </div>
                <div className="py-6">
                {session ? (
        <LogoutButton />
        ) : (
          <LoginButton />
          )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
    </header>
  );
}
