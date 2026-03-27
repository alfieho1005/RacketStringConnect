create or replace view public.vw_stringer_list as
select
  s.*
from public.stringers s
where s.visibility = 'active' and s.status = 'approved';

