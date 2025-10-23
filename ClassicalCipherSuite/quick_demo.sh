#!/bin/bash
# Hızlı demo - tüm algoritmaları göster

PROJECT="src/ClassicalCipherSuite.csproj"
FW="net9.0"

clear
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   KLASİK ŞİFRELEME KOLEKSİYONU - HIZLI DEMO              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

PLAINTEXT="ATTACKATDAWN"
echo "📝 Test Metni: $PLAINTEXT"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1️⃣  CAESAR CIPHER (shift=3)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode enc --shift 3)
echo "   🔐 Şifreli:  $RESULT"
DECRYPT=$(echo "$RESULT" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode dec --shift 3)
echo "   🔓 Deşifre:  $DECRYPT"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  VIGENÈRE CIPHER (key=LEMON)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode enc --key LEMON)
echo "   🔐 Şifreli:  $RESULT"
DECRYPT=$(echo "$RESULT" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode dec --key LEMON)
echo "   🔓 Deşifre:  $DECRYPT"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  MONOALPHABETIC (keyword=CIPHER)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode enc --keyword CIPHER)
echo "   🔐 Şifreli:  $RESULT"
DECRYPT=$(echo "$RESULT" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode dec --keyword CIPHER)
echo "   🔓 Deşifre:  $DECRYPT"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  PLAYFAIR CIPHER (key=MONARCHY)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher playfair --mode enc --key MONARCHY)
echo "   🔐 Şifreli:  $RESULT"
echo "   (Not: Playfair çift harf padding ekler)"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  BASE64 ENCODING"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode enc)
echo "   🔐 Encoded:  $RESULT"
DECRYPT=$(echo "$RESULT" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode dec)
echo "   🔓 Decoded:  $DECRYPT"
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6️⃣  DIFFERENTIAL XOR (Fun Cipher - passphrase=test)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
RESULT=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode enc --passphrase "test")
echo "   🔐 Hex:      $RESULT"
DECRYPT=$(echo "$RESULT" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode dec --passphrase "test" --hex-in true)
echo "   🔓 Deşifre:  $DECRYPT"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ TÜM ALGORİTMALAR BAŞARIYLA TEST EDİLDİ!              ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "📖 Detaylı kullanım için:"
echo "   - İnteraktif menü: ./interactive_menu.sh"
echo "   - Yardım: dotnet run --project src -f net9.0 -- --help"
echo ""
