#!/bin/zsh
# Xcode Cloud post-clone:
#  1) Reconstruye los assets web desde el código fuente (refleja el último push).
#  2) Resuelve las dependencias Swift (genera/actualiza Package.resolved).
# Todo es NO fatal: si algo falla, se usan los archivos ya incluidos en el repo.
cd "$CI_PRIMARY_REPOSITORY_PATH" || exit 0
{
  export HOMEBREW_NO_AUTO_UPDATE=1
  brew install node || true
  npm ci || npm install || true
  npm run build || true
  npx cap copy ios || true
  xcodebuild -resolvePackageDependencies -project ios/App/App.xcodeproj -scheme App || true
} 2>&1
exit 0
