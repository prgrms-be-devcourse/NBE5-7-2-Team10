import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 처리할 디렉토리 경로
const directories = [
  path.join(__dirname, "src/components"),
  path.join(__dirname, "src/pages"),
  path.join(__dirname, "src/contexts"),
]

// 처리할 파일 확장자
const extensions = [".jsx", ".js", ".tsx", ".ts"]

// React 훅 패턴 (use로 시작하는 함수들)
const reactHooks = [
  "useState",
  "useEffect",
  "useContext",
  "useReducer",
  "useCallback",
  "useMemo",
  "useRef",
  "useImperativeHandle",
  "useLayoutEffect",
  "useDebugValue",
  "useNavigate",
  "useParams",
  "useLocation",
  "useHistory",
  "useRouteMatch",
  "useSearchParams",
  "createContext",
]

// 파일에 'use client' 지시어가 있는지 확인
function hasUseClientDirective(content) {
  return /^\s*['"]use client['"]/m.test(content)
}

// 파일에 React 훅이 사용되는지 확인
function usesReactHooks(content) {
  const hookPattern = new RegExp(`\\b(${reactHooks.join("|")})\\b`, "g")
  return hookPattern.test(content)
}

// 'use client' 지시어 추가
function addUseClientDirective(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8")

    // 이미 'use client' 지시어가 있으면 건너뜀
    if (hasUseClientDirective(content)) {
      console.log(`Already has 'use client' directive: ${filePath}`)
      return
    }

    // React 훅이 사용되는지 확인
    if (!usesReactHooks(content)) {
      console.log(`No React hooks found, skipping: ${filePath}`)
      return
    }

    // 'use client' 지시어 추가
    const updatedContent = `'use client'\n\n${content}`
    fs.writeFileSync(filePath, updatedContent, "utf8")
    console.log(`Added 'use client' directive to: ${filePath}`)
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error)
  }
}

// 디렉토리 내의 모든 파일 처리
function processDirectory(directory) {
  try {
    const files = fs.readdirSync(directory)

    for (const file of files) {
      const filePath = path.join(directory, file)
      const stat = fs.statSync(filePath)

      if (stat.isDirectory()) {
        // 재귀적으로 하위 디렉토리 처리
        processDirectory(filePath)
      } else if (extensions.includes(path.extname(file))) {
        // 지정된 확장자를 가진 파일만 처리
        addUseClientDirective(filePath)
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error)
  }
}

// 모든 지정된 디렉토리 처리
console.log('Starting to add "use client" directives to React component files...')
directories.forEach((dir) => {
  console.log(`Processing directory: ${dir}`)
  processDirectory(dir)
})
console.log('Finished adding "use client" directives.')
