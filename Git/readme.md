# Git Basics
- Git init
- Git status
- Git add
- Git commit

# Git Checkout
- Git log
- Git Checkout
- Git revert
    - git revert --no-commit 0766c053..HEAD
    - git commit

```
//easy way to revert to a specific commit point in git log.
git revert --no-commit 0766c053..HEAD
git commit

//This will revert everything from the HEAD back to the commit hash, meaning it will recreate that commit state in the working tree as if every commit since had been walked back. You can then commit the current tree, and it will create a bread new commit essentially equivalent to the commit you "reverted" to.
//The (--no-commit) flag lets git revert all the commit at once - otherwise you'll be prompted for a message for each commit in the range, littering your history with unnecessary new commits.
//This is a safe and easy way to rollback to a previous state. No history is destroyed, so it can be used for commits that have already been made public.
//If you really do want ot have individual commits (instead of reverting everything with one big commit), then you can pass --no-edit instead of --no-commit, so that you don't have to edit a commit message for each reversion.
```

# Git Branch
- List all branches
    - git branch
- Adding a branch
    - git checkout -b <branch_name>
- Changing branches
    - git checkout <branch_name>
- Merging a branch
    - git merge <branch_name_to_merge_into_this_branch>
    - ex1: ```~/workspace/intro-to-git (feature1) $ git merge master```
        - will merge branch "master" to "feature1"
    - ex2: ```~/workspace/intro-to-git (master) $ git merge feature1```
        - will merge branch "feature1" to "master"
- Removing a branch
    - git branch -d <branch_name>

# Github
- create a github account 
- create a repository for this project
- validate SSH keys
- Add this remote to git
    - git remote add origin <URL_to_Github_repo>
    - origin: <remote_name>
- Check your remotes
    - git remote -
- Push your project to remote
    - git push -u <remote_name> <remote_branch_name_to_push>
    - ex: git push -u origin master