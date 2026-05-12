#!/bin/bash

# Exit immediately if a command exits with a non-zero status.
set -e

# Add all changes to git
echo "Adding changes to git..."
git add .

# Commit changes with a predefined message
echo "Committing changes..."
git commit -am "make it better"

# Push the changes to the Heroku main branch
echo "Pushing to Heroku..."
git push heroku master

echo "Deployment to Heroku completed successfully!"