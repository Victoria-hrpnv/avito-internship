# Project Management System (PMS) - Frontend
### Описание проекта
Мини-версия системы управления проектами с возможностью: 

- Просмотра и управления задачами
- Организации задач по доскам (проектам)
- Фильтрации и поиска задач

## Технологический стек:


- **React**  
- **react-router-dom** для роутинга
- **Vite**  (Сборщик проекта)
- **Ant Design** (UI компоненты)
- MobX (Управление состоянием)

## Функциональные возможности

### Основные страницы
1. **Список всех задач** (/issues)
  - Фильтрация по статусу и доске
  - Поиск по названию
  - Создание/редактирование задач
  - Переход к доске задачи
2. **Список досок** (/boards)
  - Просмотр всех проектов
  - Переход к конкретной доске
3. **Доска проекта** (/board/:id)
  - Отображение задач по статусам
  - Редактирование задач
 4.  **Форма задачи**
   - Создание/редактирование задачи   

## Запуск проекта
Запуск через Docker Compose
1. **Соберите и запустите контейнеры**
   `docker-compose up --build`
3. **Приложение будет доступно**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080























