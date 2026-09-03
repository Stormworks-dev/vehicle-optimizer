#!/bin/bash

set -e

PORT=10000

python3 -m http.server "$PORT" >/tmp/optimizeVehicle-test-server.log 2>&1 &
SERVER_PID=$!

trap 'kill "$SERVER_PID" 2>/dev/null' EXIT

sleep 1

open "http://localhost:$PORT/test/test.html"

wait "$SERVER_PID"
