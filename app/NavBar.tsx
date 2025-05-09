'use client'

import Link from 'next/link'
import React from 'react'
import classnames from 'classnames'
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  
  const links= [
    { label: 'Dashboard', href: '/'},
    { label: 'Issues', href: '/issues' },
    { label: 'Tax', href: '/tax' },
    { label: 'Settings', href: '/settings' }
  ]

  return (
    <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href="/"><AiFillBug /></Link>
        <ul className='flex space-x-6'>
            {links.map(link => 
                <Link 
                    key={link.label} 
                    className={classnames({
                        'text-zinc-200': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-700 transition-colors': true
                    })}
                    href={link.href}>{link.label}
                </Link>
            )}
        </ul>
    </nav>
  )
}

export default NavBar