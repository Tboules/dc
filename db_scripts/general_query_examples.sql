select * from tag;
select * from excerpt_document;

select content_status.name, * from excerpt
    left join content_status on excerpt.status_id = content_status.id
where content_status.name  = 'Published'
