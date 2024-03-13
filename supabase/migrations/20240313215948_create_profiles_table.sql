CREATE TABLE profiles(
  id uuid PRIMARY KEY references auth.users ( id ),
  email varchar not null,
  username varchar not null,
  name varchar not null,
  site varchar,
  bio varchar,
  phone varchar,
  avatar_url varchar not null,
  address jsonb,
  create_at timestamp with time zone default current_timestamp not null,
  payment_connected_account varchar
)