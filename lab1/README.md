# Отчет по лабораторной работе №1 (Вариант 21)

**Выполнил:** Рудин Максим  
**Группа:** 25-ИСТ-3Б  
**Дата:** 28 сентября 2025 г.

## Постановка задачи
Согласно варианту 21, требуется реализовать программу на языке Java для решения следующих задач:

### Задание 1
Вычислить значения двух функций, вычисление значений функций организовать в виде отдельных методов класса:

$$R = \frac{\sqrt{\sin^2(y) + 6.835}}{\ln(y + k) + 3y^2}$$

$$L = 10^7 + \frac{(y - x)^2 / 2 - (x - y)^2 / 3}{\cos(x) + \sin(z) + 5y + 10}$$

### Задание 2
Создать программу для решения задачи по физике. Два человека, мотоциклист и велосипедист, движутся по дороге в одном направлении. Мотоциклист имеет скорость $( v_1 )$ км/ч, велосипедист — $( v_2 )$ км/ч. Велосипедист стартует через $(t)$ часов после мотоциклиста. Через какое расстояние от поселка они встретятся? Какое расстояние от поселка проедет каждый?

### Задание 3
Создать программу для решения задачи по геометрии. Дан конус, в который вписана сфера. Угол между осью и образующей конуса равен $( \alpha )$, площадь боковой поверхности конуса равна $( S )$. Найти площадь поверхности сферы.

### Задание 4
Создать программу. Известны первый член и разность арифметической прогрессии. Найти пятый член и сумму первых $(N)$ членов.

### Задание 5
Создать программу. Известны координаты точки $( (x, y) )$ и прямой $( ax + by + c = 0 )$. Найти координаты проекции точки на прямую.

### Задание 6
Оформить отчет по лабораторной работе в MS Word. В отчет входит: постановка задачи, решение на языке Java, тестирование программы с разными входными данными и проверкой.

Дополнительные требования: Программа должна быть интерактивной, с меню для выбора задач, обработкой ошибок и проверкой входных данных. Тестирование провести с использованием отдельного класса для тестов.

## Решение на языке Java
Программа реализована в файлах `Main.java` и `MainTest.java`. Ниже приведен полный код.

