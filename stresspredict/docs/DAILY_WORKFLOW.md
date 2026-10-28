# Daily workflow

The golden rule: **never work on the `main` branch.** Every piece of work goes on its own branch, and the team lead reviews it before it joins the app.

## Start of every work session

1. Open **GitHub Desktop**.
2. Make sure **Current Branch** says `main`.
3. Click **Fetch origin**, then **Pull origin** if it appears. This gets everyone else's latest work.

## Start a new piece of work

1. Click **Current Branch > New Branch**.
2. Name it with your name and the page: `ama-journal-page`. No spaces.
3. Click **Create Branch**.

## While you work

Edit files in VS Code and press **Ctrl+S** (Cmd+S on Mac) to save. Check the browser to see your changes.

## Save your progress (a "commit")

1. Go back to GitHub Desktop. You will see your changes listed.
2. In the bottom-left box, write a short summary, like `Add journal page`.
3. Click **Commit to ama-journal-page**.

Do this often. It is like pressing save on a game.

## Share your work for review

1. Click **Publish branch** (first time) or **Push origin**.
2. Click **Create Pull Request**. Your browser opens GitHub.
3. Click the green **Create pull request** button.
4. Tell the team lead it's ready.

The team lead will review it and merge it into the app, or ask for small changes.

## If something goes wrong

- **Red error in the terminal:** stop the app (Ctrl+C), run `npm run dev` again.
- **Page is blank:** look for a typo in the file you last edited, especially a missing `<` `>` or `}`.
- **GitHub Desktop shows a conflict:** don't try to fix it. Message the team lead.
- **Anything else:** copy the error text and send it to the team lead. Nothing you do on your own branch can break the app.
