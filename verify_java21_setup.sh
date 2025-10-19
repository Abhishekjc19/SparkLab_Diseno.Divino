#!/bin/bash

echo "================================================================"
echo "              Java 21 Setup Verification Script"
echo "================================================================"
echo

# Check Java version
echo "Checking Java version..."
if command -v java >/dev/null 2>&1; then
    JAVA_VERSION=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
    echo "Current Java version: $JAVA_VERSION"
    
    if [[ "$JAVA_VERSION" == *"21"* ]]; then
        echo "✅ Java 21 is installed and active!"
    else
        echo "⚠️  Java 21 is not the current version"
        echo "   Please set JAVA_HOME to your Java 21 installation"
    fi
else
    echo "❌ Java not found in PATH"
fi
echo

# Check JAVA_HOME
echo "Checking JAVA_HOME..."
if [ -n "$JAVA_HOME" ]; then
    echo "JAVA_HOME: $JAVA_HOME"
    if [[ "$JAVA_HOME" == *"21"* ]] || [[ "$JAVA_HOME" == *"jdk-21"* ]]; then
        echo "✅ JAVA_HOME appears to point to Java 21"
    else
        echo "⚠️  JAVA_HOME may not be pointing to Java 21"
    fi
else
    echo "❌ JAVA_HOME is not set"
fi
echo

# Check Maven
echo "Checking Maven..."
if command -v mvn >/dev/null 2>&1; then
    mvn -version | head -n 3
    echo "✅ Maven is available"
else
    echo "⚠️  Maven not found in PATH, using Maven wrapper"
fi
echo

# Test project build
echo "================================================================"
echo "                    Testing Project Build"
echo "================================================================"
echo

if [ -f "./mvnw" ]; then
    echo "Testing Maven build with current Java version..."
    ./mvnw clean compile -q
    if [ $? -eq 0 ]; then
        echo "✅ Project builds successfully!"
        echo
        echo "Running tests..."
        ./mvnw test -q
        if [ $? -eq 0 ]; then
            echo "✅ All tests pass!"
        else
            echo "⚠️  Some tests failed, but build is working"
        fi
    else
        echo "❌ Build failed. Please check your Java installation."
    fi
else
    echo "❌ Maven wrapper not found. Please run from backend directory."
fi

echo
echo "================================================================"
echo "                    Setup Complete!"
echo "================================================================"
echo
echo "If everything shows ✅, your Java 21 setup is complete!"
echo "If you see ⚠️ or ❌, please follow the installation guide."