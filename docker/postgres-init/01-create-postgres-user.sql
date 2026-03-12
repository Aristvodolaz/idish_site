-- Allow connections as "postgres" (e.g. from host GUI tools). Same password as myuser.
CREATE ROLE postgres WITH LOGIN PASSWORD '123456' SUPERUSER CREATEDB CREATEROLE;
