## Desert Collections

- [x] devops backend workflow
  - [x] Vercel Deploy Dev and Prod
- [x] setup shadcn
- [x] drizzle init and auth schema
  - [x] reconfigure auth schema for next-auth
- [x] setup auth and protected routes
- [x] setup routing and page layout
- [x] create UI for layout
- [x] Drizzle Schema for application
- [ ] create UI for forms
- [ ] add author / quote / tag
- [ ] ui to display author / quotes / tags

## Notes

1. How will I handle the actions in the folder structure.

   - Create action files at each route with "use server" at the top.
   - Within these I can place all db and form parsing actions for each form
   - [example](https://whateverittech.medium.com/handle-form-on-nextjs-14-using-server-action-and-drizzle-orm-de9c23826592)

2. How will I handle client side form validation with server actions

   - [video](https://youtu.be/VLk45JBe8L8?si=b4tA9oXNkrxDuW9M)
   - [repo](https://github.com/ProNextJS/forms-management-yt)

3. How will I seed the DB?
   - [example](https://dev.to/anasrin/seeding-database-with-drizzle-orm-fga)

#### Working Todo List

- [x] New Excerpt Form UI
  - [x] Create Relationship between New Figure and New Excerpt Form
  - [x] Pull desert figure data into new excerpt form
  - [x] Create ui for new excerpt form
    - [x] Search for Desert Figure
    - [x] place holder for Figure
    - [x] Title (move it below)
    - [x] Excerpt Section Tip Tap (make bigger on larger screen)
    - [x] Tags section
  - [x] Add wisywig for excerpt
  - [ ] create use-form context and add to comps (desert figure search, tags comp)
- [ ] New Excert Form Logic
  - [ ] Create logic to search for desert figure
  - [ ] Add Component to create tags on new excerpt form
  - [ ] Parse and escape all fields, especially wisywig