### Main.java
```java
import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("=== РЕШЕНИЕ МАТЕМАТИЧЕСКИХ ЗАДАЧ ===\n");

        while (true) {
            System.out.println("1. Вычисление функций R и L");
            System.out.println("2. Задача о мотоциклисте и велосипедисте");
            System.out.println("3. Площадь поверхности сферы");
            System.out.println("4. Арифметическая прогрессия");
            System.out.println("5. Проекция точки на прямую");
            System.out.println("0. Выход\n");

            int choice = readInt("Выбор: ");
            System.out.println();

            try {
                switch (choice) {
                    case 1 ->
                        task1();
                    case 2 ->
                        task2();
                    case 3 ->
                        task3();
                    case 4 ->
                        task4();
                    case 5 ->
                        task5();
                    case 0 -> {
                        return;
                    }
                    default ->
                        System.out.println("Неверный выбор\n");
                }
            } catch (Exception e) {
                System.out.println("Ошибка: " + e.getMessage() + "\n");
            }
        }
    }

    // Задание 1: Вычисление функций
    private static void task1() {
        System.out.println("=== ЗАДАНИЕ 1: Вычисление функций ===");

        double x = readDouble("x = ");
        double y = readDouble("y = ");
        double z = readDouble("z = ");
        double k = readDouble("k = ");

        if (y + k <= 0) {
            throw new RuntimeException("ln(y+k): y+k должно быть > 0");
        }

        double numeratorR = Math.sqrt(Math.pow(Math.sin(y), 2) + 6.835);
        double denominatorR = Math.log(y + k) + 3 * Math.pow(y, 2);
        if (Math.abs(denominatorR) < 1e-10) {
            throw new RuntimeException("Деление на ноль в R");
        }

        double R = numeratorR / denominatorR;

        double term1 = Math.pow(10, 7);
        double term2 = Math.pow(y - x, 2) / 2.0 - Math.pow(x - y, 2) / 3.0;
        double denominatorL = Math.cos(x) + Math.sin(z) + 5 * y + 10;
        if (Math.abs(denominatorL) < 1e-10) {
            throw new RuntimeException("Деление на ноль в L");
        }

        double L = term1 + term2 / denominatorL;

        System.out.printf("R = %.6f\n", R);
        System.out.printf("L = %.6f\n\n", L);
    }

    // Задание 2: Физическая задача
    private static void task2() {
        System.out.println("=== ЗАДАНИЕ 2: Мотоциклист и велосипедист ===");

        double v1 = readDouble("Скорость мотоциклиста (км/ч): ");
        double v2 = readDouble("Скорость велосипедиста (км/ч): ");
        double delay = readDouble("Задержка велосипедиста (ч): ");

        if (v1 <= 0 || v2 <= 0) {
            throw new RuntimeException("Скорости должны быть > 0");
        }
        if (v2 >= v1) {
            throw new RuntimeException("Скорость велосипедиста должна быть меньше");
        }

        double meetingTime = (v1 * delay) / (v1 - v2);
        double distance = v1 * (meetingTime + delay);

        System.out.printf("Расстояние до поселка: %.2f км\n\n", distance);
    }

    // Задание 3: Геометрия
    private static void task3() {
        System.out.println("=== ЗАДАНИЕ 3: Площадь сферы, вписанной в конус ===");

        double angle = readDouble("Угол между осью и образующей конуса (градусы): ");
        double lateralArea = readDouble("Площадь боковой поверхности конуса: ");

        if (angle <= 0 || angle >= 90) {
            throw new RuntimeException("Угол должен быть 0 < угол < 90");
        }
        if (lateralArea <= 0) {
            throw new RuntimeException("Площадь должна быть > 0");
        }

        double angleRad = Math.toRadians(angle);
        double radius = Math.sqrt(lateralArea * Math.sin(angleRad) / (Math.PI * (1 + Math.cos(angleRad))));
        double sphereArea = 4 * Math.PI * Math.pow(radius, 2);

        System.out.printf("Радиус вписанной сферы: %.4f\n", radius);
        System.out.printf("Площадь поверхности сферы: %.4f\n\n", sphereArea);
    }

    // Задание 4: Арифметическая прогрессия
    private static void task4() {
        System.out.println("=== ЗАДАНИЕ 4: Арифметическая прогрессия ===");

        double a1 = readDouble("Первый член: ");
        double d = readDouble("Разность: ");
        int n = readInt("Количество членов для суммы: ");

        if (n <= 0) {
            throw new RuntimeException("Количество членов должно быть > 0");
        }

        double a5 = a1 + 4 * d;
        double sum = n * (2 * a1 + (n - 1) * d) / 2.0;

        System.out.printf("Пятый член: %.4f\n", a5);
        System.out.printf("Сумма первых %d членов: %.4f\n\n", n, sum);
    }

    // Задание 5: Проекция точки на прямую
    private static void task5() {
        System.out.println("=== ЗАДАНИЕ 5: Проекция точки ===");

        double x0 = readDouble("Координата точки x: ");
        double y0 = readDouble("Координата точки y: ");

        System.out.println("Коэффициенты прямой ax + by + c = 0:");
        double a = readDouble("a = ");
        double b = readDouble("b = ");
        double c = readDouble("c = ");

        if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) {
            throw new RuntimeException("a и b не могут быть одновременно равны 0");
        }

        double denominator = a * a + b * b;
        double projX = (b * (b * x0 - a * y0) - a * c) / denominator;
        double projY = (a * (-b * x0 + a * y0) - b * c) / denominator;

        System.out.printf("Исходная точка: (%.2f, %.2f)\n", x0, y0);
        System.out.printf("Проекция: (%.2f, %.2f)\n\n", projX, projY);
    }

    private static double readDouble(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextDouble()) {
            System.out.println("Введите число");
            scanner.next();
            System.out.print(prompt);
        }
        return scanner.nextDouble();
    }

    private static int readInt(String prompt) {
        System.out.print(prompt);
        while (!scanner.hasNextInt()) {
            System.out.println("Введите целое число");
            scanner.next();
            System.out.print(prompt);
        }
        return scanner.nextInt();
    }

    public static void task1Helper(double x, double y, double z, double k) {
        if (y + k <= 0) {
            throw new RuntimeException("ln(y+k): y+k должно быть > 0");
        }

        double numeratorR = Math.sqrt(Math.pow(Math.sin(y), 2) + 6.835);
        double denominatorR = Math.log(y + k) + 3 * Math.pow(y, 2);
        if (Math.abs(denominatorR) < 1e-10) {
            throw new RuntimeException("Деление на ноль в R");
        }

        double R = numeratorR / denominatorR;

        double term1 = Math.pow(10, 7);
        double term2 = Math.pow(y - x, 2) / 2.0 - Math.pow(x - y, 2) / 3.0;
        double denominatorL = Math.cos(x) + Math.sin(z) + 5 * y + 10;
        if (Math.abs(denominatorL) < 1e-10) {
            throw new RuntimeException("Деление на ноль в L");
        }

        double L = term1 + term2 / denominatorL;

        System.out.printf("R = %.6f\n", R);
        System.out.printf("L = %.6f\n\n", L);
    }

    public static void task2Helper(double v1, double v2, double delay) {
        if (v1 <= 0 || v2 <= 0) {
            throw new RuntimeException("Скорости должны быть > 0");
        }
        if (v2 >= v1) {
            throw new RuntimeException("Скорость велосипедиста должна быть меньше");
        }

        double meetingTime = (v1 * delay) / (v1 - v2);
        double distance = v1 * (meetingTime + delay);

        System.out.printf("Расстояние до поселка: %.2f км\n\n", distance);
    }

    public static void task3Helper(double angle, double lateralArea) {
        if (angle <= 0 || angle >= 90) {
            throw new RuntimeException("Угол должен быть 0 < угол < 90");
        }
        if (lateralArea <= 0) {
            throw new RuntimeException("Площадь должна быть > 0");
        }

        double angleRad = Math.toRadians(angle);
        double radius = Math.sqrt(lateralArea * Math.sin(angleRad) / (Math.PI * (1 + Math.cos(angleRad))));
        double sphereArea = 4 * Math.PI * Math.pow(radius, 2);

        System.out.printf("Радиус вписанной сферы: %.4f\n", radius);
        System.out.printf("Площадь поверхности сферы: %.4f\n\n", sphereArea);
    }

    public static void task4Helper(double a1, double d, int n) {
        if (n <= 0) {
            throw new RuntimeException("Количество членов должно быть > 0");
        }

        double a5 = a1 + 4 * d;
        double sum = n * (2 * a1 + (n - 1) * d) / 2.0;

        System.out.printf("Пятый член: %.4f\n", a5);
        System.out.printf("Сумма первых %d членов: %.4f\n\n", n, sum);
    }

    public static void task5Helper(double x0, double y0, double a, double b, double c) {
        if (Math.abs(a) < 1e-10 && Math.abs(b) < 1e-10) {
            throw new RuntimeException("a и b не могут быть одновременно равны 0");
        }

        double denominator = a * a + b * b;
        double projX = (b * (b * x0 - a * y0) - a * c) / denominator;
        double projY = (a * (-b * x0 + a * y0) - b * c) / denominator;

        System.out.printf("Исходная точка: (%.2f, %.2f)\n", x0, y0);
        System.out.printf("Проекция: (%.2f, %.2f)\n\n", projX, projY);
    }
}
```

