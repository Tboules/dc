WITH vars AS (
    SELECT 'love'::text as search_term
)
select paradedb.score(e.id),  e.body, e.title, df.full_name, string_agg(t.name, ', ' ORDER BY t.name) as tags from excerpt e
    inner join desert_figure as df on df.id = e.desert_figure_id
    inner join excerpt_tag as et on et.excerpt_id = e.id
    inner join tag as t on et.tag_id = t.id
    cross join vars v
where e.id @@@ paradedb.match('body', v.search_term, distance => 1)
   or t.id @@@ paradedb.match('name', v.search_term, distance => 1)
   or e.id @@@ paradedb.match('title', v.search_term, distance => 1)
   or df.id @@@ paradedb.match('full_name', v.search_term, distance => 1)
group by e.id, df.full_name
order by paradedb.score(e.id) desc;

select *
from desert_figure
where desert_figure.id @@@ paradedb.match('full_name', 'saint anthony', distance => 2);

select * from desert_figure
order by similarity(full_name, 'amba antonious')
desc limit 5;

select * from tag
order by similarity(name, 'borred') desc
limit 5;

create index excerpt_search_idx on excerpt
using bm25 (id, title, body)
with (key_field = 'id');

create index desert_figure_search_idx on desert_figure
using bm25 (id, full_name)
with (key_field = 'id');

create index tags_search_idx on tag
using bm25 (id, name)
with (key_field = 'id');

--- After getting nowhere with Chatgpt it looks like the view route will not work, rewrite to above query to include status and reference