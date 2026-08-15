'use client'

import Image from 'next/image'

import { Inter } from 'next/font/google'

import { useState } from 'react'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

type TeamMember = {
  name: string
  role: string
  blurb: string
  initials?: string
  imageSrc?: string
  avatarStyle: 'photo-placeholder' | 'initials' | 'photo'
  expandable?: boolean
}

const teamMembers: TeamMember[] = [
  {
    name: 'Hyuna Bae',
    role: 'Project Manager',
    blurb:
      'Keeps the team aligned on scope and delivery dates, runs our weekly sprint check-ins, and owns the risk register. Previously coordinated a semester-long industry project and is focused on making sure every requirement in this sprint is traceable from the brief through to the built page.',
    initials: 'HB',
    avatarStyle: 'initials',
    expandable: true,
  },
  {
    name: 'Aleeya Ahmad',
    role: 'UX Designer',
    blurb: 'Designs the interface and prototypes each screen before it reaches development.',
    initials: 'AA',
    avatarStyle: 'initials',
  },
  {
    name: 'Janataarah Begum',
    role: 'Business Analyst',
    blurb:
      'Turns the project brief into testable requirements and validates the build against them.',
    initials: 'JB',
    avatarStyle: 'initials',
  },
  {
    name: 'Firas Vahora',
    role: 'Developer 1',
    blurb: 'Builds the front-end pages and connects them to the existing authentication layer.',
    initials: 'FV',
    avatarStyle: 'initials',
  },
  {
    name: 'Aiden Brundell',
    role: 'Developer 2',
    blurb: 'Works on application logic and data handling, and reviews pull requests before merge.',
    imageSrc: '/images/aiden.jpg',
    avatarStyle: 'photo',
  },
]

function MemberCard({ member }: { member: TeamMember }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="flex min-w-0 flex-col rounded-[12px] border border-[#E2E8F0] bg-white p-6 shadow-[0_1px_3px_rgba(16,24,40,0.08)] max-[767px]:p-4">
      {/* Avatar */}
      {member.avatarStyle === 'photo' && member.imageSrc ? (
        <Image
          src={member.imageSrc}
          alt={`${member.name} profile photo`}
          width={80}
          height={80}
          className="h-20 w-20 shrink-0 rounded-full object-cover"
        />
      ) : member.avatarStyle === 'initials' ? (
        <div
          aria-hidden="true"
          className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#D6DEFA] text-[16px] font-medium text-[#3D4EAE]"
        >
          {member.initials}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="h-20 w-20 shrink-0 rounded-full bg-[#CBD5E1]"
        />
      )}

      {/* Name */}
      <h2 className="mt-4 text-[20px] leading-7 font-semibold break-words text-[#1A202C]">
        {member.name}
      </h2>

      {/* Role */}
      <div className="mt-2 w-full rounded-full bg-[#D6DEFA] px-3 py-1 text-[12px] leading-4 font-medium break-words text-[#3D4EAE]">
        {member.role}
      </div>

      {/* Blurb */}
      <p
        className={`mt-3 text-[16px] leading-6 text-[#627288] ${
          member.expandable && !expanded ? 'line-clamp-3' : ''
        }`}
      >
        {member.blurb}
      </p>

      {/* Read more / Show less */}
      {member.expandable && (
        <button
          type="button"
          onClick={() => setExpanded((current) => !current)}
          className="mt-2 min-h-11 self-start rounded-[8px] px-1 text-[14px] font-medium text-[#3D4EAE] hover:underline focus-visible:ring-2 focus-visible:ring-[#3D4EAE] focus-visible:ring-offset-2 focus-visible:outline-none"
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </article>
  )
}

export default function TeamPage() {
  return (
    <main
      className={`${inter.className} min-h-full bg-[#F5F7FB] px-6 py-8 min-[1024px]:px-8 min-[1280px]:px-12`}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mb-8">
          <h1 className="text-[32px] leading-10 font-bold break-words text-[#1A202C]">
            6-IBM-RCS Infrastructure-Team 2
          </h1>

          <p className="mt-1 text-[16px] leading-6 text-[#627288]">
            The five people building this project, and what each of them owns.
          </p>
        </header>

        <section
          aria-label="Team members"
          className="grid grid-cols-1 items-start gap-6 min-[768px]:grid-cols-2 min-[1024px]:grid-cols-3 min-[1280px]:grid-cols-4"
        >
          {teamMembers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </section>
      </div>
    </main>
  )
}