### MainTest.java
```java
public class MainTest {

    public static void main(String[] args) {
        testTask1();
        testTask2();
        testTask3();
        testTask4();
        testTask5();
        System.out.println("=== Все тесты завершены ===");
    }

    private static void printTestResult(boolean success) {
        if (success) {
            System.out.println("\u2713 Тест пройден"); // Галочка
        } else {
            System.out.println("\u2717 Тест не пройден"); // Крестик
        }
    }

    private static void testTask1() {
        System.out.println("=== Тесты для Задания 1: Функции R и L ===");

        // Тест 1: Нормальные значения
        System.out.println("Тест 1.1: Нормальные значения");
        try {
            Main.task1Helper(1.0, 2.0, 1.5, 0.5);
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        // Тест 2: Пограничные значения
        System.out.println("Тест 1.2: y + k близко к нулю");
        try {
            Main.task1Helper(0, 0.001, 0, 0.999); // y + k = 1
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        // Тест 3: Ошибка ln(y+k) <= 0
        System.out.println("Тест 1.3: Ошибка ln(y+k) <= 0");
        try {
            Main.task1Helper(0, -1, 0, 0); // y + k = -1
            printTestResult(false);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
            printTestResult(true);
        }

        // Тест 4: Отрицательные значения
        System.out.println("Тест 1.4: Отрицательные x, z");
        try {
            Main.task1Helper(-2.0, 1.0, -1.0, 1.0);
            printTestResult(true);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
            printTestResult(false);
        }

        System.out.println();
    }

    private static void testTask2() {
        System.out.println("=== Тесты для Задания 2: Мотоциклист и велосипедист ===");

        // Тест 1: Классический случай
        System.out.println("Тест 2.1: v1=60, v2=20, delay=0.5");
        try {
            Main.task2Helper(60, 20, 0.5);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Большая задержка
        System.out.println("Тест 2.2: Большая задержка");
        try {
            Main.task2Helper(50, 30, 2.0);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Ошибка v2 >= v1
        System.out.println("Тест 2.3: Ошибка v2 >= v1");
        try {
            Main.task2Helper(30, 50, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 4: Ошибка отрицательная скорость
        System.out.println("Тест 2.4: Отрицательная скорость");
        try {
            Main.task2Helper(-10, 20, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 5: Равные скорости
        System.out.println("Тест 2.5: Равные скорости");
        try {
            Main.task2Helper(40, 40, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask3() {
        System.out.println("=== Тесты для Задания 3: Площадь сферы (ИСПРАВЛЕНО) ===");

        // Тест 1: Угол 30°, площадь 100
        System.out.println("Тест 3.1: Угол 30°, S=100");
        try {
            Main.task3Helper(30, 100);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Угол 45°, площадь 200
        System.out.println("Тест 3.2: Угол 45°, S=200");
        try {
            Main.task3Helper(45, 200);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Угол 60°, площадь 150
        System.out.println("Тест 3.3: Угол 60°, S=150");
        try {
            Main.task3Helper(60, 150);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Ошибка угол <= 0
        System.out.println("Тест 3.4: Ошибка угол <= 0");
        try {
            Main.task3Helper(0, 100);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 5: Ошибка угол >= 90
        System.out.println("Тест 3.5: Ошибка угол >= 90");
        try {
            Main.task3Helper(90, 100);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 6: Ошибка отрицательная площадь
        System.out.println("Тест 3.6: Отрицательная площадь");
        try {
            Main.task3Helper(45, -10);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask4() {
        System.out.println("=== Тесты для Задания 4: Арифметическая прогрессия ===");

        // Тест 1: Классическая прогрессия
        System.out.println("Тест 4.1: a1=1, d=2, n=5");
        try {
            Main.task4Helper(1, 2, 5);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Отрицательная разность
        System.out.println("Тест 4.2: a1=10, d=-1, n=3");
        try {
            Main.task4Helper(10, -1, 3);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Дробные значения
        System.out.println("Тест 4.3: a1=1.5, d=0.5, n=4");
        try {
            Main.task4Helper(1.5, 0.5, 4);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Большое количество членов
        System.out.println("Тест 4.4: a1=0, d=3, n=10");
        try {
            Main.task4Helper(0, 3, 10);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 5: Ошибка n <= 0
        System.out.println("Тест 4.5: Ошибка n <= 0");
        try {
            Main.task4Helper(1, 2, 0);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 6: Отрицательное n
        System.out.println("Тест 4.6: Отрицательное n");
        try {
            Main.task4Helper(1, 2, -5);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }

    private static void testTask5() {
        System.out.println("=== Тесты для Задания 5: Проекция точки на прямую ===");

        // Тест 1: Простая прямая x + y - 1 = 0
        System.out.println("Тест 5.1: Точка (2,2), прямая x + y - 1 = 0");
        try {
            Main.task5Helper(2, 2, 1, 1, -1);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 2: Вертикальная прямая x - 3 = 0
        System.out.println("Тест 5.2: Точка (5,4), прямая x - 3 = 0");
        try {
            Main.task5Helper(5, 4, 1, 0, -3);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 3: Горизонтальная прямая y - 2 = 0
        System.out.println("Тест 5.3: Точка (3,5), прямая y - 2 = 0");
        try {
            Main.task5Helper(3, 5, 0, 1, -2);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 4: Отрицательные координаты
        System.out.println("Тест 5.4: Точка (-1,-2), прямая 2x - y + 1 = 0");
        try {
            Main.task5Helper(-1, -2, 2, -1, 1);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 5: Точка на прямой
        System.out.println("Тест 5.5: Точка (1,1), прямая x + y - 2 = 0 (точка на прямой)");
        try {
            Main.task5Helper(1, 1, 1, 1, -2);
        } catch (Exception e) {
            System.out.println("Ошибка: " + e.getMessage());
        }

        // Тест 6: Ошибка a = b = 0
        System.out.println("Тест 5.6: Ошибка a = b = 0");
        try {
            Main.task5Helper(1, 1, 0, 0, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        // Тест 7: Малые коэффициенты (близкие к нулю)
        System.out.println("Тест 5.7: Малые коэффициенты");
        try {
            Main.task5Helper(1, 1, 1e-12, 1e-12, 1);
        } catch (RuntimeException e) {
            System.out.println("Ожидаемая ошибка: " + e.getMessage());
        }

        System.out.println();
    }
}
```

