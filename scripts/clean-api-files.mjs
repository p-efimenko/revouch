import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const apiDir = path.join(__dirname, '..', 'src', 'api')

function getAllFiles(dir, fileList = []) {
  const files = readdirSync(dir)

  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = statSync(filePath)

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList)
    } else if (file.endsWith('.ts')) {
      fileList.push(filePath)
    }
  })

  return fileList
}

try {
  const files = getAllFiles(apiDir)
  let cleanedCount = 0

  for (const filePath of files) {
    let content = readFileSync(filePath, 'utf8')
    const originalContent = content

    // Remove trailing whitespace on lines
    content = content.replace(/[ \t]+$/gm, '')

    // Remove multiple consecutive blank lines (more than 2)
    content = content.replace(/\n{3,}/g, '\n\n')

    // Remove blank line before export
    content = content.replace(/\n\n+\nexport/g, '\n\nexport')

    if (content !== originalContent) {
      writeFileSync(filePath, content, 'utf8')
      cleanedCount++
    }
  }

  console.log(`✓ Cleaned ${cleanedCount} API files`)
  console.log('Running ESLint --fix...')
  execSync('pnpm lint:fix src/api', { stdio: 'inherit', shell: true })
  console.log('Running Prettier...')
  execSync('pnpm prettier --write src/api', { stdio: 'inherit', shell: true })
} catch (error) {
  console.error('✗ Error cleaning API files:', error.message)
  process.exit(1)
}

