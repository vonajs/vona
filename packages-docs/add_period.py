import re
import os

# 匹配规则（同 VS Code 正则）
pattern = re.compile(
    r'^(?!\s*$)(?!#{1,6}\s)(?!\s*[-*+]\s)(?!\s*\d+\.\s)(?!`{3}).*[^。.!？！:：)\]"']\s*$',
    re.MULTILINE
)

# 遍历当前目录所有 .md
for file in os.listdir('.'):
    if file.endswith('.md'):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        # 替换
        new_content = pattern.sub(lambda m: m.group(0) + '.', content)
        # 写回
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"已处理：{file}")