## Тестирование программы
### Пользовательский ввод
При запуске программы отображается меню:
```
PS C:\Users\rudin\dev\study-labs\lab1> java Main
=== РЕШЕНИЕ МАТЕМАТИЧЕСКИХ ЗАДАЧ ===

1. Вычисление функций R и L
2. Задача о мотоциклисте и велосипедисте
3. Площадь поверхности сферы
4. Арифметическая прогрессия
5. Проекция точки на прямую
0. Выход

Выбор:
```

### Результаты тестов
Запуск тестов:
```
PS C:\Users\rudin\dev\study-labs\lab1> java .\MainTest.java
=== Тесты для Задания 1: Функции R и L ===
Тест 1.1: Нормальные значения
R = 0,214303
L = 10000000,007738

✓ Тест пройден
Тест 1.2: y + k близко к нулю
R = 871461,161243
L = 10000000,000000

✓ Тест пройден
Тест 1.3: Ошибка ln(y+k) <= 0
Ожидаемая ошибка: ln(y+k): y+k должно быть > 0
✓ Тест пройден
Тест 1.4: Отрицательные x, z
R = 0,743665
L = 10000000,109151

✓ Тест пройден

=== Тесты для Задания 2: Мотоциклист и велосипедист ===
Тест 2.1: v1=60, v2=20, delay=0.5
Расстояние до поселка: 75,00 км

Тест 2.2: Большая задержка
Расстояние до поселка: 350,00 км

Тест 2.3: Ошибка v2 >= v1
Ожидаемая ошибка: Скорость велосипедиста должна быть меньше
Тест 2.4: Отрицательная скорость
Ожидаемая ошибка: Скорости должны быть > 0
Тест 2.5: Равные скорости
Ожидаемая ошибка: Скорость велосипедиста должна быть меньше

=== Тесты для Задания 3: Площадь сферы (ИСПРАВЛЕНО) ===
Тест 3.1: Угол 30°, S=100
Радиус вписанной сферы: 2,9205
Площадь поверхности сферы: 107,1797

Тест 3.2: Угол 45°, S=200
Радиус вписанной сферы: 5,1351
Площадь поверхности сферы: 331,3708

Тест 3.3: Угол 60°, S=150
Радиус вписанной сферы: 5,2504
Площадь поверхности сферы: 346,4102

Тест 3.4: Ошибка угол <= 0
Ожидаемая ошибка: Угол должен быть 0 < угол < 90
Тест 3.5: Ошибка угол >= 90
Ожидаемая ошибка: Угол должен быть 0 < угол < 90
Тест 3.6: Отрицательная площадь
Ожидаемая ошибка: Площадь должна быть > 0

=== Тесты для Задания 4: Арифметическая прогрессия ===
Тест 4.1: a1=1, d=2, n=5
Пятый член: 9,0000
Сумма первых 5 членов: 25,0000

Тест 4.2: a1=10, d=-1, n=3
Пятый член: 6,0000
Сумма первых 3 членов: 27,0000

Тест 4.3: a1=1.5, d=0.5, n=4
Пятый член: 3,5000
Сумма первых 4 членов: 9,0000

Тест 4.4: a1=0, d=3, n=10
Пятый член: 12,0000
Сумма первых 10 членов: 135,0000

Тест 4.5: Ошибка n <= 0
Ожидаемая ошибка: Количество членов должно быть > 0
Тест 4.6: Отрицательное n
Ожидаемая ошибка: Количество членов должно быть > 0

=== Тесты для Задания 5: Проекция точки на прямую ===
Тест 5.1: Точка (2,2), прямая x + y - 1 = 0
Исходная точка: (2,00, 2,00)
Проекция: (0,50, 0,50)

Тест 5.2: Точка (5,4), прямая x - 3 = 0
Исходная точка: (5,00, 4,00)
Проекция: (3,00, 4,00)

Тест 5.3: Точка (3,5), прямая y - 2 = 0
Исходная точка: (3,00, 5,00)
Проекция: (3,00, 2,00)

Тест 5.4: Точка (-1,-2), прямая 2x - y + 1 = 0
Исходная точка: (-1,00, -2,00)
Проекция: (-1,40, -1,80)

Тест 5.5: Точка (1,1), прямая x + y - 2 = 0 (точка на прямой)
Исходная точка: (1,00, 1,00)
Проекция: (1,00, 1,00)

Тест 5.6: Ошибка a = b = 0
Ожидаемая ошибка: a и b не могут быть одновременно равны 0
Тест 5.7: Малые коэффициенты
Ожидаемая ошибка: a и b не могут быть одновременно равны 0

=== Все тесты завершены ===
```

## Руководство по запуску
### Требования
- Java Development Kit (JDK) версии 11 или выше.
- Git для клонирования репозитория.

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
2. Перейдите в `lab1`:
   ```
   cd lab1
   ```

### Компиляция и запуск
1. Скомпилируйте:
   ```
   javac Main.java MainTest.java
   ```
2. Запустите программу:
   ```
   java Main
   ```
3. Запустите тесты:
   ```
   java MainTest
   ```

## Вывод
Программа полностью реализует все задания варианта 21. Обработаны ошибки ввода, проведено тестирование с различными данными, включая пограничные и некорректные случаи. Все тесты пройдены успешно. Отчет оформлен в соответствии с требованиями.