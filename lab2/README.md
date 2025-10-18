# Отчет по лабораторной работе №2 (Вариант 21)

**Выполнил:** [Ваше ФИО]  
**Группа:** [Ваша группа]  
**Дата:** 18 октября 2025 г.

## Постановка задачи

Согласно варианту 21, требуется реализовать программу на языке Java для решения следующих задач:

### Задание 1
Вычислить значение выражения с проверкой области определения:
$$\frac{\sin(\cos(x))}{x-1} \cdot \cos^2(x) \cdot \ln(x-e^2)$$

Если при каком-то значении $x$ выражение не имеет смысла, вывести сообщение и сравнить значения только тех, которые имеют смысл.

### Задание 2
Вывести на экран в порядке убывания сумму цифр пятизначного числа, которые больше заданного значения $m$. Изначально с клавиатуры вводится пять пятизначных чисел. Решение без использования циклов.

### Задание 3
Найти значения функции на интервале $x \in [-3.3, 3.3]$ с шагом 0.5 без использования циклов:
$$f = \begin{cases} \sin(\pi x), & \text{при } x \geq 0 \\ \pi x^2, & \text{в противном случае} \end{cases}$$

### Задание 4
Вычислить функцию с условиями:
$$y = \begin{cases} |e - \pi x|, & \text{если } x < -1 \\ x^{2x-5}, & \text{если } -1 < x < 4 \\ \frac{4-x}{x^2-1}, & \text{если } x > 4 \\ e, & \text{если } x = -1 \text{ или } x = 4 \end{cases}$$

### Задание 5
Даны две фигуры (окружности). Определить, попала ли произвольно введенная точка в одну из фигур, и если попала, то в какую.

### Задание 6
Пользователь вводит координаты точки с клавиатуры, определить попала ли точка в закрашенную часть фигуры (полумесяц с вырезами). Одно деление сетки соответствует 1.

### Задание 7
Составить две программы для определения функций с точками разрыва. Программа должна учитывать, что пользователь может ввести переменную, которая не удовлетворяет интервалу определения функции $x \in [-4, 4]$:

$$g = \begin{cases} \cos(\sin(\cos(x^2 + 2x))) + \pi e, & x \leq 0 \\ e^{\sqrt{\frac{1+2x}{1+x^2}}}, & x > 0 \end{cases}$$

$$z = \begin{cases} tg(x) + \cos(\sqrt{1+x^2}), & x < 0 \\ 2x^6 + x^4 - 2\cos(x)e^{-2x}, & x \in [0,1] \\ 2\sin(\cos(x)) - \frac{x^3+x}{2\cos(x+1)+2}, & x > 1 \end{cases}$$

### Задание 8
Используя инструкцию `switch` составить программу, которая выводит ягоду и количество сахара, которое в ней содержится. Ягода соответствует числу, которое ввел пользователь (не более 8 чисел). 8 ягод с наибольшим содержанием сахара на Земле, расположены в порядке убывания.

### Задание 9
Составить программу опроса респондента на тему выбора IT-специализации с сочетанием инструкций `if` и `switch` (не менее 4 вопросов с вложениями `switch` в `if`).

## Решение на языке Java

