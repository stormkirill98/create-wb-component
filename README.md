# Что делает скрипт

Скрипт создает новый компонент в папке `components` следуя следующей архитектуре:
```
some-package
   components
      new-component
         index.module.scss
         index.tsx
      index.ts
```
Новый компонент будет экспортирован из `components/index.ts`

##### Скрипт принимает 2 аргумента:

1. Путь до папки `components`
2. Название компонента в `kebab-case`

> Если запускать через интерфейс **webstorm**, то 1ый аргумент будет автоматически задаваться при выборе нужной папки, а для заполнения 2-го будет модалка с инпутом


### Созданные файлы имеют следующую структуру:
##### component-name/index.tsx
```tsx
import classnames from 'classnames/bind';
import styles from './index.module.scss';

const BLOCK_NAME = 'ComponentName';
const cn = classnames.bind(styles);

export const ComponentName = () => {
  return (
    <div className={cn(BLOCK_NAME)}>
      ComponentName
    </div>
  );
};
```
##### component-name/index.scss
```scss
.ComponentName {
   display: block;
}
```
##### components/index.ts
```ts
export * from './component-name';
```

# Как запустить скрипт
Запустите команду `npx create-wb-component ./src/page/my-page/components new-component`\
`./src/page/my-page/components` - относительный путь от корня проекта до папки, в которой будет создан компонент\
`new-component` - название нового компонента в kebab стиле

# Как добавить скрипт в webstorm и запускать из интерфейса

##### Запустите команду `chmod a+x index.js` в этом проекте (для macos как минимум обязательно)

### Add the script to WebStorm:
1. Open WebStorm and go to **File > Settings**.
2. Navigate to **Tools > External Tools**.
3. Click the + button to add a new external tool.
4. Fill in the details as follows:
   * Name: `Create Component`
   * Description: `Create a new component with the required structure`
   * Program: `node`
   * Arguments: `/Users/your-user/path-to-projects/create-wb-component/index.js $FileDir$ $Prompt$`
   * Working Directory: `$ProjectFileDir$`
5. Click OK to save the new external tool.

### Run the script from WebStorm:
1. Right-click on the components folder or any other target directory in the Project tool window.
2. Go to **Tools > External Tools > Create Component**.
3. You will be prompted to enter the component name. Enter the desired name for your component.
4. The script will execute and create the new component structure in the selected directory.

### (Optional) Assign a Keyboard Shortcut:
1. To make it even more convenient, you can assign a keyboard shortcut to the external tool.
2. Go to **File > Settings > Keymap**.
3. In the search bar, type **Create Component** to find your external tool.
4. Right-click on it and select **Add Keyboard Shortcut**.
5. Choose your preferred shortcut (⌘ + ⇧ Shift + W) and click OK.

***
# Как добавить скрипт в vscode и запускать из интерфейса

### Add the script to VSCode:
1. Open the **Command Palette** (Ctrl+Shift+P or Cmd+Shift+P on macOS).
2. Type **"Tasks: Open User Tasks"** or "**Tasks: Open Workspace Tasks**" and select it.
3. This will create or open a **tasks.json** file in the .vscode directory of your workspace.
4. Add the following configuration to your **tasks.json** file:
```json
{
  "version": "2.0.0",
  "tasks": [
      {
         "label": "Create Component",
         "type": "shell",
         "command": "node",
         "args": [
            "/Users/your-user/path-to-projects/create-wb-component/index.js",
            "${fileDirname}",
            "${input:componentName}"
         ],
         "group": {
            "kind": "build",
            "isDefault": true
         },
         "presentation": {
            "echo": true,
            "reveal": "always",
            "focus": false,
            "panel": "shared"
         },
         "problemMatcher": []
      }
   ],
   "inputs": [
      {
         "id": "componentName",
         "type": "promptString",
         "description": "Enter the component name"
      }
   ]
}
```

### Assign a Keyboard Shortcut:
1. Open or Create **keybindings.json**:
   * Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS).
   * Type "**Preferences: Open Keyboard Shortcuts (JSON)**" and select it.
2. Add the following configuration to your keybindings.json file:
```json
[
    {
        "key": "⌘+Shift+W",
        "command": "workbench.action.tasks.runTask",
        "args": "Create Component"
    }
]
```

### Run the script from VSCode:
1. Pressing the defined shortcut (e.g., ⌘+Shift+W).
2. Enter the component name when prompted.


