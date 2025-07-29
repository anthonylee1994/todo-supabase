create table public.todos (
    id bigint generated always as identity primary key,
    user_id uuid not null references auth.users on delete cascade,
    title text not null,
    done boolean default false,
    inserted_at timestamptz default now()
);
alter table public.todos enable row level security;
create policy "User can CRUD own todos" on public.todos for all using (auth.uid() = user_id) with check (auth.uid() = user_id);