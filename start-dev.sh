#!/bin/bash

echo "Starting frontend and backend servers..."

concurrently \
  "cd Frontend && npm run dev" \
  "cd Backend && node server.js"

