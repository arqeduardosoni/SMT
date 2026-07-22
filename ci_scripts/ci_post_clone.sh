#!/bin/zsh
# Xcode Cloud post-clone:
#  1) Reconstruye los assets web desde el código fuente (refleja el último push).
#  2) Resuelve las dependencias Swift (genera/actualiza Package.resolved).
#
# IMPORTANTE: el bundle web ya viene pre-compilado y commiteado en
#   ios/App/App/public/  (hecho localmente con vite + copiado a mano).
# Este script INTENTA reconstruirlo para tener lo más fresco posible, pero si
# la compilación falla, se CONSERVA el bundle commiteado (nunca se sobrescribe
# con archivos viejos ni se vacía la carpeta).
cd "$CI_PRIMARY_REPOSITORY_PATH" || exit 0
{
  export HOMEBREW_NO_AUTO_UPDATE=1
  brew install node || true
  npm ci || npm install || true

  if npm run build && [ -f dist/index.html ] && ls dist/assets/index-*.js >/dev/null 2>&1; then
    echo "WEB BUILD OK -> copiando dist fresco a iOS"
    npx cap copy ios || true
  else
    echo "WEB BUILD FALLÓ -> se conserva el bundle ya commiteado en ios/App/App/public"
  fi

  xcodebuild -resolvePackageDependencies -project ios/App/App.xcodeproj -scheme App || true
} 2>&1
exit 0
