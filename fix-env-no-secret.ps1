# Run this when rebase has stopped at the bad commit (to remove secret from .env.example)
$content = @"
# OpenAI API Key (required for AI features). Get one at https://platform.openai.com/api-keys
OPENAI_API_KEY=your-openai-api-key-here

"@
Set-Content -Path .env.example -Value $content.TrimEnd() -Encoding utf8
