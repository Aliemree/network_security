#!/bin/bash
# Klasik Şifreleme Koleksiyonu - İnteraktif Menü

PROJECT="src/ClassicalCipherSuite.csproj"
FW="net9.0"

clear
echo "╔════════════════════════════════════════════════════════════╗"
echo "║   KLASİK ŞİFRELEME KOLEKSİYONU - İNTERAKTİF MENÜ         ║"
echo "║                                                            ║"
echo "║   8 Farklı Klasik Şifreleme Algoritması                   ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

show_menu() {
    echo "┌────────────────────────────────────────────────────────────┐"
    echo "│  Şifreleme Algoritmaları:                                  │"
    echo "├────────────────────────────────────────────────────────────┤"
    echo "│  1. Caesar Cipher          (Sabit kaydırma)               │"
    echo "│  2. Monoalphabetic         (Permütasyon)                  │"
    echo "│  3. Vigenère Cipher        (Polyalphabetic)               │"
    echo "│  4. Playfair Cipher        (5×5 matris)                   │"
    echo "│  5. Hill Cipher            (Matris tabanlı)               │"
    echo "│  6. Columnar Transposition (Sütun permütasyonu)           │"
    echo "│  7. Differential XOR       (Fun Cipher)                   │"
    echo "│  8. Base64                 (Encoding)                     │"
    echo "├────────────────────────────────────────────────────────────┤"
    echo "│  9. Tüm Algoritmaları Test Et                             │"
    echo "│  0. Çıkış                                                  │"
    echo "└────────────────────────────────────────────────────────────┘"
    echo ""
}

caesar_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   CAESAR CIPHER"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Kaydırma miktarı (örn: 3): " shift
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode $mode --shift $shift)
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:  $text"
    echo "│ Shift:  $shift"
    echo "│ Çıktı:  $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

vigenere_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   VIGENÈRE CIPHER"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Anahtar kelime (örn: LEMON): " key
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode $mode --key "$key")
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:  $text"
    echo "│ Key:    $key"
    echo "│ Çıktı:  $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

monoalphabetic_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   MONOALPHABETIC CIPHER"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Anahtar kelime (örn: CIPHER): " keyword
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode $mode --keyword "$keyword")
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:    $text"
    echo "│ Keyword:  $keyword"
    echo "│ Çıktı:    $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

playfair_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   PLAYFAIR CIPHER"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Anahtar kelime (örn: MONARCHY): " key
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher playfair --mode $mode --key "$key")
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:  $text"
    echo "│ Key:    $key"
    echo "│ Çıktı:  $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

hill_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   HILL CIPHER (2×2)"
    echo "═══════════════════════════════════════"
    echo ""
    echo "Örnek matrisler:"
    echo "  2×2: 3,3;2,5"
    echo "  3×3: 6,24,1;13,16,10;20,17,15"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Matris (örn: 3,3;2,5): " matrix
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher hill --mode $mode --matrix "$matrix" 2>&1)
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:   $text"
    echo "│ Matrix:  $matrix"
    echo "│ Çıktı:   $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

columnar_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   COLUMNAR TRANSPOSITION"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Anahtar (örn: ZEBRA): " key
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher columnar --mode $mode --key "$key")
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:  $text"
    echo "│ Key:    $key"
    echo "│ Çıktı:  $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

fun_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   DIFFERENTIAL XOR (FUN CIPHER)"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Şifrele/Deşifrele (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Passphrase (örn: secret): " passphrase
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    
    if [[ "$mode" == "enc" ]]; then
        result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode enc --passphrase "$passphrase")
    else
        result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode dec --passphrase "$passphrase" --hex-in true)
    fi
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:       $text"
    echo "│ Passphrase:  $passphrase"
    echo "│ Çıktı:       $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

base64_menu() {
    clear
    echo "═══════════════════════════════════════"
    echo "   BASE64 ENCODING"
    echo "═══════════════════════════════════════"
    echo ""
    
    read -p "Encode/Decode (e/d): " mode
    if [[ "$mode" == "e" ]]; then
        mode="enc"
    else
        mode="dec"
    fi
    
    read -p "Metin girin: " text
    
    echo ""
    echo "İşleniyor..."
    result=$(echo "$text" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode $mode)
    
    echo ""
    echo "┌─ SONUÇ ────────────────────────────────"
    echo "│ Girdi:  $text"
    echo "│ Çıktı:  $result"
    echo "└────────────────────────────────────────"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

test_all() {
    clear
    echo "═══════════════════════════════════════"
    echo "   TÜM ALGORİTMALARI TEST ET"
    echo "═══════════════════════════════════════"
    echo ""
    
    PLAINTEXT="ATTACKATDAWN"
    echo "Test Metni: $PLAINTEXT"
    echo ""
    
    echo "1. Caesar Cipher (shift=3)"
    echo "   ► Şifreleniyor..."
    result=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher caesar --mode enc --shift 3)
    echo "   ✓ Sonuç: $result"
    echo ""
    
    echo "2. Vigenère Cipher (key=LEMON)"
    echo "   ► Şifreleniyor..."
    result=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher vigenere --mode enc --key LEMON)
    echo "   ✓ Sonuç: $result"
    echo ""
    
    echo "3. Monoalphabetic (keyword=CIPHER)"
    echo "   ► Şifreleniyor..."
    result=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher mono --mode enc --keyword CIPHER)
    echo "   ✓ Sonuç: $result"
    echo ""
    
    echo "4. Base64"
    echo "   ► Encode ediliyor..."
    result=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher base64 --mode enc)
    echo "   ✓ Sonuç: $result"
    echo ""
    
    echo "5. Fun Cipher (passphrase=test)"
    echo "   ► Şifreleniyor..."
    result=$(echo "$PLAINTEXT" | dotnet run --project $PROJECT --framework $FW -- --cipher fun --mode enc --passphrase "test")
    echo "   ✓ Sonuç: $result"
    echo ""
    
    echo "════════════════════════════════════════"
    echo "Tüm testler tamamlandı! ✓"
    echo "════════════════════════════════════════"
    echo ""
    read -p "Devam etmek için Enter'a basın..."
}

# Ana döngü
while true; do
    clear
    echo "╔════════════════════════════════════════════════════════════╗"
    echo "║   KLASİK ŞİFRELEME KOLEKSİYONU                            ║"
    echo "╚════════════════════════════════════════════════════════════╝"
    echo ""
    show_menu
    
    read -p "Seçiminiz (0-9): " choice
    
    case $choice in
        1) caesar_menu ;;
        2) monoalphabetic_menu ;;
        3) vigenere_menu ;;
        4) playfair_menu ;;
        5) hill_menu ;;
        6) columnar_menu ;;
        7) fun_menu ;;
        8) base64_menu ;;
        9) test_all ;;
        0) 
            clear
            echo ""
            echo "╔════════════════════════════════════════╗"
            echo "║  Teşekkürler! Görüşmek üzere! 👋      ║"
            echo "╚════════════════════════════════════════╝"
            echo ""
            exit 0
            ;;
        *)
            echo ""
            echo "❌ Geçersiz seçim! Lütfen 0-9 arası bir sayı girin."
            sleep 2
            ;;
    esac
done
