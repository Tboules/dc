--- All indexes and extensions for reference;
CREATE EXTENSION IF NOT EXISTS pg_search;
ALTER EXTENSION pg_search UPDATE TO '0.15.26';

create index excerpt_search_idx on excerpt
using bm25 (id, title, body)
with (key_field = 'id');

create index desert_figure_search_idx on desert_figure
using bm25 (id, full_name)
with (key_field = 'id');

create index tags_search_idx on tag
using bm25 (id, name)
with (key_field = 'id');


--- indexes for excerpt_document

create index excerpt_document_idx on excerpt_document
    using bm25 ("excerptId", body, "excerptTitle", "tagsSearchable", "desertFigureName", "referenceTitle")
    with (key_field = 'excerptId');

CREATE INDEX excerpt_document_tags_gin_idx
ON excerpt_document
USING GIN (tags jsonb_path_ops);

---

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


--- After getting nowhere with Chatgpt it looks like the view route will not work, rewrite to above query to include status and reference

select * from desert_figure
order by similarity(full_name, 'amba antonious')
        desc limit 5;

select * from tag
order by similarity(name, 'borred') desc
limit 5;


refresh materialized view excerpt_document;

-- search query for excerpt documents
WITH vars AS (
    SELECT 'love'::text as search_term
)
SELECT
    paradedb.score(ed."excerptId") AS score,
    *
FROM excerpt_document AS ed
CROSS JOIN vars AS v
WHERE
    ed."excerptId" @@@ paradedb.match('body', v.search_term, distance => 1)
     OR ed."excerptId" @@@ paradedb.match('excerptTitle', v.search_term, distance => 1)
    OR ed."excerptId" @@@ paradedb.match('referenceTitle', v.search_term, distance => 1)
    OR ed."excerptId" @@@ paradedb.match('tagsSearchable', v.search_term, distance => 1)
    OR ed."excerptId" @@@ paradedb.match('desertFigureName', v.search_term, distance => 1)
ORDER BY score DESC;

---
-- loved by info example queries
select
    (
        select count(*) from excerpt_love where ed."excerptId" = excerpt_love.excerpt_id
    ) as count ,
    (
        select
            case when exists (
                select *
                from excerpt_love
                where ed."excerptId" = excerpt_love.excerpt_id
                  and excerpt_love.user_id = 'b589d35a-fbd8-4a04-ad79-14fba097b930'
            )
                then true
                else false
            end
    ) as lovedByUser,
    *
from excerpt_document as ed
order by (select count(*) from excerpt_love where ed."excerptId" = excerpt_love.excerpt_id) DESC

select * from excerpt_love;