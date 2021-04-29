echo "Installing deno..."
curl -fsSL https://deno.land/x/install/install.sh | sh
export PATH="/opt/buildhome/.deno/bin:$PATH" 
echo "Installing Aleph..."
deno install --unstable -A -f -n aleph https://deno.land/x/aleph@v0.3.0-alpha.32/cli.ts

mkdir dist
echo "Building website..."

aleph Building