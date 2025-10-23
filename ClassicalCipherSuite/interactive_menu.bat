@echo off
chcp 65001 >nul
color 0A

:MENU
cls
echo ╔════════════════════════════════════════════════════════════╗
echo ║   KLASİK ŞİFRELEME KOLEKSİYONU - İNTERAKTİF MENÜ         ║
echo ║                                                            ║
echo ║   8 Farklı Klasik Şifreleme Algoritması                   ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo ┌────────────────────────────────────────────────────────────┐
echo │  Şifreleme Algoritmaları:                                  │
echo ├────────────────────────────────────────────────────────────┤
echo │  1. Caesar Cipher          (Sabit kaydırma)               │
echo │  2. Monoalphabetic         (Permütasyon)                  │
echo │  3. Vigenère Cipher        (Polyalphabetic)               │
echo │  4. Playfair Cipher        (5×5 matris)                   │
echo │  5. Hill Cipher            (Matris tabanlı)               │
echo │  6. Columnar Transposition (Sütun permütasyonu)           │
echo │  7. Differential XOR       (Fun Cipher)                   │
echo │  8. Base64                 (Encoding)                     │
echo ├────────────────────────────────────────────────────────────┤
echo │  9. Tüm Algoritmaları Test Et                             │
echo │  0. Çıkış                                                  │
echo └────────────────────────────────────────────────────────────┘
echo.

set /p choice="Seçiminiz (0-9): "

if "%choice%"=="1" goto CAESAR
if "%choice%"=="2" goto MONO
if "%choice%"=="3" goto VIGENERE
if "%choice%"=="4" goto PLAYFAIR
if "%choice%"=="5" goto HILL
if "%choice%"=="6" goto COLUMNAR
if "%choice%"=="7" goto FUN
if "%choice%"=="8" goto BASE64
if "%choice%"=="9" goto TESTALL
if "%choice%"=="0" goto EXIT
goto MENU

:CAESAR
cls
echo ═══════════════════════════════════════
echo    CAESAR CIPHER
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p shift="Kaydırma miktarı (örn: 3): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher caesar --mode %mode% --shift %shift%
echo.
pause
goto MENU

:VIGENERE
cls
echo ═══════════════════════════════════════
echo    VIGENÈRE CIPHER
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p key="Anahtar kelime (örn: LEMON): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher vigenere --mode %mode% --key %key%
echo.
pause
goto MENU

:MONO
cls
echo ═══════════════════════════════════════
echo    MONOALPHABETIC CIPHER
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p keyword="Anahtar kelime (örn: CIPHER): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher mono --mode %mode% --keyword %keyword%
echo.
pause
goto MENU

:PLAYFAIR
cls
echo ═══════════════════════════════════════
echo    PLAYFAIR CIPHER
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p key="Anahtar kelime (örn: MONARCHY): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher playfair --mode %mode% --key %key%
echo.
pause
goto MENU

:HILL
cls
echo ═══════════════════════════════════════
echo    HILL CIPHER (2×2)
echo ═══════════════════════════════════════
echo.
echo Örnek matrisler:
echo   2×2: 3,3;2,5
echo   3×3: 6,24,1;13,16,10;20,17,15
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p matrix="Matris (örn: 3,3;2,5): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher hill --mode %mode% --matrix %matrix%
echo.
pause
goto MENU

:COLUMNAR
cls
echo ═══════════════════════════════════════
echo    COLUMNAR TRANSPOSITION
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p key="Anahtar (örn: ZEBRA): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher columnar --mode %mode% --key %key%
echo.
pause
goto MENU

:FUN
cls
echo ═══════════════════════════════════════
echo    DIFFERENTIAL XOR (FUN CIPHER)
echo ═══════════════════════════════════════
echo.
set /p mode="Şifrele/Deşifrele (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p passphrase="Passphrase (örn: secret): "
set /p text="Metin girin: "

echo.
echo İşleniyor...
if "%mode%"=="enc" (
    echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher fun --mode enc --passphrase %passphrase%
) else (
    echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher fun --mode dec --passphrase %passphrase% --hex-in true
)
echo.
pause
goto MENU

:BASE64
cls
echo ═══════════════════════════════════════
echo    BASE64 ENCODING
echo ═══════════════════════════════════════
echo.
set /p mode="Encode/Decode (e/d): "
if "%mode%"=="e" set mode=enc
if "%mode%"=="d" set mode=dec
set /p text="Metin girin: "

echo.
echo İşleniyor...
echo %text% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher base64 --mode %mode%
echo.
pause
goto MENU

:TESTALL
cls
echo ═══════════════════════════════════════
echo    TÜM ALGORİTMALARI TEST ET
echo ═══════════════════════════════════════
echo.
set PLAINTEXT=ATTACKATDAWN
echo Test Metni: %PLAINTEXT%
echo.

echo 1. Caesar Cipher (shift=3)
echo    ► Şifreleniyor...
echo %PLAINTEXT% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher caesar --mode enc --shift 3
echo.

echo 2. Vigenère Cipher (key=LEMON)
echo    ► Şifreleniyor...
echo %PLAINTEXT% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher vigenere --mode enc --key LEMON
echo.

echo 3. Base64
echo    ► Encode ediliyor...
echo %PLAINTEXT% | dotnet run --project src\ClassicalCipherSuite.csproj --framework net9.0 -- --cipher base64 --mode enc
echo.

echo ════════════════════════════════════════
echo Tüm testler tamamlandı! ✓
echo ════════════════════════════════════════
echo.
pause
goto MENU

:EXIT
cls
echo.
echo ╔════════════════════════════════════════╗
echo ║  Teşekkürler! Görüşmek üzere! 👋      ║
echo ╚════════════════════════════════════════╝
echo.
timeout /t 2 >nul
exit
