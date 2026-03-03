#!/bin/bash

# Sehat Setu - Setup Script
# This script sets up the development environment for the Sehat Setu project

set -e  # Exit on any error

echo "🏥 Setting up Sehat Setu Development Environment..."
echo ""

# Check Python installation
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/3_BACK_END"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv .venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source .venv/Scripts/activate
else
    source .venv/bin/activate
fi

echo "✅ Virtual environment created and activated"
echo ""

# Install dependencies
echo "📥 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Dependencies installed"
echo ""

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p database logs

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your configuration"
fi

echo "✅ Directories and configuration created"
echo ""

# Initialize database
echo "🗄️  Initializing database..."
python -m flask_app.app &
sleep 3
pkill -f "flask_app.app" || true

echo "✅ Database initialized"
echo ""

# Run tests
echo "🧪 Running tests..."
pytest tests/ -v

echo ""
echo "✅ All tests passed!"
echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the development server:"
echo "  cd 3_BACK_END"
echo "  source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate"
echo "  python -m flask_app.app"
echo ""
echo "To serve the frontend:"
echo "  cd 4_FRONT-END/sehat-setu-frontend-starter"
echo "  python -m http.server 8000"
echo ""
echo "Then open http://localhost:8000 in your browser"
echo ""
