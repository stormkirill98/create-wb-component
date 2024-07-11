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
Новый компонент будет экспортирован из `components/index.ts`\

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

***
# Как запустить скрипт в webstorm

##### Запустите команду `chmod a+x index.js` в этом проекте (для macos как минимум обязательно)

### Add the Script to WebStorm:
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

### Run the Script from WebStorm:
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