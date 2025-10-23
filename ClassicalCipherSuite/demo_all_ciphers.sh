#!/bin/bash
# Tüm şifreleme algoritmalarını test eden demo script

echo "=================================="
echo "Klasik Şifreleme Koleksiyonu DEMO"
echo "=================================="
echo ""

PROJECT="src/ClassicalCipherSuite.csproj"
FW="net9.0"
PLAINTEXT="ATTACKATDAWN"

echo "Test Metni: $PLAINTEXT"
echo ""

echo "1. CAESAR CIPHER (shift=3)"
echo "  Şifrele:"
CAESAR_ENC=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode enc --shift 3)
echo "    $CAESAR_ENC"
echo "  Deşifrele:"
CAESAR_DEC=$(echo "$CAESAR_ENC" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode dec --shift 3)
echo "    $CAESAR_DEC"
echo ""

echo "2. VIGENÈRE CIPHER (key=LEMON)"
echo "  Şifrele:"
VIG_ENC=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode enc --key LEMON)
echo "    $VIG_ENC"
echo "  Deşifrele:"
VIG_DEC=$(echo "$VIG_ENC" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode dec --key LEMON)
echo "    $VIG_DEC"
echo ""

echo "3. MONOALPHABETIC (keyword=CIPHER)"
echo "  Şifrele:"
MONO_ENC=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode enc --keyword CIPHER)
echo "    $MONO_ENC"
echo "  Deşifrele:"
MONO_DEC=$(echo "$MONO_ENC" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode dec --keyword CIPHER)
echo "    $MONO_DEC"
echo ""

echo "4. BASE64"
echo "  Encode:"
B64_ENC=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode enc)
echo "    $B64_ENC"
echo "  Decode:"
B64_DEC=$(echo "$B64_ENC" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode dec)
echo "    $B64_DEC"
echo ""

echo "5. DIFFERENTIAL XOR (Fun Cipher)"
echo "  Şifrele:"
XOR_ENC=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode enc --passphrase "test")
echo "    $XOR_ENC"
echo "  Deşifrele:"
XOR_DEC=$(echo "$XOR_ENC" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode dec --passphrase "test" --hex-in true)
echo "    $XOR_DEC"
echo ""

echo "=================================="
echo "Tüm testler tamamlandı!"
echo "=================================="
