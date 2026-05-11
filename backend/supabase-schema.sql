create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  "fullName" text not null,
  email text not null unique,
  password text not null,
  role text not null check (role in ('admin', 'professor', 'student')),
  "studentId" text,
  department text,
  created_at timestamptz not null default now()
);

create table if not exists public.violation_record (
  id uuid primary key default gen_random_uuid(),
  student uuid not null references public.users(id) on delete cascade,
  "reportedBy" uuid not null references public.users(id) on delete cascade,
  "violationType" text not null,
  description text not null,
  severity text not null default 'minor' check (severity in ('minor', 'major', 'critical')),
  punishment text not null default '',
  "communityServiceHours" integer not null default 0,
  status text not null default 'pending' check (status in ('pending', 'assigned', 'completed')),
  created_at timestamptz not null default now()
);
