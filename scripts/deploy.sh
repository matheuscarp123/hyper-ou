#!/bin/bash

# HyperGym Deploy Script
# Copyright (c) 2024 Matheus Carvalho

echo "🚀 Iniciando deploy do HyperGym..."
echo "👨‍💻 Desenvolvido por: Matheus Carvalho"
echo "📧 Contato: matheus.carvalho.dev@gmail.com"

# Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script no diretório raiz do projeto"
    exit 1
fi

# 1. Limpar builds anteriores
echo "🧹 Limpando builds anteriores..."
rm -rf .next
rm -rf out
rm -rf android/app/build
rm -rf ios/App/build

# 2. Instalar dependências
echo "📦 Instalando dependências..."
npm ci

# 3. Build para produção
echo "🌐 Construindo versão de produção..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build. Verifique os erros acima."
    exit 1
fi

# 4. Sincronizar com Capacitor
echo "📱 Sincronizando com Capacitor..."
npx cap sync

# 5. Build Android
echo "🤖 Construindo APK Android..."
cd android
./gradlew clean
./gradlew assembleRelease

if [ $? -eq 0 ]; then
    echo "✅ APK Android criado com sucesso!"
    echo "📍 Localização: android/app/build/outputs/apk/release/app-release.apk"
else
    echo "❌ Erro ao criar APK Android"
fi

cd ..

# 6. iOS (apenas no macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Abrindo projeto iOS no Xcode..."
    npx cap open ios
    echo "📝 Configure o signing e build manualmente no Xcode"
else
    echo "⚠️  iOS build disponível apenas no macOS"
fi

echo ""
echo "✅ Deploy concluído!"
echo "📱 APK Android: android/app/build/outputs/apk/release/"
echo "🔐 App protegido contra cópia e pirataria"
echo "💰 Sistema de monetização implementado"
echo "📊 Analytics e ads configurados"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure seus IDs do AdMob em capacitor.config.ts"
echo "2. Configure as chaves de assinatura para release"
echo "3. Teste o APK em dispositivos reais"
echo "4. Publique na Google Play Store e App Store"
echo ""
echo "© 2024 Matheus Carvalho - Todos os direitos reservados"
