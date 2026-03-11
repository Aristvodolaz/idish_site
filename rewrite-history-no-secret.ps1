# Полная перезапись истории: один коммит без секрета.
# Закройте Cursor/IDE и все терминалы в этом репо, затем запустите в PowerShell:
#   cd D:\ivrit
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
#   .\rewrite-history-no-secret.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

# 1. Удалить все lock-файлы (закройте Cursor/VS Code перед запуском!)
Remove-Item -Path ".git\index.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\HEAD.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\ORIG_HEAD.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\refs\heads\main.lock" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\AUTO_MERGE" -Force -ErrorAction SilentlyContinue
Remove-Item -Path ".git\AUTO_MERGE.lock" -Force -ErrorAction SilentlyContinue
Get-ChildItem -Path ".git" -Recurse -Force -ErrorAction SilentlyContinue | Where-Object { $_.Name -match "\.lock$" } | Remove-Item -Force -ErrorAction SilentlyContinue

# 2. Безопасный .env.example
@"
# OpenAI API Key (required for AI features). Get one at https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

"@ | Set-Content -Path ".env.example" -Encoding utf8 -NoNewline
Add-Content -Path ".env.example" -Value ""

# 3. Откат к первому коммиту (все изменения останутся в staging)
git reset --soft 7f712b9
if ($LASTEXITCODE -ne 0) { Write-Host "Ошибка reset. Убедитесь, что нет других процессов git."; exit 1 }

# 4. Один новый коммит со всем проектом (без секрета)
git add -A
git status
git commit -m "add data"
if ($LASTEXITCODE -ne 0) { exit 1 }

Write-Host "`nГотово. История переписана. Отправьте на GitHub:"
Write-Host "  git push origin main --force"
Write-Host ""
