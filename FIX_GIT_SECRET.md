# Удаление секрета из истории Git (окончательное решение)

GitHub блокирует push, потому что в истории есть коммит **61437bdf** с реальным API ключом в `.env.example`. Нужно **полностью убрать этот коммит из ветки**.

## Важно: запуск без Cursor/IDE

Команды git создают lock-файлы, а Cursor может их держать. Поэтому шаги ниже нужно выполнять **в обычном PowerShell, закрыв папку D:\ivrit в Cursor** (File → Close Folder или закройте Cursor).

---

## Способ: один скрипт (рекомендуется)

1. **Закройте Cursor** (или закройте папку D:\ivrit).
2. Откройте **PowerShell** (не в Cursor).
3. Выполните:

```powershell
cd D:\ivrit
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass -Force
.\rewrite-history-no-secret.ps1
```

4. Если скрипт отработал без ошибок, отправьте изменения на GitHub:

```powershell
git push origin main --force
```

После этого в ветке `main` будет только два коммита: `first commit` и один новый `add data` **без секрета**. Push должен пройти.

---

## Если скрипт ругается на lock-файлы

Выполните вручную в PowerShell (папка D:\ivrit в Cursor закрыта):

```powershell
cd D:\ivrit

# Удалить lock-файлы
Remove-Item -Force .git\index.lock -ErrorAction SilentlyContinue
Remove-Item -Force .git\HEAD.lock -ErrorAction SilentlyContinue
Remove-Item -Force .git\ORIG_HEAD.lock -ErrorAction SilentlyContinue
Remove-Item -Force .git\refs\heads\main.lock -ErrorAction SilentlyContinue
Remove-Item -Force .git\AUTO_MERGE -ErrorAction SilentlyContinue
Remove-Item -Force .git\AUTO_MERGE.lock -ErrorAction SilentlyContinue

# Откат к первому коммиту (все файлы остаются)
git reset --soft 7f712b9

# Убедиться, что в .env.example нет ключа (только плейсхолдер)
# Если нужно — откройте .env.example и замените строку OPENAI_API_KEY= на:
# OPENAI_API_KEY=your-openai-api-key-here

git add -A
git commit -m "add data"
git push origin main --force
```

---

## После успешного push

1. В [OpenAI API Keys](https://platform.openai.com/api-keys) удалите старый ключ и создайте новый.
2. В локальном файле **`.env`** (не в git) укажите новый ключ.