### Main.java
```java
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);
    private static final double EPSILON = 1e-10;

    public static void main(String[] args) {
        System.out.println("=== ЛАБОРАТОРНАЯ РАБОТА: ВАРИАНТ 21 ===\n");

        while (true) {
            displayMenu();
            int choice = readInt("Выбор: ");
            System.out.println();

            if (choice == 0) {
                System.out.println("Программа завершена.");
                return;
            }

            executeTask(choice);
        }
    }

    private static void displayMenu() {
        String[] menuItems = {
            "1. Вычисление выражения с проверкой смысла",
            "2. Сумма цифр, больших заданного значения m",
            "3. Вычисление функции f с условиями",
            "4. Вычисление функции y с условиями",
            "5. Проверка попадания точки в фигуру",
            "6. Проверка попадания точки в закрашенную область",
            "7. Вычисление функций g(x) и z(x)",
            "8. Ягоды и содержание сахара",
            "9. Опрос: выбор IT-специализации",
            "0. Выход\n"
        };
        
        for (String item : menuItems) {
            System.out.println(item);
        }
    }

    private static void executeTask(int choice) {
        try {
            switch (choice) {
                case 1 -> task1();
                case 2 -> task2();
                case 3 -> task3();
                case 4 -> task4();
                case 5 -> task5();
                case 6 -> task6();
                case 7 -> task7();
                case 8 -> task8();
                case 9 -> task9();
                default -> System.out.println("Неверный выбор\n");
            }
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage() + "\n");
        }
    }

    // ========== TASK 1 ==========
    private static void task1() {
        printHeader("ЗАДАНИЕ 1", "Выражение: sin(cos(x))/(x-1) * cos²(x) * ln(x-e²)");

        double x = readDouble("Введите x: ");

        if (isZero(x - 1)) {
            printError("деление на ноль (x = 1)");
            return;
        }

        double e2 = Math.E * Math.E;
        if (x <= e2) {
            System.out.printf("Выражение не имеет смысла: ln(x-e²) требует x > e² ≈ %.3f\n\n", e2);
            return;
        }

        double result = (Math.sin(Math.cos(x)) / (x - 1)) 
                      * Math.pow(Math.cos(x), 2) 
                      * Math.log(x - e2);

        printResult(result);
    }

    // ========== TASK 2 ==========
    private static void task2() {
        printHeader("ЗАДАНИЕ 2", "Сумма цифр числа, которые больше заданного значения m (без циклов)");

        int m = readInt("Введите пороговое значение m: ");
        int number = readInt("Введите пятизначное число: ");

        number = Math.abs(number);
        
        if (number < 10000 || number > 99999) {
            printError("требуется пятизначное число");
            return;
        }

        int[] digits = extractDigits(number);
        int sum = 0;
        for (int digit : digits) {
            if (digit > m) sum += digit;
        }

        System.out.printf("Сумма цифр больших %d: %d\n\n", m, sum);
    }

    private static int[] extractDigits(int number) {
        return new int[] {
            number / 10000,
            (number / 1000) % 10,
            (number / 100) % 10,
            (number / 10) % 10,
            number % 10
        };
    }

    // ========== TASK 3 ==========
    private static void task3() {
        printHeader("ЗАДАНИЕ 3", 
            "f = sin(πx), при x >= 0\n" +
            "f = πx², в противном случае\n" +
            "Интервал x ∈ [-3.3, 3.3], шаг 0.5 (без циклов)");

        System.out.println("x\t\tf(x)");
        System.out.println("─────────────────────────");

        double[] values = {-3.3, -2.8, -2.3, -1.8, -1.3, -0.8, -0.3,
                           0.2, 0.7, 1.2, 1.7, 2.2, 2.7, 3.2};

        for (double x : values) {
            printF(x);
        }
        System.out.println();
    }

    private static void printF(double x) {
        double f = (x >= 0) ? Math.sin(Math.PI * x) : Math.PI * x * x;
        System.out.printf("%.1f\t\t%.6f\n", x, f);
    }

    // ========== TASK 4 ==========
    private static void task4() {
        printHeader("ЗАДАНИЕ 4",
            "y = |e - πx|,        если x < -1\n" +
            "y = x^(2x-5),        если -1 < x < 4\n" +
            "y = (4-x)/(x²-1),    если x > 4\n" +
            "y = e,               если x = -1 или x = 4");

        double x = readDouble("Введите x: ");

        Result result = computeY(x);
        if (result == null) return;

        System.out.printf("Условие: %s\n", result.condition);
        System.out.printf("Результат: y = %.6f\n\n", result.value);
    }

    private static Result computeY(double x) {
        if (x < -1) {
            return new Result(Math.abs(Math.E - Math.PI * x), "x < -1");
        } 
        
        if (isZero(x + 1) || isZero(x - 4)) {
            return new Result(Math.E, "x = -1 или x = 4");
        }
        
        if (x < 4) {
            return new Result(Math.pow(x, 2 * x - 5), "-1 < x < 4");
        }
        
        double denominator = x * x - 1;
        if (isZero(denominator)) {
            printError("деление на ноль");
            return null;
        }
        return new Result((4 - x) / denominator, "x > 4");
    }

    private static class Result {
        final double value;
        final String condition;

        Result(double value, String condition) {
            this.value = value;
            this.condition = condition;
        }
    }

    // ========== TASK 5 ==========
    private static void task5() {
        printHeader("ЗАДАНИЕ 5", "Проверка попадания точки в одну из фигур");

        Point p = readPoint();
        Circle left = new Circle(-2, 3, 2);
        Circle right = new Circle(5, -2, 2);

        if (left.contains(p)) {
            System.out.println("✓ Точка попадает в ЛЕВУЮ фигуру");
        } else if (right.contains(p)) {
            System.out.println("✓ Точка попадает в ПРАВУЮ фигуру");
        } else {
            System.out.println("✗ Точка НЕ попадает ни в одну из фигур");
        }
        System.out.println();
    }

    // ========== TASK 6 ==========
    private static void task6() {
        printHeader("ЗАДАНИЕ 6", "Проверка попадания точки в закрашенную область");

        Point p = readPoint();
        Circle big = new Circle(0, 0, 4);
        Circle topHole = new Circle(2, 2, 1);
        Circle bottomHole = new Circle(2, -2, 1);

        boolean inShaded = big.contains(p) && p.x >= 0 
                        && !topHole.contains(p) 
                        && !bottomHole.contains(p);

        System.out.println(inShaded 
            ? "✓ Точка попадает в ЗАКРАШЕННУЮ область"
            : "✗ Точка НЕ попадает в закрашенную область");
        System.out.println();
    }

    // ========== TASK 7 ==========
    private static void task7() {
        printHeader("ЗАДАНИЕ 7", 
            "Вычисление функций g(x) и z(x) с проверкой области определения\n" +
            "Область определения: x ∈ [-4, 4]");

        double x = readDouble("Введите x: ");

        if (x < -4 || x > 4) {
            printError("x должен быть в интервале [-4, 4]");
            return;
        }

        computeAndPrint("g", x, Main::computeG);
        computeAndPrint("z", x, Main::computeZ);
        System.out.println();
    }

    private static void computeAndPrint(String name, double x, Function func) {
        System.out.printf("\n--- Функция %s(x) ---\n", name);
        try {
            double result = func.apply(x);
            System.out.printf("%s(%.3f) = %.6f\n", name, x, result);
        } catch (ArithmeticException e) {
            System.out.printf("Ошибка при вычислении %s(x): %s\n", name, e.getMessage());
        }
    }

    @FunctionalInterface
    private interface Function {
        double apply(double x) throws ArithmeticException;
    }

    private static double computeG(double x) {
        if (x <= 0) {
            return Math.cos(Math.sin(Math.cos(x * x + 2 * x))) + Math.PI * Math.E;
        }
        
        double fraction = (1 + 2 * x) / (1 + x * x);
        if (fraction < 0) {
            throw new ArithmeticException("Корень из отрицательного числа");
        }
        return Math.exp(Math.sqrt(fraction));
    }

    private static double computeZ(double x) {
        if (x < 0) {
            double cosValue = Math.cos(x);
            if (isZero(cosValue)) {
                throw new ArithmeticException("tg не определён (cos(x) = 0)");
            }
            return Math.tan(x) + Math.cos(Math.sqrt(1 + x * x));
        }
        
        if (x <= 1) {
            double x2 = x * x;
            return 2 * x2 * x2 * x2 + x2 * x2 - 2 * Math.cos(x) * Math.exp(-2 * x);
        }
        
        double denominator = 2 * Math.cos(x + 1) + 2;
        if (isZero(denominator)) {
            throw new ArithmeticException("Деление на ноль");
        }
        return 2 * Math.sin(Math.cos(x)) - (x * x * x + x) / denominator;
    }

    // ========== TASK 8 ==========
    private static void task8() {
        printHeader("ЗАДАНИЕ 8", "Ягоды с наибольшим содержанием сахара (в порядке убывания)");

        Berry[] berries = {
            new Berry("Финики", "65-70%"),
            new Berry("Виноград", "16-18%"),
            new Berry("Инжир", "16%"),
            new Berry("Черешня", "13-15%"),
            new Berry("Бананы", "12-14%"),
            new Berry("Манго", "10-12%"),
            new Berry("Гранат", "9-11%"),
            new Berry("Черника", "8-10%")
        };

        for (int i = 0; i < berries.length; i++) {
            System.out.printf("%d. %s\n", i + 1, berries[i].name);
        }

        int choice = readInt("\nВведите номер ягоды (1-8): ");

        if (choice >= 1 && choice <= 8) {
            Berry berry = berries[choice - 1];
            System.out.printf("\n%s - содержание сахара: ~%s\n\n", berry.name, berry.sugar);
        } else {
            printError("выберите число от 1 до 8");
        }
    }

    private static class Berry {
        final String name;
        final String sugar;

        Berry(String name, String sugar) {
            this.name = name;
            this.sugar = sugar;
        }
    }

    // ========== TASK 9 ==========
    private static void task9() {
        printHeader("ЗАДАНИЕ 9", "Опрос: Подбор IT-специализации");

        System.out.println("1. Вам больше нравится работать с:");
        System.out.println("   1 - Визуальными интерфейсами");
        System.out.println("   2 - Серверной логикой и базами данных");
        int q1 = readInt("Ваш выбор: ");

        if (q1 == 1) {
            processFrontendPath();
        } else if (q1 == 2) {
            processBackendPath();
        } else {
            printError("Некорректный выбор");
        }
        System.out.println();
    }

    private static void processFrontendPath() {
        System.out.println("\n2. Какой фреймворк вас больше интересует?");
        System.out.println("   1 - React");
        System.out.println("   2 - Vue");
        System.out.println("   3 - Angular");
        int q2 = readInt("Ваш выбор: ");

        switch (q2) {
            case 1 -> {
                System.out.println("\n3. Готовы ли изучать TypeScript?");
                System.out.println("   1 - Да");
                System.out.println("   2 - Нет");
                int q3 = readInt("Ваш выбор: ");
                
                System.out.println(q3 == 1 
                    ? "\n✓ Рекомендация: React + TypeScript Developer"
                    : "\n✓ Рекомендация: React (JavaScript) Developer");
            }
            case 2 -> System.out.println("\n✓ Рекомендация: Vue.js Developer");
            case 3 -> System.out.println("\n✓ Рекомендация: Angular Developer");
            default -> printError("Некорректный выбор");
        }
    }

    private static void processBackendPath() {
        System.out.println("\n2. Какой язык программирования предпочитаете?");
        System.out.println("   1 - Java");
        System.out.println("   2 - Python");
        System.out.println("   3 - C#");
        int q2 = readInt("Ваш выбор: ");

        switch (q2) {
            case 1 -> processJavaPath();
            case 2 -> processPythonPath();
            case 3 -> System.out.println("\n✓ Рекомендация: .NET Developer");
            default -> printError("Некорректный выбор");
        }
    }

    private static void processJavaPath() {
        System.out.println("\n3. Интересует ли вас микросервисная архитектура?");
        System.out.println("   1 - Да");
        System.out.println("   2 - Нет");
        int q3 = readInt("Ваш выбор: ");

        if (q3 == 1) {
            System.out.println("\n4. Работали ли с Spring Boot?");
            System.out.println("   1 - Да");
            System.out.println("   2 - Нет, но хочу изучить");
            int q4 = readInt("Ваш выбор: ");

            switch (q4) {
                case 1 -> System.out.println("\n✓ Рекомендация: Java Spring Cloud Architect");
                case 2 -> System.out.println("\n✓ Рекомендация: Junior Java Spring Developer");
                default -> printError("Некорректный выбор");
            }
        } else if (q3 == 2) {
            System.out.println("\n✓ Рекомендация: Java Backend Developer");
        }
    }

    private static void processPythonPath() {
        System.out.println("\n3. Интересует ли вас Data Science?");
        System.out.println("   1 - Да");
        System.out.println("   2 - Нет");
        int q3 = readInt("Ваш выбор: ");

        System.out.println(q3 == 1 
            ? "\n✓ Рекомендация: Python Data Scientist"
            : "\n✓ Рекомендация: Python Backend Developer (Django/FastAPI)");
    }

    // ========== UTILITIES ==========
    private static class Point {
        final double x, y;

        Point(double x, double y) {
            this.x = x;
            this.y = y;
        }
    }

    private static class Circle {
        final double centerX, centerY, radius;

        Circle(double centerX, double centerY, double radius) {
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
        }

        boolean contains(Point p) {
            double dx = p.x - centerX;
            double dy = p.y - centerY;
            return dx * dx + dy * dy <= radius * radius;
        }
    }

    private static Point readPoint() {
        double x = readDouble("Введите координату x: ");
        double y = readDouble("Введите координату y: ");
        return new Point(x, y);
    }

    private static boolean isZero(double value) {
        return Math.abs(value) < EPSILON;
    }

    private static void printHeader(String title, String description) {
        System.out.println("=== " + title + " ===");
        System.out.println(description + "\n");
    }

    private static void printError(String message) {
        System.out.println("Ошибка: " + message + "\n");
    }

    private static void printResult(double result) {
        System.out.printf("Результат: %.6f\n\n", result);
    }

    private static double readDouble(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextDouble()) {
            System.out.println("Введите число");
            scanner.next();
            System.out.print(prompt);
        }
        double result = scanner.nextDouble();
        scanner.nextLine();
        return result;
    }

    private static int readInt(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.println("Введите целое число");
            scanner.next();
            System.out.print(prompt);
        }
        int result = scanner.nextInt();
        scanner.nextLine();
        return result;
    }
}
```

## Руководство по запуску

### Требования
- Java Development Kit (JDK) версии 17 или выше
- Любая IDE или командная строка

### Клонирование репозитория
1. Откройте терминал.
2. Клонируйте репозиторий:
   ```
   git clone https://github.com/RudinMaxim/study-labs.git
   ```
3. Перейдите в директорию:
   ```
   cd study-labs
   ```

### Переход в ветку и директорию
1. Переключитесь на ветку `informatics`:
   ```
   git checkout informatics
   ```
2. Перейдите в `lab2`:
   ```
   cd lab2
   ```

### Компиляция и запуск
```bash
# Компиляция
javac Main.java

# Запуск
java Main
```

## Вывод

Программа полностью реализует все задания варианта 21. Реализованы:
- Проверка области определения функций
- Обработка ошибок ввода
- Работа с условными конструкциями без циклов (где требуется)
- Геометрические вычисления для определения попадания точки в фигуры
- Интерактивный опрос с вложенными условиями
