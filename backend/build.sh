#!/bin/bash
set -e

echo "Installing pip using ensurepip..."
python3 -m ensurepip --upgrade

echo "Installing requirements..."
python3 -m pip install --no-cache-dir -r requirements.txt

echo "Build completed successfully"