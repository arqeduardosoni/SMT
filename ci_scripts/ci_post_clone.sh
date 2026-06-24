#!/bin/zsh
# Xcode Cloud post-clone: reconstruye los assets web desde el código fuente
# para que el build refleje el último push. NO es fatal: si algo falla,
# se usan los assets ya incluidos en ios/App/App/public (commiteados).
cd "$CI_PRIMARY_REPOSITORY_PATH" || exit 0
{
  export HOMEBREW_NO_AUTO_UPDATE=1
  brew install node || true
  npm ci || npm install || true
  npm run build || true
  npx cap copy ios || true
} 2>&1
exit 0
