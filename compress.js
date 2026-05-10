const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const rootDir = __dirname
const distDir = path.join(rootDir, 'dist')
const zipPath = path.join(distDir, 'dist.zip')
const tmpDir = path.join(rootDir, '.dist_tmp')

const directoriesToCopy = ['.next', 'public']
const filesToCopy = ['package.json', 'pnpm-lock.yaml']

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

// Clean up
if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true })
fs.mkdirSync(tmpDir, { recursive: true })

// Copy to tmp/
for (const dir of directoriesToCopy) {
  const src = path.join(rootDir, dir)
  const dest = path.join(tmpDir, dir)
  if (fs.existsSync(src)) {
    console.log(`Copying ${dir}/...`)
    copyDir(src, dest)
  }
}
for (const file of filesToCopy) {
  const src = path.join(rootDir, file)
  const dest = path.join(tmpDir, file)
  if (fs.existsSync(src)) {
    console.log(`Copying ${file}...`)
    fs.copyFileSync(src, dest)
  }
}

// Create zip in dist/
if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true })
fs.mkdirSync(distDir, { recursive: true })

console.log('Creating dist.zip...')
const pyScript = path.join(rootDir, '_zip.py')
fs.writeFileSync(pyScript, `import zipfile, os, sys
root = sys.argv[1]
zip_path = sys.argv[2]
with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zf:
    for dirpath, dirnames, filenames in os.walk(root):
        for fn in filenames:
            full = os.path.join(dirpath, fn)
            arcname = os.path.relpath(full, os.path.dirname(root))
            zf.write(full, arcname)
`)
execSync(`python3 "${pyScript}" "${tmpDir}" "${zipPath}"`, { stdio: 'inherit' })
fs.unlinkSync(pyScript)

// Clean up tmp/
fs.rmSync(tmpDir, { recursive: true })

const stats = fs.statSync(zipPath)
console.log(`dist.zip created (${(stats.size / 1024 / 1024).toFixed(2)} MB)`)
