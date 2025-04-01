NAME = scripter

$(NAME):
	@echo "\033[1;32m[$(NAME)]\033[0m Installing dependencies..."
	@bun install --frozen-lockfile > /dev/null
	@echo "\033[1;32m[$(NAME)]\033[0m Building vite app..."
	@bun run build > /dev/null
	@echo "\033[1;32m[$(NAME)]\033[0m Building background.ts..."
	@bun build src/extension/background.ts --outdir=dist --minify --target=browser > /dev/null
	@echo "\033[1;32m[$(NAME)]\033[0m Copying manifest.json..."
	@cp manifest.json dist/manifest.json

all: $(NAME)

re: fclean all

clean:
	@echo "\033[1;33m[clean]\033[0m Cleaning..."
	@rm -rf dist

fclean: clean
	@echo "\033[1;31m[fclean]\033[0m Cleaning..."
	@rm -rf node_modules